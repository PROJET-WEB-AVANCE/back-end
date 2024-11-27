import { ERole } from "../../auth/interface/role.enum";
import {Exclude, Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UserCreateDto {
  @ApiProperty({ description: 'First name of the user' })
  firstName: string;
  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;
  @ApiProperty({ description: 'Email address of the user' })
  email: string;
  @ApiProperty({ description: 'Password for the user' })
  password: string;

}

export class UserLoginDto {
  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @ApiProperty({ description: 'Password for the user' })
  password: string;
}

@Exclude()
export class UserDto {
  @Expose()
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: number;

  @Expose()
  @ApiProperty({ description: 'First name of the user' })
  firstName: string;

  @Expose()
  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;

  @Expose()
  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Role of the user', enum: ERole })
  type: ERole;
}

