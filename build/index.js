"use strict";
/////prueba/////
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
const connection_1 = require("./DataBase/connection");
const app_1 = __importDefault(require("./app"));
const cloudinary_1 = __importDefault(require("cloudinary"));
//mounted server
app_1.default.listen(app_1.default.get("PORT"), () => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.default.v2.config({
        secure: true
    });
    console.log("server runing in the port ", app_1.default.get("PORT"));
    connection_1.sequelize.sync({ force: false });
}));
