//AQUI FICA A PARTE DE CONEXÃO COM O BANCO DE DADOS - FAZ O SELECT, INSERT, UPDATE, DELETE

import { users } from "../bd";
import { User } from "../types";

export class UserData {
    buscarUsuarioPorEmail = (email: string) => {
        const user = users.find((user) => {
            return user.email === email;  
        })
        return user;  // Retorna o usuário ou undefined
    }

    buscarTodosUsuarios = () => {
        try {
            return users;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    criarUsuario = (newUser: User) => {
        try {
            users.push(newUser);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // TESTE DE BUSCA POR NOME E ROLE 
    buscarUsuariosPorNomeERole = (name: string, role: string) => {
        try {
            return users.filter(user => {
                const nameMatch = name ? user.name.toLowerCase().includes(name.toLowerCase()) : true;
                const roleMatch = role ? user.role === role : true;
                return nameMatch && roleMatch;
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //EXERCICIO 1 - BUSCAR USUARIO POR ID - aqui ta fazendo o select no banco de dados pelo id do usuario 
    buscarUsuarioPorId = (idUser: number) => {
        try {
            const user = users.find(user => user.id === idUser);
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    //EXERCICIO 2 - BUSCAR USUARIO POR PARAMETROS DE FAIXA ETARIA
    buscarUsuariosPorFaixaEtaria = (minAge: number, maxAge: number) => {
        //const age = 28; // idade fixa para teste já que n tem campo idade no bd
        try {
            const userAge = users.filter(user => user.age >= minAge && user.age <= maxAge);
            return userAge;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    //EXERCICIO 4 - PUT - ATUALIZAR USUARIO COMPLETO
    buscarIndiceporid = (idUser: number) => {
        try {
            return users.findIndex(user => user.id === idUser);
        }
        catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    atualizarUsuario = (index: number, dadoAtualizados: User) => {
        try {
            users[index] = dadoAtualizados;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // EXERCICIO 7 - DELETE CONDICIONAL - remover usuarios sem posts
    deletarUsuario = (index: number) => {
        try {
            users.splice(index, 1);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}