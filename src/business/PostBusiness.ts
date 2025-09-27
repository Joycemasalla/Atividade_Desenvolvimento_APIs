//AQUI FICA AS REGRAS DO NEGÓCIO

import { PostData } from "../data/PostData";
import { UserBusiness } from "./UserBusiness";
import { Post } from "../types";
import { posts, getNextPostId } from "../bd";

export class PostBussiness {
    postData = new PostData();
    userBusiness = new UserBusiness();

    //EXERCICIO 3 - POST COM VALIDAÇÕES 
    criarPost = (title: string, content: string, authorId: number) => {
        try {
            const erros: string[] = [];
            if (!title) { erros.push("O campo 'title' é obrigatório."); }
            if (!content) { erros.push("O campo 'content' é obrigatório."); }
            if (!authorId) { erros.push("O campo 'authorId' é obrigatório."); }

            if (title && title.length < 3) {
                erros.push("O título deve ter no mínimo 3 caracteres.");
            }
            if (content && content.length < 10) {
                erros.push("O conteúdo deve ter no mínimo 10 caracteres.");
            }
            const userBusiness = new UserBusiness();
            const author = this.userBusiness.buscarUsuarioPorId(authorId);
            if (!author) {
                erros.push("Autor não encontrado.");
            }

            if (erros.length > 0) {
                // Junta as mensagens de erro usando ponto e vírgula e espaço
                const mensagemDetalhada = erros.join('\n- ');
                const mensagemErros = new Error(`Erros de Validação:\n- ${mensagemDetalhada}`);
                (mensagemErros as any).status = 400;
                throw mensagemErros;
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
        } catch (mensagemErros: any) {
            throw mensagemErros;
        }
    }

    // EXERCICIO 5 - PATCH EDITAR POST - metodo para editar o post parcialmente
    atualizarPost = (id: number, novosDados: any) => {
        try {
            const erros: string[] = [];
            //  Validar se o ID do post existe
            const postIndex = this.postData.buscarIndicePorId(id);
            if (postIndex === -1) {
                erros.push("Post não encontrado.");
            }

            //  Obter o post atual para a atualização
            const postAntigo = posts[postIndex];

            // Lógica de atualização com verificação direta dos campos
            const postAtualizado = { ...postAntigo };

            // atualiza campo por campo, se ele existir nos novos dados
            if (novosDados.title !== undefined) {
                // Se o novo título foi enviado, atulixa
                postAtualizado.title = novosDados.title;
            }

            if (novosDados.content !== undefined) {
                // Se o novo conteúdo foi enviado, atualiza
                postAtualizado.content = novosDados.content;
            }

            if (novosDados.published !== undefined) {
                // Se o status de publicação foi enviado, atuliza
                postAtualizado.published = novosDados.published;
            }
            if (erros.length > 0) {
                // Junta as mensagens de erro usando ponto e vírgula e espaço
                const mensagemDetalhada = erros.join('\n- ');
                const mensagemErros = new Error(`Erros de Validação:\n- ${mensagemDetalhada}`);
                (mensagemErros as any).status = 400;
                throw mensagemErros;
            }
            //  Chamar a camada de Data para salvar
            this.postData.atualizarPost(postIndex, postAtualizado);

            return "Post atualizado com sucesso.";

        } catch (mensagemErros: any) {
            throw mensagemErros;
        }
    }

    // EXERCICIO 6 - DELETE - deletar post - metodo para deletar o post
    deletarPost = (postId: number, userId: number) => {
        try {
            const erros: string[] = [];
            // 1. Validar se o ID do post existe
            const postIndex = this.postData.buscarIndicePorId(postId);
            if (postIndex === -1) {
                throw new Error("Post não encontrado.");
            }

            const postPraDeletar = posts[postIndex];

            // 2. Verificar se o userId corresponde ao authorId do post

            const user = this.userBusiness.buscarUsuarioPorId(userId);
            //  checar se o usuário existe ANTES de acessar a role.
            const isAdmin = user && user.role === "admin";
            const isAuthor = postPraDeletar.authorId === userId;

            // Apenas autor OU admin podem remover.
            if (!isAuthor && !isAdmin) {
                erros.push("Apenas o autor do post ou um admin podem deletar este post.");
            }

            if (erros.length > 0) {
                // Junta as mensagens de erro usando ponto e vírgula e espaço
                const mensagemDetalhada = erros.join('\n- ');
                const mensagemErros = new Error(`Erros de Validação:\n- ${mensagemDetalhada}`);
                (mensagemErros as any).status = 400;
                throw mensagemErros;
            }
            // 3. Chamar a camada de Data para deletar
            this.postData.deletarPost(postIndex);

            return "Post deletado com sucesso.";
        } catch (mensagemErros: any) {
            throw mensagemErros;
        }
    }


}