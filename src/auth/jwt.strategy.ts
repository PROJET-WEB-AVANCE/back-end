import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtPayload } from "./interface/payload.dto";
import { AuthService } from "./auth.service";
import * as process from "process";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return {
      id: user.id,
      type: user.type,
    };
  }
}
