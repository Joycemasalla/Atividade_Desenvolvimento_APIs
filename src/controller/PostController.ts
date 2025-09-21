//AQUI RECEBE A REQUISIÇÃO E ENVIA PRO BUSSINESS - DEPOIS ELE PEGA A RESPOSTA DO BUSSINESS E ENVIA PRO FRONT

import { Request, Response } from 'express'
import { PostBussiness } from '../business/PostBusiness'
import { ApiResponse } from '../types';

export class PostController {
    postBussiness = new PostBussiness();

    criarPost = async (req: Request, res: Response) => {
        try {
            const { title, content, authorId } = req.body; // pegando os dados do corpo da requisição 
            const novoPost = this.postBussiness.criarPost(title, content, authorId); // enviando os dados pro bussiness validar a regra de negócio
            const response: ApiResponse = {
                success: true,
                message: "Post criado com sucesso.",
                data: novoPost
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

    atualizarPost = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const { title, content, published } = req.body;

            const novosDados: any = {};
            if (title !== undefined) novosDados.title = title;
            if (content !== undefined) novosDados.content = content;
            if (published !== undefined) novosDados.published = published;

            const message = this.postBussiness.atualizarPost(id, novosDados);
            const response: ApiResponse = {
                success: true,
                message: message
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

    // EXERCICIO 6 - DELETE - deletar post
    deletarPost = async (req: Request, res: Response) => {
        try {
            const postId = Number(req.params.id);
            // pega o ID do usuário do header.
            const userIdHeader = req.headers['user-id'];
            if (!userIdHeader) {
                const response: ApiResponse = {
                    success: false,
                    message: "Header 'User-Id' é obrigatório"
                };
                return res.status(400).send(response);
            }
            const userId = Number(userIdHeader);
            const message = this.postBussiness.deletarPost(postId, userId);
            const response: ApiResponse = {
                success: true,
                message: message
            };
            res.status(200).send(response);
        } catch (error: any) {
            const response: ApiResponse = {
                success: false,
                message: error.message
            };
            if (error.message.includes("não encontrado")) {
                res.status(404).send(response);
            } else if (error.message.includes("permissão")) {
                res.status(403).send(response);
            } else {
                res.status(500).send(response);
            }
        }
    }
}


