//AQUI FICA AS REGRAS DO NEGÓCIO

import { UserData } from "../data/UserData";
import { User } from "../types";
import { users, getNextUserId } from "../bd";
import { PostData } from "../data/PostData";

export class UserBusiness {
    userData = new UserData()
    verify = (email: string) => {
        try {

            if (!email) {
                throw new Error("Campos faltantes")
            }

            const user = this.userData.buscarUsuarioPorEmail(email) as any;
            if (!user) {
                throw new Error("Usuario inexistente");
            }

            return user;

        } catch (error: any) {
            throw new Error(error)
        }
    }

    buscarTodosUsuarios = () => {
        try {
            return this.userData.buscarTodosUsuarios();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    criarusuario = (newUser: User) => {
        try {
            //criar a lista para armazenar os erros
            const erros: string[] = [];


            // Limpar dados antes da validação
            newUser.name = newUser.name?.trim();
            newUser.email = newUser.email?.trim().toLowerCase();

            if (!newUser.name || !newUser.email || !newUser.role || !newUser.age || !newUser.senha) {
                erros.push("Campos faltantes");
            }

            if (newUser.role !== "user" && newUser.role !== "admin") {
                erros.push("O campo 'role' deve ser 'user' ou 'admin'")
            }

            const emailExiste = users.some(user => user.email === newUser.email);
            if (emailExiste) {
                erros.push("Já existe um usuário com este e-mail.")
            }

            if (erros.length > 0) {
                // Junta as mensagens de erro usando ponto e vírgula e espaço
                const mensagemDetalhada = erros.join('\n- ');
                const mensagemErros = new Error(`Erros de Validação:\n- ${mensagemDetalhada}`);
                (mensagemErros as any).status = 400;
                throw mensagemErros;
            }

            const novoId = getNextUserId();
            const userComId: User = {
                ...newUser,
                id: novoId
            }

            this.userData.criarUsuario(userComId);

            return userComId;
        } catch (mensagemErros: any) {
            throw mensagemErros;
        }
    }

    //EXERCICIO 1 - BUSCAR USUARIO POR ID - Aqui ta validando a regra de negócio antes de ir pro data buscar no banco de dados
    buscarUsuarioPorId = (id: number) => {
        try {

            if (!id || id <= 0) {
                return undefined; // Retorna undefined para ID inválido
            }
            const user = this.userData.buscarUsuarioPorId(id); // aqui ta buscando no banco o usuario pelo id
            //Retorna undefined se não encontrar. Não lança erro de "não encontrado".
            return user;

        } catch (error: any) {
            // Se houver erro de Data, lança um erro genérico 500, ou retorna undefined/null
            return undefined;
        }

    }


    getUsersByAgeRange = (minAge: number, maxAge: number) => {
        try {
            const erros: string[] = [];
            if (isNaN(minAge) || isNaN(maxAge)) {
                erros.push("Parâmetros inválidos. Devem ser números.");
            }
            if (minAge < 0 || maxAge < 0) {
                erros.push("Idade não pode ser negativa.");
            }
            if (minAge > maxAge) {
                erros.push("Idade mínima não pode ser maior que a máxima.");
            }

            if (erros.length > 0) {
                // Junta as mensagens de erro usando ponto e vírgula e espaço
                const mensagemDetalhada = erros.join('\n- ');
                const mensagemErros = new Error(`Erros de Validação:\n- ${mensagemDetalhada}`);
                (mensagemErros as any).status = 400;
                throw mensagemErros;
            }
            const users = this.userData.buscarUsuariosPorFaixaEtaria(minAge, maxAge);
            return users; //  Retorna array vazio se não encontrar, não erro
        } catch (mensagemErros: any) {
            throw mensagemErros;
        }
    }

    //EXERCICIO 4 - PUT - ATUALIZAR USUARIO COMPLETO
    atualizarUsuario = (id: number, name: string, email: string, role: string, age: number, senha: string) => {
        try {
            const erros: string[] = [];
            if (!id || !name || !email || !role || !age || !senha) {
                erros.push("Campos faltantes");
            }
            if (role !== "user" && role !== "admin") {
                erros.push("O campo 'role' deve ser 'user' ou 'admin'");
            }

            const userIndex = this.userData.buscarIndiceporid(id); // aqui ta buscando o indice do usuario no array pelo id
            if (userIndex === -1) {
                erros.push("Usuario não encontrado");
            }

            const emailExiste = users.some(user => user.email === email && user.id !== id);
            if (emailExiste) {
                erros.push("Já existe um usuário com este e-mail.");
            }
            if (erros.length > 0) {
                // Junta as mensagens de erro usando ponto e vírgula e espaço
                const mensagemDetalhada = erros.join('\n- ');
                const mensagemErros = new Error(`Erros de Validação:\n- ${mensagemDetalhada}`);
                (mensagemErros as any).status = 400;
                throw mensagemErros;
            }

            const dadosAtualizados: User = {
                id,
                name,
                email,
                role: role as 'user' | 'admin',
                age,
                senha
            }

            this.userData.atualizarUsuario(userIndex, dadosAtualizados);
            return "Usuário atualizado com sucesso.";


        } catch (mensagemErros: any) {
            throw mensagemErros;
        }
    }

    // EXERCICIO 7 - DELETE CONDICIONAL - remover usuarios sem posts
    limparInativos = (confirm: boolean) => {
        try {
            if (!confirm) {
                throw new Error("Confirmação necessária para deletar usuários inativos.");
            }

            const postData = new PostData();
            const todosOsPosts = postData.buscarTodosPosts(); // pega todos os posts do "banco de dados"

            const idDosUsuariosComPosts = todosOsPosts.map(post => post.authorId); // cria um array com os ids dos usuarios que tem posts

            const usuariosPraNaoDeletar = users.filter(user => {
                const usuarioComPosts = idDosUsuariosComPosts.includes(user.id); // verifica se o id do usuario ta no array de ids dos usuarios que tem posts
                return usuarioComPosts || user.role === "admin"; // se tiver posts ou for admin, n deleta
            })

            const usuariosParaDeletar = users.filter(user => {
                return !usuariosPraNaoDeletar.includes(user); // se n tiver posts e n for admin, deleta
            })

            if (usuariosParaDeletar.length === 0) {
                throw new Error("Nenhum usuário inativo encontrado para deletar.");
            }

            users.splice(0, users.length, ...usuariosPraNaoDeletar); // atualiza o array de usuarios com os usuarios que n foram deletados

            return usuariosParaDeletar;


        } catch (mensagemErros: any) {
            throw mensagemErros;
        }
    }
}