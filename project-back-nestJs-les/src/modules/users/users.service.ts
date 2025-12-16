import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "./dto";
import {AppError} from "../../common/errors";
@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository : typeof User) {
    }

    async hashPassword (password : string) {
        return bcrypt.hash(password,4)
    }

    async findUserByEmail (email : string){
        return this.userRepository.findOne({where: {email}})
    }


    async createUser(dto: CreateUserDTO): Promise<User> {
        const existUser = await this.findUserByEmail(dto.email)
        if(existUser) throw new BadRequestException(AppError.USER_EXIST)
        dto.password = await this.hashPassword(dto.password);

        const user = await this.userRepository.create({
            ...dto
        });

        return user;
    }

//add service
}
