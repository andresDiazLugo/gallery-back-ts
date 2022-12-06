"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const gallery_routes_1 = __importDefault(require("./routes/gallery.routes"));
const app = (0, express_1.default)();
//configuraciones de server
app.set("saludo", "hola andres");
app.set("PORT", 4000 || config_1.config.PORT);
app.set("dirnameUpload", __dirname);
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
//routes
app.use("/api/users", user_routes_1.default);
app.use("/api/gallery", gallery_routes_1.default);
exports.default = app;
