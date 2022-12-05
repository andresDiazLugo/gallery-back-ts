"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSigIn = exports.serviceSignUp = void 0;
const connection_1 = require("../DataBase/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const serviceSignUp = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield bcrypt_1.default.hash(req.body.password, 10);
    req.body.password = password;
    const searchUsername = yield connection_1.User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (searchUsername)
        return {
            msg: `El username ${searchUsername.username} ya existe, intente con otro nombre`
        };
    const searchUserOrCreate = yield connection_1.User.findOrCreate({
        where: {
            email: req.body.email,
        },
        defaults: req.body
    });
    if (!searchUserOrCreate[1])
        return {
            msg: "Este cuenta ya existe intente iniciar sesion"
        };
    return {
        msg: "Usuario creado con exito"
    };
});
exports.serviceSignUp = serviceSignUp;
const serviceSigIn = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const searchUser = yield connection_1.User.findOne({
        where: { email: req.body.email }
    });
    if (searchUser) {
        const compare = yield bcrypt_1.default.compare(req.body.password, searchUser.password);
        if (!compare)
            return { msg: "correo o contraseña incorrecto" };
        const token = jsonwebtoken_1.default.sign({ id: searchUser.id }, config_1.config.SECRET, {
            expiresIn: 60 * 60 * 24 // 1 dia 
        });
        return {
            msg: "Sesion iniciada",
            token,
            instance: String(searchUser.id)
        };
    }
    return {
        msg: "no tienes una cuenta asociada a nuestros servicios intente crear una cuenta nueva"
    };
});
exports.serviceSigIn = serviceSigIn;
