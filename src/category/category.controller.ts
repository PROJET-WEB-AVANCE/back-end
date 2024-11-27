import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto, UpdateCategoryDto} from './interface/create-category.dto';
import {GetCategoryDto, GetCategoryDtoWithArticles} from './interface/get-category.dto';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../auth/role.guard';
import {HasRoles} from '../auth/has-role.decorator';
import {ERole} from '../auth/interface/role.enum';

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get()
    @ApiOperation({
        summary: 'Get a list of all categories (Public)',
        description: 'This endpoint is accessible without authentication.'
    })
    @ApiResponse({status: 200, description: 'List of categories', type: [GetCategoryDto]})
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<GetCategoryDto[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a category by ID (Public)',
        description: 'This endpoint is accessible without authentication.'
    })
    @ApiResponse({
        status: 200,
        description: 'Category details',
        type: GetCategoryDtoWithArticles,
    })
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id') id: number): Promise<GetCategoryDtoWithArticles> {
        return this.categoryService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HasRoles(ERole.ROLE_ADMIN)
    @Post()
    @ApiOperation({
        summary: 'Create a new category (Admin Only)',
        description: 'This endpoint requires an Admin role.'
    })
    @ApiResponse({status: 201, description: 'Category created successfully'})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateCategoryDto): Promise<{ message: string }> {
        return this.categoryService.create(data);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HasRoles(ERole.ROLE_ADMIN)
    @Put(':id')
    @ApiOperation({
        summary: 'Update a category by ID (Admin Only)',
        description: 'This endpoint requires an Admin role.'
    })
    @ApiResponse({status: 200, description: 'Category updated successfully', type: GetCategoryDto})
    @HttpCode(HttpStatus.OK)
    update(
        @Param('id') id: number,
        @Body() data: UpdateCategoryDto,
    ): Promise<GetCategoryDto> {
        return this.categoryService.update(id, data);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HasRoles(ERole.ROLE_ADMIN)
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a category by ID (Admin Only)',
        description: 'This endpoint requires an Admin role.'
    })
    @ApiResponse({status: 204, description: 'Category deleted successfully'})
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number): Promise<{ message: string }> {
        return this.categoryService.delete(id);
    }
}
