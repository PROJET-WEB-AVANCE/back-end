import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Order} from './order.entity';
import {OrderDto} from "./interface/order.dto";
import {ArticleService} from "../article/article.service";
import {plainToInstance} from "class-transformer";
import {Estatus} from "./interface/status.enum";
import {UserDto} from "../user/dtos/user.dto";
import {ERole} from "../auth/interface/role.enum";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        private readonly articleService: ArticleService
    ) {}

    async checkout(userId: number, items: { id: number; name: string;  quantity: number }[]): Promise<OrderDto> {

        let orderItems = [];
        let totalAmount = 0;

        for (const item of items) {
            const article = await this.articleService.findOne(item.id);

            if (!article) {
                throw new HttpException(`Article avec l'ID ${item.id} non trouvé`, 404);
            }

            const quantityUsed = Math.max(Math.min(article.quantity, item.quantity), 0);

            orderItems.push({
                id: article.id,
                name: article.name,
                quantity: quantityUsed,
            });
            totalAmount += article.price * quantityUsed;

            await this.articleService.updateQuantity(article.id,  article.quantity - quantityUsed);
        }

        const order = this.orderRepository.create({
            userId: userId,
            date: new Date(),
            items: orderItems,
            totalAmount: totalAmount,
            status: Estatus.PENDING
        });

        await this.orderRepository.save(order);

        return plainToInstance(OrderDto, order);
    }

    async getMyOrder(userId: number): Promise<OrderDto[]> {
        const order = await this.orderRepository.find({where:
                { userId: userId  },
                relations: ['userId'],
            });

        if (!order) {
            throw new HttpException('Panier non trouvé', 404);
        }

        return plainToInstance(OrderDto, order) ;
    }

    async updateOrder(orderId: number, newOrder: OrderDto): Promise<OrderDto> {
        const order = await this.orderRepository.findOne({where:
                { id: orderId  },
        });

        // revert changes
        const revertPromises = order.items.map(async (item) => {
            const article = await this.articleService.findOne(item.id);
            if (!article) {
                throw new HttpException(`Article avec l'ID ${item.id} non trouvé`, 404);
            }
            await this.articleService.updateQuantity(article.id, article.quantity + item.quantity);

        });

        await Promise.all(revertPromises);

        // Apply new order

        let orderItems = [];
        let totalAmount = 0;

        const applyPromises = newOrder.items.map( async (newItem) =>{
            const article = await this.articleService.findOne(newItem.id);
            if (!article) {
                throw new HttpException(`Article avec l'ID ${newItem.id} non trouvé`, 404);
            }
            const quantityUsed = Math.max(Math.min(article.quantity, newItem.quantity), 0);

            orderItems.push({
                id: article.id,
                name: article.name,
                quantity: quantityUsed,
            });
            totalAmount += article.price * quantityUsed;

            await this.articleService.updateQuantity(article.id,  article.quantity - quantityUsed);
        });

        await Promise.all(applyPromises);

        order.totalAmount = totalAmount;
        order.items = newOrder.items;

        const updatedOrder = await this.orderRepository.save(order);
        return  plainToInstance(OrderDto, updatedOrder);

    }



    async deleteOrder(userId: number, orderId: number, userRole: string): Promise<OrderDto> {
        const order = await this.orderRepository.findOne({where: { id: orderId},relations: ["userId"]});
        if (!order) {
            throw new HttpException('Order not found', 404);
        }

        if (userRole === ERole.ROLE_ADMIN) {
            order.status = Estatus.DELETED;
        } else {

            if ((order.userId! as unknown as UserDto).id !== userId) {
                throw new HttpException('You are not authorized to delete this order', 404);
            }

            if (order.status !== Estatus.PENDING) {
                throw new HttpException('You can\'t delete orders other than pending', 404);
            }

            order.status = Estatus.DELETED;
        }

        const updatedOrder = await this.orderRepository.save(order);

        return plainToInstance(OrderDto, updatedOrder);
    }

    async getAllOrders() : Promise<OrderDto[]> {
        const orders = await this.orderRepository.find({ relations: ['userId'] });
        return plainToInstance(OrderDto, orders);
    }

    async accept(orderId: number) : Promise<OrderDto> {
        const order = await this.orderRepository.findOne({where: { id: orderId}});

        order.status = Estatus.ACCEPTED;
        const updatedOrder = await this.orderRepository.save(order)

        return plainToInstance(OrderDto, updatedOrder);
    }
}
