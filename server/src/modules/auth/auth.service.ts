import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/utils';
import { PrismaService } from '../prisma/prisma.service';
import { SigninDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(dto: SigninDTO) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user || !(await verifyPassword(user.password, dto.password))) {
      throw new BadRequestException('Bad credits');
    }

    const payload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
