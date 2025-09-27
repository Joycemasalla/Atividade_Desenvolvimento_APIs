import express from 'express'
import { PostController } from '../controller/PostController';

export const postRouter = express.Router();

const postController = new PostController();

//Buscar todos os posts
postRouter.get('/', postController.buscarTodosPosts);

//EXERCICIOS 3 -  Rota para criar um novo post
postRouter.post('/', postController.criarPost);

//EXERCICIO 5 - PATCH EDITAR POST - aqui ta definindo o endpoint que vai receber a requisição para editar o post
postRouter.patch('/:id', postController.atualizarPost);

//EXERCICIO 6 - DELETE - deletar post - aqui ta definindo o endpoint que vai receber a requisição para deletar o post
postRouter.delete('/:id', postController.deletarPost);
