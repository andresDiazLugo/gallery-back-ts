"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const User_1 = require("../models/User");
const Gallery_1 = require("../models/Gallery");
const sequelize = new sequelize_1.Sequelize(config_1.config.DATA_BASE_URL, {
    logging: false,
});
exports.sequelize = sequelize;
(0, User_1.user)(sequelize);
(0, Gallery_1.gallery)(sequelize);
//destructuring models
const { User, Gallery } = sequelize.models;
exports.User = User;
exports.Gallery = Gallery;
//association or relations
User.hasMany(Gallery);
Gallery.belongsTo(User);
