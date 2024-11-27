import {Exclude, Expose, Type} from 'class-transformer';
import {GetCategoryDto} from "../../category/interface/get-category.dto";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class GetArticleDto {
    @Expose()
    @ApiProperty({ description: 'Unique identifier of the article' })
    id: number;

    @Expose()
    @ApiProperty({ description: 'Reference of the article' })
    reference: string;

    @Expose()
    @ApiProperty({ description: 'Name of the article' })
    name: string;

    @Expose()
    @ApiProperty({ description: 'Quantity available for the article' })
    quantity: number;

    @Expose()
    @ApiProperty({ description: 'Description of the article' })
    description: string;

    @Expose()
    @ApiProperty({ description: 'Price of the article' })
    price: number;

    @Expose()
    @ApiProperty({ description: 'Image URL of the article' })

    image: string;

    @Expose()
    @ApiProperty({ description: 'Category of the article', type: () => GetCategoryDto })

    @Type(() => GetCategoryDto)
    category: GetCategoryDto;
}


