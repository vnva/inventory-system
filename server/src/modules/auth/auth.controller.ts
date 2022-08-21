import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/signin')
  signin() {
    return { test: 'test' };
  }
}
