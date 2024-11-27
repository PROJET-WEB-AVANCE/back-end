import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ArticleService} from './article.service';
import {FilterArticleDto} from "./interface/filter-article.dto";
import {GetArticleDto} from "./interface/get-article.dto";
import {CreateArticleDto, UpdateArticleDto} from "./interface/create-article.dto";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/role.guard";
import {HasRoles} from "../auth/has-role.decorator";
import {ERole} from "../auth/interface/role.enum";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    @ApiOperation({
        summary: 'Get a list of all articles with optional filters (Public)',
        description: 'This endpoint is accessible without authentication.'
    })
    @ApiResponse({ status: 200, description: 'List of articles', type: [GetArticleDto] })
    @HttpCode(HttpStatus.OK)
    findAll(@Query() filter: FilterArticleDto): Promise<GetArticleDto[]> {
        return this.articleService.findAll(filter);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get an article by ID (Public)',
        description: 'This endpoint is accessible without authentication.'
    })
    @ApiResponse({ status: 200, description: 'Article details', type: GetArticleDto })
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: number): Promise<GetArticleDto> {
        return this.articleService.findOne(id);
    }

    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @HasRoles(ERole.ROLE_ADMIN)
    @Post()
    @ApiOperation({
        summary: 'Create a new article (Admin Only)',
        description: 'This endpoint requires an Admin role.'
    })
    @ApiResponse({ status: 201, description: 'Article created successfully' })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateArticleDto): Promise<{ message: string }> {
        return this.articleService.create(data);
    }

    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @HasRoles(ERole.ROLE_ADMIN)
    @Put(':id')
    @ApiOperation({
        summary: 'Update an article by ID (Admin Only)',
        description: 'This endpoint requires an Admin role.'
    })
    @ApiResponse({ status: 200, description: 'Article updated successfully', type: GetArticleDto })
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() data: UpdateArticleDto): Promise<GetArticleDto> {
        return this.articleService.update(id, data);
    }

    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @HasRoles(ERole.ROLE_ADMIN)
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete an article by ID (Admin Only)',
        description: 'This endpoint requires an Admin role.'
    })
    @ApiResponse({ status: 204, description: 'Article deleted successfully' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number): Promise<{ message: string }> {
        return this.articleService.delete(id);
    }
}
