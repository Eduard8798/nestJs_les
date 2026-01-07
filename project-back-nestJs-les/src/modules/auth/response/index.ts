import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Watchlist} from "../../watchlist/model/watchlist.model";

export class AuthUserResponse {
    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @IsString()
    token: string

    @IsString()
    watchlist?: Watchlist[];


}
