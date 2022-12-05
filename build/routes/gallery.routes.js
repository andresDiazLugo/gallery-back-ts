"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_controllers_1 = require("../controllers/gallery.controllers");
const uploadsfiles_1 = __importDefault(require("../midlleware/uploadsfiles"));
const authUser_1 = require("../midlleware/authUser");
const routes = (0, express_1.Router)();
routes.post("/upload", authUser_1.tokenValidation, uploadsfiles_1.default.array('avatar', 10), gallery_controllers_1.postUploadFile);
routes.get("/allImages", authUser_1.tokenValidation, gallery_controllers_1.getAllImages);
routes.delete("/allImages/:idCloud", gallery_controllers_1.deleteImage);
exports.default = routes;
