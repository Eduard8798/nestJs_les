import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO, UpdateUserDTO} from "./dto";

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

        const hashedPassword = await this.hashPassword(dto.password);

        return this.userRepository.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: hashedPassword,
        });

    }

    async publicUser (email:string){
        return this.userRepository.findOne({
            where:{email},
            attributes:{exclude:['password']}
        })
    }

    async updateUser (email:string,dto:UpdateUserDTO){
        return this.userRepository.update(dto,{where:{email}})
    }


}
