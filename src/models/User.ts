import {Model,DataTypes,Sequelize} from 'sequelize'



class User extends Model {
    declare id: number;
    declare username: string;
    declare profileUrl: string;
    declare email: string;
    declare password: string;
}

export const user = (sequelize:Sequelize) => User.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true, 
            primaryKey:true,
        },
        username:{
            type: new DataTypes.STRING(20),
            allowNull: false, 
        },
        profileUrl:{
            type: new DataTypes.STRING(),
            allowNull: true,
        },
        email:{
            type: new DataTypes.STRING(30),
            allowNull:false,
        },
        password:{
            type: new DataTypes.STRING(),
            allowNull: false, 
        }
    },{
            tableName: 'users',
            sequelize :sequelize
    }
);

export default User
