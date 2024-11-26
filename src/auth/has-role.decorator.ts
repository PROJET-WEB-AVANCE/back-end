import { ERole } from "./interface/role.enum";
import { SetMetadata } from "@nestjs/common";

export const HasRoles = (role: ERole) => SetMetadata('role', role);
