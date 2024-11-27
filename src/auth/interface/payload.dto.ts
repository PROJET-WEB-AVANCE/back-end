import { ERole } from "./role.enum";

export interface JwtPayload {
  id: number;
  firstName: string;
  role: ERole;
}


