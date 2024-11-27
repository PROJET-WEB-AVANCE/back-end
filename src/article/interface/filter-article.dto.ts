import { IsOptional, IsNumber, IsString } from 'class-validator';
import {ApiPropertyOptional} from "@nestjs/swagger";

export class FilterArticleDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Filter by article name' })
    name?: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: 'Filter by category ID' })
    categoryId?: number;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: 'Sort by price', enum: ['asc', 'desc'] })
    sortPrice?: 'asc' | 'desc';
}
