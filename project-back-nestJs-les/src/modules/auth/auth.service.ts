import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDTO} from "../users/dto";
import {AppError} from "../../common/constants/errors";
import {UserLoginDTO} from "./dto";
import * as bcrypt from 'bcrypt'
import {AuthUserResponse} from "./response";
import {TokenService} from "../../token/token.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
                private readonly tokenService: TokenService) {
    }

    async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {

       try {
           const existUser = await this.userService.findUserByEmail(dto.email)
           if (existUser) throw new BadRequestException(AppError.USER_EXIST)

           return this.userService.createUser(dto)
       }
       catch (e){
           throw new Error(e)
       }
    }

    async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
        try {
            const user = await this.userService.findUserByEmail(dto.email)
            if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST)
            const validatePassword = await bcrypt.compare(dto.password, user.password)
            if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
            const userData = await this.userService.publicUser(dto.email)
            const token = await this.tokenService.generateJwtToken(userData)
           return {
                user,token
            }
          catch (e){
            throw new Error(e)
        }
            }
      
      

            return {
                user,token
            }
        }
        catch (e){
            throw new Error(e)
        }

    }

}
