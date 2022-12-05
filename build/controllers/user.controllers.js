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
exports.getUser = exports.postUserImg = exports.postsignIn = exports.postSignUp = void 0;
const user_services_1 = require("../services/user.services");
const userpropVerify_1 = require("../ServicesComprobation/userpropVerify");
const connection_1 = require("../DataBase/connection");
const app_1 = __importDefault(require("../app"));
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_1 = __importDefault(require("fs"));
const postSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("este es el objeto",req.body)
    try {
        (0, userpropVerify_1.verifyPropsUser)(req.body);
        const responseService = yield (0, user_services_1.serviceSignUp)(req);
        return res.status(200).json(responseService);
    }
    catch (error) {
        console.log("error provisto en postSignUp revisar", error);
        return res.status(404).json(error.message);
    }
});
exports.postSignUp = postSignUp;
const postsignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseService = yield (0, user_services_1.serviceSigIn)(req);
        res.status(200).json(responseService);
    }
    catch (error) {
        console.log("error provisto en postSignUp revisar", error);
        return res.status(404).json("surgio un error al querer iniciar sesion");
    }
});
exports.postsignIn = postsignIn;
const postUserImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {userId} = req
    // console.log("id del usuario",req.ususerId)
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const archivos = yield promises_1.default.readdir(app_1.default.get('dirnameUpload') + "/uploads");
        // console.log("estos son los archivos",archivos)
        // const result:cloudinary.UploadApiResponse[] = await Promise.all(archivos.map(files=> cloudinary.v2.uploader.upload(`${app.get("dirnameUpload")}/uploads/${files}`,options)))
        const result = yield cloudinary_1.default.v2.uploader.upload(`${app_1.default.get("dirnameUpload")}/uploads/${archivos[0]}`, options);
        // console.log(archivos)
        //    const updateInfoUser = await User.create({
        //         title: title,
        //         urlImg: e.url,
        //         idCloudinary: e.public_id,
        //         UserId:user
        //      })
        console.log("este es el id", req.userId);
        const s = yield connection_1.User.update({ profileUrl: result.url }, {
            where: {
                id: req.userId
            }
        });
        console.log("este el usuario modificado", s);
        yield Promise.all(archivos.map(file => fs_1.default.unlink(app_1.default.get('dirnameUpload') + "/uploads/" + file, (e) => console.log(e))));
        return res.status(200).json({
            msg: "Su foto de perfil se cambio con exito"
        });
    }
    catch (error) {
        console.log("este es el error", error);
        return res.status(400).json({
            msg: `surgio un error al momento de cambiar su foto de perfil: ${error}`
        });
    }
});
exports.postUserImg = postUserImg;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const searchUser = yield connection_1.User.findOne({
            where: {
                id
            }
        });
        res.status(200).json(searchUser);
    }
    catch (error) {
        res.status(404).json({
            msg: error.meesage
        });
    }
});
exports.getUser = getUser;
