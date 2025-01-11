import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Request,
    UseGuards
} from '@nestjs/common';
import {OrderService} from './order.service';
import {AuthGuard} from "@nestjs/passport";
import {ERole} from "../auth/interface/role.enum";
import {HasRoles} from "../auth/has-role.decorator";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {GetArticleDto} from "../article/interface/get-article.dto";
import {OrderDto} from "./interface/order.dto";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post('checkout')
    @ApiOperation({
        summary: 'Place a order order in pending waiting for a validation'
    })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @HttpCode(HttpStatus.CREATED)
    async checkout(@Request() req: any, @Body()  items: { id: number; name: string;  quantity: number }[]) {
        return await this.orderService.checkout(req.user.id, items);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post('accept/:id')
    @HasRoles(ERole.ROLE_ADMIN)
    @ApiOperation({
        summary: 'Accept a order'
    })
    @ApiResponse({ status: 201, description: 'Order accepted successfully' })
    @HttpCode(HttpStatus.CREATED)
    async accept(@Param("id") orderId: number) {
        return await this.orderService.accept(orderId);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("my-orders")
    @ApiOperation({
        summary: 'Get user\'s order',
    })
    @ApiResponse({ status: 200, description: 'Order details', type: OrderDto })
    @HttpCode(HttpStatus.OK)
    async getOrder(@Request() req: any) {
        return await this.orderService.getMyOrder(req.user.id);
    }

    @UseGuards(AuthGuard("jwt"))
    @HasRoles(ERole.ROLE_ADMIN)
    @Put()
    @ApiOperation({
        summary: 'Edit a user\'s order',
    })
    @ApiResponse({ status: 200, description: 'Order edited', type: GetArticleDto })
    @HttpCode(HttpStatus.OK)
    async updateOrder(
        @Body() body: { id: number, order: OrderDto }
    ) {
        const {id, order} = body;
        return await this.orderService.updateOrder(id, order);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete the order of a user',
        description: 'This endpoint is accessible without authentication.'
    })
    @ApiResponse({ status: 204, description: 'Order deleted'})
    @HttpCode(HttpStatus.NO_CONTENT)
    async clearOrder(@Param('id') orderId: number, @Request() req: any) {
        return await this.orderService.deleteOrder(req.user.id ,  orderId, req.user.type);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("all")
    @HasRoles(ERole.ROLE_ADMIN)
    @ApiOperation({
        summary: 'Get all the orders',
        description: 'This endpoint is accessible only for admins.'
    })
    @ApiResponse({ status: 200, description: 'All orders', type: OrderDto})
    async getAllOrders(){
        return await this.orderService.getAllOrders();
    }
}
