import {
  Body,
  Controller,
  Get, HttpCode, HttpStatus,
  Param,
  Post, Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/role.guard";
import { HasRoles } from "../auth/has-role.decorator";
import { ERole } from "../auth/interface/role.enum";
import {UpdateUserDto, UserDto} from "./dtos/user.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@ApiBearerAuth()

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @HasRoles(ERole.ROLE_ADMIN)
  @Post("admin")
  @ApiOperation({
    summary: 'Create a new admin (Admin Only)',
    description: 'This endpoint allows an admin to create a new admin.'
  })
  @ApiResponse({ status: 201, description: 'Admin created successfully', type: UserDto })
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.userService.createAdmin(createAdminDto);
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @HasRoles(ERole.ROLE_ADMIN)
  @Get("admins")
  @ApiOperation({
    summary: 'Get all admins (Admin Only)',
    description: 'This endpoint allows an admin to retrieve the list of all adins.'
  })
  @ApiResponse({ status: 200, description: 'List of admins', type: [UserDto] })
  @HttpCode(HttpStatus.OK)
  async findAllAdmins(): Promise<UserDto[]> {
    return this.userService.findAllAdmins();
  }

  @UseGuards(AuthGuard("jwt"))
  @HasRoles(ERole.ROLE_ADMIN)
  @Get("clients")
  @ApiOperation({
    summary: 'Get all clients (Admin Only)',
    description: 'This endpoint allows an admin to retrieve the list of all clients.'
  })
  @ApiResponse({ status: 200, description: 'List of clients', type: [UserDto] })
  @HttpCode(HttpStatus.OK)
  async findAllClients(): Promise<UserDto[]> {
    return this.userService.findAllClients();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("my-infos")
  @ApiOperation({
    summary: 'Get current user info (Authenticated)',
    description: 'This endpoint retrieves the current user\'s information. Requires authentication.'
  })
  @ApiResponse({ status: 200, description: 'User details', type: UserDto })
  @HttpCode(HttpStatus.OK)
  async getMyInfo(@Request() req: any): Promise<UserDto> {
    return this.userService.findClientById(req.user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("update-profile")
  @ApiOperation({
    summary: 'Get current user info (Authenticated)',
    description: 'This endpoint retrieves the current user\'s information. Requires authentication.'
  })
  @ApiResponse({ status: 200, description: 'User details', type: UserDto })
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Request() req: any, @Body() data : UpdateUserDto) : Promise<UserDto> {
    return this.userService.updateProfile(req.user.id, data);
  }
}
