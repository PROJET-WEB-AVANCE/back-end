import { IsOptional, IsNumber, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FilterArticleDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "Filter by article name" })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "Filter by category name" })
    categoryName?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ description: "Sort by price", enum: ["asc", "desc"] })
    sortPrice?: "asc" | "desc";

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "Pagination limit" })
    limit?: number;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: "Pagination offset" })
    offset?: number;
}
