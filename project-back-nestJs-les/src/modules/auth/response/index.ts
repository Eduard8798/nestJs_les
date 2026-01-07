import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Watchlist} from "../../watchlist/model/watchlist.model";

class UserResponse {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string
}

export class AuthUserResponse {

    @ApiProperty()
    user: UserResponse

    @ApiProperty()
    @IsString()
    token: string


}
