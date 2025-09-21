"use strict";
//AQUI RECEBE A REQUISIÇÃO E ENVIA PRO BUSSINESS - DEPOIS ELE PEGA A RESPOSTA DO BUSSINESS E ENVIA PRO FRONT
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
class UserController {
    constructor() {
        this.userBusiness = new UserBusiness_1.UserBusiness();
        this.verify = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = this.userBusiness.verify(email);
                console.log("user:", user);
                res.send(user);
            }
            catch (error) {
                res.send(error.sqlMessage || error.message);
            }
        });
        //EXERCICIO 1 - BUSCAR USUARIO POR ID   -   aqui ta recebendo a requisição do endpoint e enviando pro bussiness validar a regra de negócio
        this.buscarUsuarioPorId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = Number(req.params.id);
                const user = this.userBusiness.getUserById(idUser); // aqui ta enviando pro bussiness validar a regra de negócio
                res.status(200).send(user); // se tudo der certo, retorna o usuario
            }
            catch (error) {
                res.send(error.sqlMessage || error.message);
            }
        });
    }
}
exports.UserController = UserController;
