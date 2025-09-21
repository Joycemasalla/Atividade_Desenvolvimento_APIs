//AQUI FICA AS REGRAS DO NEGÓCIO

import { PostData } from "../data/PostData";
import { UserBusiness } from "./UserBusiness";
import { Post } from "../types";
import { posts, getNextPostId } from "../bd";

export class PostBussiness {
    postData = new PostData();
    userBusiness = new UserBusiness(); 

    criarPost = (title: string, content: string, authorId: number) => {
        try {
            if (!title || !content || !authorId) {
                throw new Error("Campos faltantes")
            }
            if (title.length < 3) {
                throw new Error("O título deve ter no mínimo 3 caracteres.");
            }
            if (content.length < 10) {
                throw new Error("O conteúdo deve ter no mínimo 10 caracteres.");
            }
            const userBusiness = new UserBusiness();
            const author = userBusiness.buscarUsuarioPorId(authorId);
            if (!author) {
                throw new Error("Autor não encontrado.");
            }

            
            const novoId = getNextPostId();

            const novopost: Post = {
                id: novoId,
                title,
                content,
                authorId,
                createdAt: new Date(),
                published: false, // novo post começa como não publicado
            }

            this.postData.criarPost(novopost); // chamando o metodo do data para criar o post no "banco de dados" 
            return novopost;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // EXERCICIO 5 - PATCH EDITAR POST - metodo para editar o post
    atualizarPost = (id: number, novosDados: any) => {
        try {
            // 1. Validar se o ID do post existe
            const postIndex = this.postData.buscarIndicePorId(id);
            if (postIndex === -1) {
                throw new Error("Post não encontrado.");
            }

            // 2. Obter o post atual para a atualização
            const postAntigo = posts[postIndex];

            // 3. Lógica de atualização com verificação direta dos campos
            // Usamos o spread operator para manter os dados antigos
            const postAtualizado = { ...postAntigo };

            // Verificamos e atualizamos campo por campo, se ele existir nos novos dados
            if (novosDados.title !== undefined) {
                // Se o novo título foi enviado, atualizamos
                postAtualizado.title = novosDados.title;
            }

            if (novosDados.content !== undefined) {
                // Se o novo conteúdo foi enviado, atualizamos
                postAtualizado.content = novosDados.content;
            }

            if (novosDados.published !== undefined) {
                // Se o status de publicação foi enviado, atualizamos
                postAtualizado.published = novosDados.published;
            }

            // 4. Chamar a camada de Data para salvar
            this.postData.atualizarPost(postIndex, postAtualizado);

            return "Post atualizado com sucesso.";

        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // EXERCICIO 6 - DELETE - deletar post - metodo para deletar o post
    deletarPost = (postId: number, userId: number) => {
        try {
            // 1. Validar se o ID do post existe
            const postIndex = this.postData.buscarIndicePorId(postId);
            if (postIndex === -1) {
                throw new Error("Post não encontrado.");
            }

            const postPraDeletar = posts[postIndex];

            // 2. Verificar se o userId corresponde ao authorId do post

            const user = this.userBusiness.buscarUsuarioPorId(userId);

            if (postPraDeletar.authorId !== userId && user.role !== "admin") {
                throw new Error("Apenas o autor do post ou um admin podem deletar este post.");
            }

            // 3. Chamar a camada de Data para deletar
            this.postData.deletarPost(postIndex);

            return "Post deletado com sucesso.";
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


}