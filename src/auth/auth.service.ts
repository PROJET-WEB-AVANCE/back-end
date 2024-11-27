import {JwtService} from "@nestjs/jwt";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import { RegisterDto } from "./interface/register.dto";
import { JwtTokenDto } from "./interface/jwt-token.dto";
import { JwtPayload } from "./interface/payload.dto";
import { UserCreateDto, UserDto, UserLoginDto } from "../user/dtos/user.dto";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerClient(userDto: UserCreateDto): Promise<RegisterDto> {
    return await this.usersService.createClient(userDto);
  }

  async login(loginUserDto: UserLoginDto): Promise<JwtTokenDto> {
    if (!loginUserDto.email || !loginUserDto.password) {
      throw new HttpException(
        "email and password are required",
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.findByLogin(loginUserDto);


    const token = this._createToken(user);

    return {
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOneById(payload.id);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(user: User): JwtTokenDto {
    const payload = { id: user.id,firstName: user.firstName, role: user.type };

    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }
}