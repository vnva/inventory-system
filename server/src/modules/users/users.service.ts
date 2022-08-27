import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, username: true },
    });
  }

  async createUser(dto: CreateUserDTO) {
    const existInUsers = this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!!existInUsers) throw new BadRequestException('User with this username already exists');

    return await this.prisma.user.create({
      data: dto,
      select: { id: true, username: true },
    });
  }
}
