import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { FIRST_USER } from 'src/consts';
import { hashPassword } from 'src/utils';
import { CreateUserDTO } from './dto';

export interface User {
  id?: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async getAllUsers() {
    return await this.knex('users').select(['id', 'username']);
  }

  async createUser(dto: CreateUserDTO) {
    const existInUsers = await this.knex('users').first('id').where({ username: dto.username });

    if (!!existInUsers) throw new BadRequestException('User with this username already exists');

    const hash = await hashPassword(dto.password);

    const result = await this.knex<User>('users').insert(
      {
        username: dto.username,
        password: hash,
      },
      ['id', 'username'],
    );

    if (!result) throw new InternalServerErrorException();

    return result[0];
  }
}
