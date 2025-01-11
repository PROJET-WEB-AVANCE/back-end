import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {OrderService} from "./order.service";
import {OrderController} from "./order.controller";
import {ArticleModule} from "../article/article.module";


@Module({
    imports: [TypeOrmModule.forFeature([Order]), ArticleModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}