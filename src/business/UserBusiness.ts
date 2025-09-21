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
            // Limpar dados antes da validação
            newUser.name = newUser.name?.trim();
            newUser.email = newUser.email?.trim().toLowerCase();

            if (!newUser.name || !newUser.email || !newUser.role || !newUser.age || !newUser.senha) {
                throw new Error("Campos faltantes")
            }

            if (newUser.role !== "user" && newUser.role !== "admin") {
                throw new Error("O campo 'role' deve ser 'user' ou 'admin'")
            }

            const emailExiste = users.some(user => user.email === newUser.email);
            if (emailExiste) {
                throw new Error("Já existe um usuário com este e-mail.")
            }

            const novoId = getNextUserId();
            const userComId: User = {
                ...newUser,
                id: novoId
            }

            this.userData.criarUsuario(userComId);

            return userComId;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    //EXERCICIO 1 - BUSCAR USUARIO POR ID - Aqui ta validando a regra de negócio antes de ir pro data buscar no banco de dados
    buscarUsuarioPorId = (id: number) => {
        try {
            if (!id || id <= 0) {
                throw new Error("ID faltando.");
            }
            const user = this.userData.buscarUsuarioPorId(id); // aqui ta buscando no banco o usuario pelo id
            if (!user) {
                throw new Error("Usuario não encontrado."); // se n achar, da erro
            }
            return user; // se achar, retorna o usuario
        } catch (error: any) {
            throw new Error(error.message); // se der algum erro, retorna o erro
        }

    }


    // Linha ~83 - Não retornar erro para array vazio
    getUsersByAgeRange = (minAge: number, maxAge: number) => {
        try {
            if (isNaN(minAge) || isNaN(maxAge)) {
                throw new Error("Parâmetros inválidos. Devem ser números.");
            }
            if (minAge < 0 || maxAge < 0) {
                throw new Error("Idade não pode ser negativa.");
            }
            if (minAge > maxAge) {
                throw new Error("Idade mínima não pode ser maior que a máxima.");
            }

            const users = this.userData.buscarUsuariosPorFaixaEtaria(minAge, maxAge);
            return users; // ✅ Retorna array vazio se não encontrar, não erro
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    //EXERCICIO 4 - PUT - ATUALIZAR USUARIO COMPLETO
    atualizarUsuario = (id: number, name: string, email: string, role: string, age: number, senha: string) => {
        try {
            if (!id || !name || !email || !role || !age || !senha) {
                throw new Error("Campos faltantes");
            }
            if (role !== "user" && role !== "admin") {
                throw new Error("O campo 'role' deve ser 'user' ou 'admin'");
            }

            const userIndex = this.userData.buscarIndiceporid(id); // aqui ta buscando o indice do usuario no array pelo id
            if (userIndex === -1) {
                throw new Error("Usuario não encontrado");
            }

            const emailExiste = users.some(user => user.email === email && user.id !== id);
            if (emailExiste) {
                throw new Error("Já existe um usuário com este e-mail.");
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


        } catch (error: any) {
            throw new Error(error.message);
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


        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}