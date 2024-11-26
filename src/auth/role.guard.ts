import {CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ERole } from "./interface/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<ERole>("role", context.getHandler());

    if (!requiredRole) return true;

    const { user } = context.switchToHttp().getRequest();


    if (!user) throw new HttpException("You are not authenticated", 401);

    return user.type === requiredRole;
  }

}