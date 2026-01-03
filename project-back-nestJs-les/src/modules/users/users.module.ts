import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/user.model";

@Module({

  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User])
  ],
  exports: [UsersService] // добавил что бы пользываться методами этого модуля в других модулях
})
export class UsersModule {}
