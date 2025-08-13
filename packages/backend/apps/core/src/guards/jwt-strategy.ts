/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IToken } from '@mfactory-be/commonTypes/global';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Validate token in request
   * @param {IToken} payload Token payload
   * @returns User information
   */
  async validate(payload: IToken, done: any): Promise<any> {
    if (!payload) throw new UnauthorizedException();
    return payload;
  }
}

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {}
