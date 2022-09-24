import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('AUTH_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.knex<User>('users').first(['id', 'username']).where({ id: payload.id });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
