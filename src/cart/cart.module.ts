import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cart} from "./cart.entity";
import {CartService} from "./cart.service";
import {CartController} from "./cart.controller";
import {ArticleModule} from "../article/article.module";


@Module({
    imports: [TypeOrmModule.forFeature([Cart]), ArticleModule],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}