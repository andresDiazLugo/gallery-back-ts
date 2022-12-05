"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gallery = void 0;
const sequelize_1 = require("sequelize");
class Gallery extends sequelize_1.Model {
}
const gallery = (sequelize) => Gallery.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    urlImg: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: true,
    },
    idCloudinary: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
}, {
    tableName: 'gallery',
    sequelize: sequelize
});
exports.gallery = gallery;
exports.default = exports.gallery;
