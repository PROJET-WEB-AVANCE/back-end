import {Exclude, Expose, Type} from 'class-transformer';
import {GetArticleDto} from "../../article/interface/get-article.dto";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class GetCategoryDto {
    @Expose()
    @ApiProperty({ description: 'Unique identifier of the category' })
    id: number;

    @Expose()
    @ApiProperty({ description: 'Name of the category' })
    name: string;

}


@Exclude()
export class GetCategoryDtoWithArticles {
    @Expose()
    @ApiProperty({ description: 'Unique identifier of the category' })
    id: number;

    @Expose()
    @ApiProperty({ description: 'Name of the category' })

    name: string;
    @Expose()
    @ApiProperty({ description: 'List of articles in the category', type: [GetArticleDto] })
    @Type(() => GetArticleDto)
    articles: GetArticleDto[];
}

