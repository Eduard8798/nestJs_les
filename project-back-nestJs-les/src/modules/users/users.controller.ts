import {Body, Controller, Delete, Get, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import {JwtAuthGuard} from "../../guards/jwt-guard";
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post('create-user')
    createUsers(@Body() dto : CreateUserDTO) {

        return this.userService.createUser(dto)
    }
    //без авторизации пробный метод на нового пользывателя

    @ApiTags("API")
    @ApiResponse({status:200,type: UpdateUserDTO})
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto : UpdateUserDTO,@Req() req) : Promise<UpdateUserDTO>{
        const user = req.user
       return this.userService.updateUser(user.email,updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request) {
        const user = request.user
        return this.userService.deleteUser(user.email)
    }


}
