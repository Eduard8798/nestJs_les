import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../users/models/user.model";

@Table
export class Watchlist extends Model {
    @ForeignKey(() => User)
    declare user: User

    @Column
    declare name: string

    @Column
    declare assetId: string
}
