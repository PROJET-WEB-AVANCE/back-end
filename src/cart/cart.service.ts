import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import {CartDto} from "./interface/cart.dto";
import {ArticleService} from "../article/article.service";
import {plainToInstance} from "class-transformer";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,

        private readonly articleService: ArticleService
    ) {}

    async checkout(userId: number, items: { id: number; name: string;  quantity: number }[]): Promise<CartDto> {
        const cart = new CartDto();
        cart.userId = userId;
        cart.date = new Date();
        cart.items = [];
        let totalAmount = 0;

        for (const item of items) {
            const article = await this.articleService.findOne(item.id);

            if (!article) {
                throw new HttpException(`Article avec l'ID ${item.id} non trouvé`, 404);
            }

            const quantityUsed = Math.max(Math.min(article.quantity, item.quantity), 0);

            cart.items.push({
                id: article.id,
                name: article.name,
                quantity: quantityUsed,
            });
            totalAmount += article.price * quantityUsed;

            await this.articleService.updateQuantity(article.id,  article.quantity - quantityUsed);
        }

        cart.totalAmount = totalAmount;
        cart.status = 'pending';

        return await this.cartRepository.save(cart);
    }


    async getMyCart(id: number): Promise<CartDto> {
        const cart = await this.cartRepository.findOne({where: { id }});

        if (!cart) {
            throw new HttpException('Panier non trouvé', 404);
        }

        return plainToInstance(CartDto, cart) ;
    }

    async updateCart(id: number, items: { id: number; quantity: number }[]): Promise<CartDto> {
        return null;
    }


    async removeItemFromCart(cartId: number, itemId: number): Promise<Cart> {
        return null ;
    }


    async clearCart(id: number): Promise<Cart> {
        return null;
    }
}
