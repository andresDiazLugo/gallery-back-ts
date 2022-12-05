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
exports.getImagenes = exports.serviceUploadFile = void 0;
// import multer from 'multer'
const app_1 = __importDefault(require("../app"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const connection_1 = require("../DataBase/connection");
const promises_1 = __importDefault(require("fs/promises"));
const serviceUploadFile = (title, user) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const archivos = yield promises_1.default.readdir(app_1.default.get('dirnameUpload') + "/uploads");
        archivos.shift();
        const result = yield Promise.all(archivos.map(files => cloudinary_1.default.v2.uploader.upload(`${app_1.default.get("dirnameUpload")}/uploads/${files}`, options)));
        yield Promise.all(result.map(e => connection_1.Gallery.create({
            title: title,
            urlImg: e.url,
            idCloudinary: e.public_id,
            UserId: user
        })));
        yield Promise.all(archivos.map(file => fs_1.default.unlink(app_1.default.get('dirnameUpload') + "/uploads/" + file, (e) => console.log(e))));
        return {
            msg: "los datos fueron cargados con exito"
        };
    }
    catch (error) {
        console.log(error);
        return {
            msg: `surgio un error al momento de cargar los datos: ${error}`
        };
    }
});
exports.serviceUploadFile = serviceUploadFile;
const getImagenes = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDataBase = yield connection_1.Gallery.findAll({
        attributes: ['id', 'title', 'urlImg', 'idCloudinary', 'createdAt'],
        where: {
            UserId: userid
        }
    });
    if (responseDataBase.length > 0) {
        return responseDataBase;
    }
    return {
        msg: "no hay registros existentes"
    };
});
exports.getImagenes = getImagenes;
