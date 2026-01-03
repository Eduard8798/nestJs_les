import { Column, Table, Model } from 'sequelize-typescript';

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
}
