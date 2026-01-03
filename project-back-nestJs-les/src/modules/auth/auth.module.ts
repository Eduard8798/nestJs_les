import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";
import {TokenModule} from "../../token/token.module";
import {JwtStrategy} from "../../strategy";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports:[UsersModule,TokenModule,PassportModule], // иморт модуля , потомучто в AuthService рользуюсь UsersModule методоми
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
