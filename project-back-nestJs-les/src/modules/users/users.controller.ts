import {Body, Controller, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post('create-user')
    createUsers(@Body() dto : CreateUserDTO) {
        console.log(dto)
        return this.userService.createUser(dto)
    }
    //без авторизации пробный метод на нового пользывателя

    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto : UpdateUserDTO,@Req() req){
        const user = req.user
       return this.userService.updateUser(user.email,updateDto);
    }


}
