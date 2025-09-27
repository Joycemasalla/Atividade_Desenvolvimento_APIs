//AQUI RECEBE A REQUISIÇÃO E ENVIA PRO BUSSINESS - DEPOIS ELE PEGA A RESPOSTA DO BUSSINESS E ENVIA PRO FRONT

import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness';
import { users } from '../bd';
import { ApiResponse } from '../types';

export class UserController {
    userBusiness = new UserBusiness()
    verify = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const user = this.userBusiness.verify(email);
            console.log("user:", user)
            const response: ApiResponse = {
                success: true,
                message: "Usuário encontrado com sucesso",
                data: user
            }
            res.status(200).send(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            res.status(404).send(response);
        }
    }

    buscarTodosUsuarios = async (req: Request, res: Response) => {
        try {
            const todosUsers = this.userBusiness.buscarTodosUsuarios();
            const response: ApiResponse = {
                success: true,
                message: "Lista de usuários retornada com sucesso.",
                data: todosUsers
            }
            return res.status(200).send(response)
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            res.status(500).send(response);
        }
    }

    criarUsuario = async (req: Request, res: Response) => {
        try {
            const { id, name, email, role, age, senha } = req.body;
            const newUser = { id, name, email, role, age, senha };
            const novoUsuario = this.userBusiness.criarusuario(newUser);
            const response: ApiResponse = {
                success: true,
                message: "Usuário criado com sucesso.",
                data: novoUsuario
            };
            res.status(201).send(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            res.status(400).send(response);
        }

    }

    //EXERCICIO 1 - BUSCAR USUARIO POR ID   -   aqui ta recebendo a requisição do endpoint e enviando pro bussiness validar a regra de negócio
    buscarUsuarioPorId = async (req: Request, res: Response) => {
        try {
            const idUser = Number(req.params.id);
            if (isNaN(idUser)) {
                const response: ApiResponse = {
                    success: false,
                    message: "ID deve ser um número válido"
                };
                return res.status(400).send(response);
            }
            const user = this.userBusiness.buscarUsuarioPorId(idUser); // aqui ta enviando pro bussiness validar a regra de negócio
            const response: ApiResponse = {
                success: true,
                message: "Usuário encontrado com sucesso.",
                data: user
            };
            res.status(200).send(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            if (error.message.includes("não encontrado")) {
                res.status(404).send(response);
            } else {
                res.status(400).send(response);
            }
        }
    }

    //EXERCICIO 2 - BUSCAR USUARIO POR PARAMETROS DE FAIXA ETARIA - aqui ta recebendo a requisição do endpoint e enviando pro bussiness validar a regra de negócio
    buscarUsuariosPorFaixaEtaria = async (req: Request, res: Response) => {
        try {
            const minAge = Number(req.query.min);
            const maxAge = Number(req.query.max);
            const users = this.userBusiness.getUsersByAgeRange(minAge, maxAge);

            const response: ApiResponse = {
                success: true,
                message: users.length > 0 ? "Usuários encontrados com sucesso." : "Nenhum usuário encontrado nessa faixa etária.",
                data: users,
                total: users.length
            };
            res.status(200).send(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            res.status(400).send(response);
        }
    }

    //EXERCICIO 4 - PUT ATUALIZAÇÃO COMPLETA
    atualizarUsuario = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const { name, email, role, senha, age } = req.body;

            this.userBusiness.atualizarUsuario(id, name, email, role, age, senha);
            const response: ApiResponse = {
                success: true,
                message: "Usuário atualizado com sucesso."
            };
            res.status(200).send(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            if (error.message.includes("não encontrado")) {
                res.status(404).send(response);
            } else {
                res.status(400).send(response);
            }
        }
    }


    // EXERCICIO 7 - DELETE CONDICIONAL - remover usuarios sem posts
    limparInativos = async (req: Request, res: Response) => {
        try {
            const confirm = req.query.confirm === 'true'; // converte o valor da query para boolean

            const usuariosParaDeletar = this.userBusiness.limparInativos(confirm);
            const response: ApiResponse = {
                success: true,
                message: `Usuários inativos removidos com sucesso.`,
                data: usuariosParaDeletar
            };
            res.status(200).send(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            res.status(400).send(response);
        }
    }

}


