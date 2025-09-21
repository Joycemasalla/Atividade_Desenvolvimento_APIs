//AQUI DEFINE OS ENDPOINTS

import express from 'express'
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/verify', userController.verify)

userRouter.get('/', userController.buscarTodosUsuarios);

userRouter.post('/', userController.criarUsuario);


//EXERCICIO 2 - BUSCAR USUARIO POR PARAMETROS DE FAIXA ETARIA - aqui ta definindo o endpoint que vai receber a requisição para buscar os usuarios pela faixa etaria
userRouter.get('/age-range', userController.buscarUsuariosPorFaixaEtaria );

//EXERCICIO 1 - BUSCAR USUARIO POR ID - aqui ta definindo o endpoint que vai receber a requisição para buscar o usuario pelo id
userRouter.get('/:id', userController.buscarUsuarioPorId );



//EXERCICIO 4 - PUT - ATUALIZAR USUARIO COMPLETO - aqui ta definindo o endpoint que vai receber a requisição para atualizar o usuario
userRouter.put('/:id', userController.atualizarUsuario);

// EXERCICIO 7 - DELETE CONDICIONAL - remover usuarios sem posts
userRouter.delete('/cleanup-inactive', userController.limparInativos);

