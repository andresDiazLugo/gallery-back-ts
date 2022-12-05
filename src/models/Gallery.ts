import {Model,DataTypes,Sequelize} from 'sequelize'



class Gallery extends Model {
    declare id: number;
    declare username: string;
    declare profileUrl: string;
    declare email: string;
    declare password: string;
}

export const gallery = (sequelize:Sequelize) => Gallery.init(
    {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true, 
            primaryKey:true,
        },
        title:{
            type: new DataTypes.STRING(),
            allowNull: false, 
        },
        urlImg:{
            type: new DataTypes.STRING(),
            allowNull: true,
        },
        idCloudinary:{
            type: new DataTypes.STRING(),
            allowNull:false,
        },
    },{
            tableName: 'gallery',
            sequelize :sequelize
    }
);

export default gallery