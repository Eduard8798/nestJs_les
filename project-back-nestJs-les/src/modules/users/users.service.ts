import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import {Watchlist} from "../watchlist/model/watchlist.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 4)
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email},
            include: [{
                model: Watchlist,   // подтягиваем связь
                required: false,   // если нет watchlist — не ломается
            }],
        })
    }


    async createUser(dto: CreateUserDTO): Promise<User> {

        const hashedPassword = await this.hashPassword(dto.password);

        return this.userRepository.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: hashedPassword,
        });

    }

    async publicUser(email: string) {
        return this.userRepository.findOne({
            where: {email},
            attributes: {exclude: ['password']},
            include: {
                model: Watchlist,
                required: false
            }
        })
    }

    async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
        await this.userRepository.update(dto, {where: {email}})
        return dto;
    }

    async deleteUser(email: string) {
        await this.userRepository.destroy({where: {email}})
        return {message: "return done"}
    }

}
