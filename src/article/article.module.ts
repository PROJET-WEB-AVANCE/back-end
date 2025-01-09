import { Module } from '@nestjs/common';
import {ArticleService} from "./article.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Article} from "./article.entity";
import {Category} from "../category/category.entity";
import {ArticleController} from "./article.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Article, Category])],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports : [ArticleService],

})
export class ArticleModule {}