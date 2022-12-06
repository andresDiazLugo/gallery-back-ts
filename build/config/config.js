"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.PORT,
    DATA_BASE_URL: process.env.DATA_BASE_URL || "postgres://postgres:root@localHost:5432/gallery",
    SECRET: process.env.SECRET || "genjutsu"
};
