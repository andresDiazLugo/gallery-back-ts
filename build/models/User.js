"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
const user = (sequelize) => User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: new sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    profileUrl: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    }
}, {
    tableName: 'users',
    sequelize: sequelize
});
exports.user = user;
exports.default = User;
