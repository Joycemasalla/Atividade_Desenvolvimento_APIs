"use strict";
//AQUI FICA AS REGRAS DO NEGÓCIO
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const UserData_1 = require("../data/UserData");
class UserBusiness {
    constructor() {
        this.userData = new UserData_1.UserData();
        this.verify = (email) => {
            try {
                if (!email) {
                    throw new Error("Campos faltantes");
                }
                const user = this.userData.buscarUsuarioPorEmail(email);
                if (!user) {
                    throw new Error("Usuario inexistente");
                }
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        };
        //EXERCICIO 1 - BUSCAR USUARIO POR ID - Aqui ta validando a regra de negócio antes de ir pro data buscar no banco de dados
        this.buscarUsuarioPorId = (id) => {
            try {
                if (!id || id <= 0) {
                    throw new Error("ID faltando ou inválido.");
                }
                const user = this.userData.buscarUsuarioPorId(id); // aqui ta buscando no banco o usuario pelo id
                if (!user) {
                    throw new Error("Usuario não encontrado."); // se n achar, da erro
                }
                return user; // se achar, retorna o usuario
            }
            catch (error) {
                throw new Error(error.message); // se der algum erro, retorna o erro
            }
        };
    }
}
exports.UserBusiness = UserBusiness;
