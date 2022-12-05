"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const tokenValidation = (req, res, next) => {
    const token = req.header('auth-token');
    // console.log("ver token",token)
    if (!token)
        return res.status(401).json('Acceso denegado');
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.config.SECRET);
        req.userId = payload.id;
    }
    catch (error) {
        return res.status(404).json({
            msg: 'Acceso denegado'
        });
    }
    next();
};
exports.tokenValidation = tokenValidation;
