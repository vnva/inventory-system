import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SpreadsheetsModule } from './modules/spreadsheets/spreadsheets.module';
import { KnexModule } from 'nest-knexjs';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          host: 'localhost',
          database: 'inventory',
          user: 'inventory',
          password: 'password',
        },
      },
    }),
    AuthModule,
    UsersModule,
    SpreadsheetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
