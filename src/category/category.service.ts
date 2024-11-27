import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Category} from './category.entity';
import {plainToInstance} from 'class-transformer';
import {GetCategoryDto, GetCategoryDtoWithArticles} from "./interface/get-category.dto";
import {CreateCategoryDto, UpdateCategoryDto} from "./interface/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
    }

    async findAll(): Promise<GetCategoryDto[]> {
        const categories = await this.categoryRepository.find({relations: ['articles']});
        return plainToInstance(GetCategoryDto, categories, {excludeExtraneousValues: true});
    }

    async findOne(id: number): Promise<GetCategoryDtoWithArticles> {
        const category = await this.categoryRepository.findOne({ where: { id }, relations: ['articles'] });
        if (!category) {
            throw new HttpException(
                'The category with the specified ID was not found.',
                HttpStatus.NOT_FOUND,
            );
        }
        return plainToInstance(GetCategoryDtoWithArticles, category, { excludeExtraneousValues: true });
    }

    async create(data: CreateCategoryDto): Promise<{ message: string }> {
        const category = this.categoryRepository.create(data);
        await this.categoryRepository.save(category);
        return { message: 'Category created successfully.' };
    }

    async update(id: number, data: UpdateCategoryDto): Promise<GetCategoryDto> {
        const categoryCheck = await this.categoryRepository.findOne({ where: { id } });
        if (!categoryCheck) {
            throw new HttpException(
                'The category with the specified ID was not found.',
                HttpStatus.NOT_FOUND,
            );
        }
        await this.categoryRepository.update(id, data);
        const category = await this.categoryRepository.findOne({ where: { id } });
        return plainToInstance(GetCategoryDto, category, { excludeExtraneousValues: true });
    }

    async delete(id: number): Promise<{ message: string }> {

        const category = await this.categoryRepository.findOne({where: {id}});
        if(!category) {
            throw new HttpException('Category not found', 404);
        }
        await this.categoryRepository.delete(id);
        return { message: 'Category deleted successfully.' };

    }
}
