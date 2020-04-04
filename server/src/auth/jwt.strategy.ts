import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `http://localhost:8080/auth/realms/oslinux/protocol/openid-connect/certs`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `oslinux-server`,
      issuer: `http://localhost:8080/auth/realms/oslinux`,
      algorithms: ['RS256'],
    });
  }
  
  validate(payload: any) {
    return payload;
  }
}
