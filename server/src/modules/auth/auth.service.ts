import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { verifyPassword } from 'src/utils';
import { SigninDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(@InjectConnection() private readonly knex: Knex, private jwtService: JwtService) {}

  async signIn(dto: SigninDTO) {
    const user = await this.knex('users').first('*').where({ username: dto.username });

    if (!user || !(await verifyPassword(user.password, dto.password))) {
      throw new BadRequestException('Bad credits');
    }

    const payload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
