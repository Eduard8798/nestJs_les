import {Column, Table, Model, HasMany} from 'sequelize-typescript';
import {Watchlist} from "../../watchlist/model/watchlist.model";

@Table
export class User extends Model {
    @Column
    declare firstName: string;

    @Column
    declare userName: string;

    @Column
    declare email: string;

    @Column
    declare password: string;

    @HasMany(() => Watchlist,
        {onDelete: 'CASCADE', onUpdate: 'CASCADE',})
    watchlist: Watchlist[]
}
