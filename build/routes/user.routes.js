"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const authUser_1 = require("../midlleware/authUser");
const uploadsfiles_1 = __importDefault(require("../midlleware/uploadsfiles"));
const routes = (0, express_1.Router)();
routes.post("/signup", user_controllers_1.postSignUp);
routes.post("/sigin", user_controllers_1.postsignIn);
routes.post("/user/upload", authUser_1.tokenValidation, uploadsfiles_1.default.single('avatar'), user_controllers_1.postUserImg);
routes.get("/user/:id", authUser_1.tokenValidation, user_controllers_1.getUser);
exports.default = routes;
