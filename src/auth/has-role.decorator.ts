import { ERole } from "./interface/role.enum";
import { SetMetadata } from "@nestjs/common";

export const HasRoles = (...roles: ERole[]) => SetMetadata('roles', roles);
