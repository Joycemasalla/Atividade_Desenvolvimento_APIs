"use strict";
//AQUI FICA A PARTE DE CONEXÃO COM O BANCO DE DADOS - FAZ O SELECT, INSERT, UPDATE, DELETE
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = void 0;
const bd_1 = require("../bd");
class UserData {
    constructor() {
        this.buscarUsuarioPorEmail = (email) => {
            try {
                const userFound = bd_1.users.filter((user) => {
                    return user.email == email;
                });
                return userFound;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        };
        //EXERCICIO 1 - BUSCAR USUARIO POR ID - aqui ta fazendo o select no banco de dados pelo id do usuario 
        this.buscarUsuarioPorId = (idUser) => {
            try {
                const user = bd_1.users.find(user => user.id == idUser);
                return user;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        };
    }
}
exports.UserData = UserData;
