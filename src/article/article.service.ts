import {HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Article} from "./article.entity";
import {FindOptionsWhere, Repository} from "typeorm";
import {Category} from "../category/category.entity";
import {FilterArticleDto} from "./interface/filter-article.dto";
import {plainToInstance} from "class-transformer";
import {CreateArticleDto, UpdateArticleDto} from "./interface/create-article.dto";
import {GetArticleDto} from "./interface/get-article.dto";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
    }

    async findAll(filter: FilterArticleDto): Promise<GetArticleDto[]> {
        const where: FindOptionsWhere<Article> = {};

        if (filter.name) where.name = filter.name;
        if (filter.categoryId) where.category = {id: filter.categoryId};

        const articles = await this.articleRepository.find({
            where,
            relations: ['category'],
            order: filter.sortPrice ? {price: filter.sortPrice.toLowerCase() === 'asc' ? 'ASC' : 'DESC'} : undefined,
        });

        return plainToInstance(GetArticleDto, articles, {excludeExtraneousValues: true});

    }

    async findOne(id: number): Promise<GetArticleDto> {
        const article = await this.articleRepository.findOne({where: {id}, relations: ['category']});
        if (!article) {
           throw new HttpException('Article not found', 404);
        }
        return plainToInstance(GetArticleDto, article, {excludeExtraneousValues: true});
    }

    async create(data: CreateArticleDto): Promise<{ message: string }> {
        const category = await this.categoryRepository.findOne({
            where: {id: data.categoryId},
        });
        if (!category) {
           throw new HttpException('Category not found', 404);
        }

        const article = this.articleRepository.create({
            name: data.name,
            reference: data.reference,
            quantity: data.quantity,
            image: data.image,
            description: data.description,
            price: data.price,
            category,
        });

        await this.articleRepository.save(article);
        return { message: 'Article created successfully.' };

    }

    async update(id: number, data: UpdateArticleDto): Promise<GetArticleDto> {
        const article = await this.articleRepository.findOne({where: {id}, relations: ['category']});
        if (!article) {
           throw new HttpException('Article not found', 404);
        }

        if (data.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: {id: data.categoryId},
            });
            if (!category) {
                throw new HttpException('Category not found', 404);
            }
            article.category = category;
        }

        Object.assign(article, data);
        const updatedArticle = await this.articleRepository.save(article);

        return plainToInstance(GetArticleDto, updatedArticle, {excludeExtraneousValues: true});
    }

    async delete(id: number): Promise<{ message: string }> {
        const article = await this.articleRepository.findOne({
            where: {id},
        });
        if (!article) {
            throw new HttpException('Article not found', 404);
        }
        await this.articleRepository.remove(article);
        return { message: 'Article deleted successfully.' };

    }
}