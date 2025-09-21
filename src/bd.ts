export const users = [
    {id:1, name: "Flávio", email: "flavio@flavio.com", senha: "flavio", role: "admin", age: 30}
]

export const posts = [
    {
        id: 1,
        title: "Primeiro Post do Flávio",
        content: "Conteúdo do meu primeiro post.",
        authorId: 1,
        createdAt: new Date(),
        published: false,
    }
];

// Contadores para gerar o próximo ID sequencial
export let contadorIDUser = users.length > 0 ? users[users.length - 1].id : 0;
export let contadorIDPost =posts.length > 0 ? posts[posts.length - 1]. id : 0;

export const getNextUserId = (): number => {
    contadorIDUser++;
    return contadorIDUser;
};

export const getNextPostId = (): number => {
    contadorIDPost++;
    return contadorIDPost;
};
