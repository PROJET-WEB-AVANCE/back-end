import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/role.guard";
import { HasRoles } from "../auth/has-role.decorator";
import { ERole } from "../auth/interface/role.enum";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("admin")
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.userService.createAdmin(createAdminDto);
  }

  @Get("admin/:id")
  async findAdminById(@Param("id") id: number) {
    return this.userService.findAdminById(id);
  }

  @Get("client/:id")
  async findClientById(@Param("id") id: number) {
    return this.userService.findClientById(id);
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @HasRoles(ERole.ROLE_ADMIN)
  @Get("admin")
  async findAllAdmins() {
    return this.userService.findAllAdmins();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("client")
  async findAllClients(@Request() req: any) {
    console.log(req.user.id);
    return this.userService.findAllClients();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("my-infos")
  async getMyInfo(@Request() req: any) {
    return this.userService.findClientById(req.user.id);
  }

  
  @Get("check/:id")
  async checkIfUserisAdmin(@Param("id") id: number) {
    return this.userService.checkIfUsersAdmin(id);
  }
}
