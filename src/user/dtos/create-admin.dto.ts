import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'First name of the admin' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Last name of the admin' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Last name of the admin' })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Last name of the admin' })
  email: string;
}

