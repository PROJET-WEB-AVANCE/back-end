import { ERole } from "./role.enum";

export interface JwtPayload {
  id: number;
  role: ERole;
}


