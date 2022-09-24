import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FIRST_USER } from 'src/consts';
import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guards';
import { CreateUserDTO } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(@GetUser() user) {
    return user;
  }

  @Get('/init')
  init() {
    return this.usersService.createUser(FIRST_USER);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Post()
  createUser(@Body() dto: CreateUserDTO) {
    return this.usersService.createUser(dto);
  }
}
