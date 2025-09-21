"use strict";
//AQUI DEFINE OS ENDPOINTS
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
const userController = new UserController_1.UserController();
exports.userRouter.post('/verify', userController.verify);
//EXERCICIO 1 - BUSCAR USUARIO POR ID - aqui ta definindo o endpoint que vai receber a requisição para buscar o usuario pelo id
exports.userRouter.get('/:id', userController.buscarUsuarioPorId);
