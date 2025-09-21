//AQUI FICA A PARTE DE CONEXÃO COM O BANCO DE DADOS - FAZ O SELECT, INSERT, UPDATE, DELETE

import { posts } from "../bd";
import { Post } from "../types";


export class PostData {
    criarPost = (novoPost: Post) => {
        try {
            posts.push(novoPost);

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // EXERCICIO 5 - PATCH EDITAR POST - metodo para editar o post no "banco de dados"
    buscarIndicePorId = (id: number): number => {
        try {
            return posts.findIndex(post => post.id === id);
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }

    }

    atualizarPost = (index: number, dadosAtualizados: Post) => {
        try {
            posts[index] = dadosAtualizados;
        }
        catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // EXERCICIO 6 - DELETE - deletar post - metodo para deletar o post no "banco de dados" 
    deletarPost = (index: number) =>{
        try{
            posts.splice(index, 1);
        }catch(error: any){
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // EXERCICIO 7 - GET TODOS OS POSTS - metodo para pegar todos os posts no "banco de dados" pra depois ver se o usuario tem posts ou n
    buscarTodosPosts =()=>{
        return posts;
    }
}