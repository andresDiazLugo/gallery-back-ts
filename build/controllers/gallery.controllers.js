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
exports.deleteImage = exports.getAllImages = exports.postUploadFile = void 0;
const gallery_services_1 = require("../services/gallery.services");
// import {responseServer} from '../interface/interfaces'
const connection_1 = require("../DataBase/connection");
const cloudinary_1 = __importDefault(require("cloudinary"));
const postUploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const response = yield (0, gallery_services_1.serviceUploadFile)(req.body.title, req.userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(404).json({
            msg: error.message
        });
    }
});
exports.postUploadFile = postUploadFile;
const getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, gallery_services_1.getImagenes)(req.userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({
            msg: error.message
        });
    }
});
exports.getAllImages = getAllImages;
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCloud } = req.params;
        console.log("id de imagen", idCloud);
        const response = connection_1.Gallery.destroy({
            where: {
                id: idCloud
            }
        });
        const { result } = yield cloudinary_1.default.v2.uploader.destroy(idCloud);
        if (!response && result !== "ok") {
            res.status(201).json({
                msg: "no se encuentra el registro que desea eliminar"
            });
        }
        res.status(200).json({
            msg: "el registro se elimino con exito"
        });
    }
    catch (error) {
        res.status(404).json({
            msg: "surgio un error al eliminar"
        });
    }
});
exports.deleteImage = deleteImage;
