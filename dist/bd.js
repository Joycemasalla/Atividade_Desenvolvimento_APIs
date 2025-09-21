"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.users = void 0;
exports.users = [
    { id: 1, name: "Flávio", email: "flavio@flavio.com", senha: "flavio" }
];
exports.posts = [
    {
        id: 101,
        title: "Primeiro Post do Flávio",
        content: "Conteúdo do meu primeiro post aqui na API.",
        authorId: 1,
        createdAt: new Date(),
        published: true,
    },
    {
        id: 102,
        title: "Dica de backend",
        content: "Usar console.log para debugar é uma das melhores práticas[cite: 272].",
        authorId: 2,
        createdAt: new Date(),
        published: true,
    },
    {
        id: 103,
        title: "TypeScript é top",
        content: "Tipagem é vida, ajuda a evitar erros bobos.",
        authorId: 1,
        createdAt: new Date(),
        published: false,
    }
];
