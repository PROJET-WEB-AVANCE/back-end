import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";
import {ApiProperty} from "@nestjs/swagger";

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Reference of the article' })
    reference: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the article' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Description of the article' })
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Quantity available for the article' })
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Price of the article' })
    price: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Image URL of the article' })
    image: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Category ID of the article' })

    categoryId: number;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Reference of the article' })
    reference: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the article' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Description of the article' })
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Quantity available for the article' })
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Price of the article' })
    price: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Image URL of the article' })
    image: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Category ID of the article' })

    categoryId: number;
}
