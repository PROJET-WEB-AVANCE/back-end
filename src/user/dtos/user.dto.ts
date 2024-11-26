import { ERole } from "../../auth/interface/role.enum";

export class UserCreateDto {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

}

export class UserLoginDto {
  email: string;
  password: string;
}


export class UserDto {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  type: ERole;

}



