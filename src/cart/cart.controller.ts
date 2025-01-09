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
import {CartService} from './cart.service';
import {AuthGuard} from "@nestjs/passport";
import {ERole} from "../auth/interface/role.enum";
import {HasRoles} from "../auth/has-role.decorator";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {GetArticleDto} from "../article/interface/get-article.dto";
import {CartDto} from "./interface/cart.dto";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post('checkout')
    @ApiOperation({
        summary: 'Place a cart order in pending waiting for a validation'
    })
    @ApiResponse({ status: 201, description: 'Cart created successfully' })
    @HttpCode(HttpStatus.CREATED)
    async checkout(@Request() req: any, @Body()  items: { id: number; name: string;  quantity: number }[]) {
        return await this.cartService.checkout(req.user.id, items);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    @ApiOperation({
        summary: 'Get user\'s cart',
    })
    @ApiResponse({ status: 200, description: 'Cart details', type: CartDto })
    @HttpCode(HttpStatus.OK)
    async getCart(@Request() req: any) {
        return await this.cartService.getMyCart(req.user.id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get(":id")
    @HasRoles(ERole.ROLE_ADMIN)
    @ApiOperation({
        summary: 'Get user\'s cart',
    })
    @ApiResponse({ status: 200, description: 'Cart details', type: CartDto })
    @HttpCode(HttpStatus.OK)
    async getUserCart(@Param('id') id: number) {
        return await this.cartService.getMyCart(id);
    }

    @UseGuards(AuthGuard("jwt"))
    @HasRoles(ERole.ROLE_ADMIN)
    @Put(':id')
    @ApiOperation({
        summary: 'Edit a user\'s cart',
    })
    @ApiResponse({ status: 200, description: 'Cart edited', type: GetArticleDto })
    @HttpCode(HttpStatus.OK)
    async updateCart(
        @Param('id') id: number,
        @Body() items: { id: number; name: string;  quantity: number }[]
    ) {
        return await this.cartService.updateCart(id, items);
    }

    @UseGuards(AuthGuard("jwt"))
    @HasRoles(ERole.ROLE_ADMIN)
    @Delete(':cartId/item/:itemId')
    @ApiOperation({
        summary: 'Delete a item of a cart',
    })
    @ApiResponse({ status: 204, description: 'Cart item deleted' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeItemFromCart(
        @Param('cartId') cartId: number,
        @Param('itemId') itemId: number
    ) {
        return await this.cartService.removeItemFromCart(cartId, itemId);
    }
    @UseGuards(AuthGuard("jwt"))
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete the cart of a user',
        description: 'This endpoint is accessible without authentication.'
    })
    @ApiResponse({ status: 204, description: 'Cart deleted'})
    @HttpCode(HttpStatus.NO_CONTENT)
    async clearCart(@Param('id') id: number) {
        return await this.cartService.clearCart(id);
    }
}
