import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {RegisterDto} from "./interface/register.dto";
import {JwtTokenDto} from "./interface/jwt-token.dto";
import {UserCreateDto, UserLoginDto} from "../user/dtos/user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @ApiOperation({
        summary: 'User registration (Public)',
        description: 'This endpoint allows new users to register without authentication.'
    })
    @ApiResponse({status: 201, description: 'User registered successfully', type: RegisterDto})
    @HttpCode(HttpStatus.CREATED)
    register(@Body() data: UserCreateDto): Promise<RegisterDto> {
        return this.authService.registerClient(data);
    }

    @Post('login')
    @ApiOperation({
        summary: 'User login (Public)',
        description: 'This endpoint allows users to log in and obtain a JWT token.'
    })
    @ApiResponse({status: 200, description: 'User logged in successfully', type: JwtTokenDto})
    @HttpCode(HttpStatus.OK)
    login(@Body() data: UserLoginDto): Promise<JwtTokenDto> {
        return this.authService.login(data);
    }
}
