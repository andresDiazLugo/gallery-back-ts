import {Sequelize} from 'sequelize'
import {config} from '../config/config'
import {user} from '../models/User'
import {gallery} from '../models/Gallery'

const sequelize = new Sequelize(config.DATA_BASE_URL,
    {
        logging:false,
    })
user(sequelize)
gallery(sequelize)

//destructuring models
const {User,Gallery} = sequelize.models

//association or relations
User.hasMany(Gallery);
Gallery.belongsTo(User);


export {
    sequelize,
    User,
    Gallery
}