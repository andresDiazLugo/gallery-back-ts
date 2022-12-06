"use strict";
//cambios//
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
const app_1 = __importDefault(require("../app"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${app_1.default.get("dirnameUpload")}/uploads`);
    },
    filename: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("este es un archivoooo",file)
            const a = file.mimetype.split("/")[1];
            //   console.log("archivos",file)
            const namefile = String(Math.random() * 2).split(".").join("") + "." + a;
            cb(null, namefile);
        });
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
