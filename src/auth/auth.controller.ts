import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {RegisterDto} from "./interface/register.dto";
import {JwtTokenDto} from "./interface/jwt-token.dto";
import { UserCreateDto, UserLoginDto } from "../user/dtos/user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("register")
  public async register(@Body() createUserDto: UserCreateDto): Promise<RegisterDto> {
    return await this.authService.registerClient(createUserDto);
  }

  @Post("login")
  public async login(@Body() loginUserDto: UserLoginDto): Promise<JwtTokenDto> {
    return await this.authService.login(loginUserDto);
  }
}
