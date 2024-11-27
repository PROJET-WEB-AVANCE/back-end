import { IsNotEmpty, IsString } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Name of the category' })

    name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiPropertyOptional({ description: 'Updated name of the category' })
    @IsNotEmpty()
    @IsString()
    name?: string;
}