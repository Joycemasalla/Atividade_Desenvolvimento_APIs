# 🎓 API de Revisão de Endpoints HTTP - Guia Completo

Este projeto é um material didático para aprender desenvolvimento de APIs REST com Node.js, TypeScript e Express. Foi estruturado como uma progressão do básico ao intermediário, com exercícios práticos para consolidar o aprendizado.

---

## 🎯 Objetivos de Aprendizagem

* **Métodos HTTP:** Entender e implementar os 5 principais verbos HTTP: `GET`, `POST`, `PUT`, `PATCH` e `DELETE`.
* **Passagem de Parâmetros:** Dominar as três formas principais: **Route Params**, **Query Params** e **Request Body**.
* **Validações:** Implementar validações básicas e robustas de dados.
* **Status Codes:** Usar códigos HTTP apropriados para cada situação (ex: 200, 201, 400, 404, 409).
* **TypeScript:** Aplicar conceitos básicos de tipagem com TypeScript.
* **Boas Práticas:** Estrutura de projeto e respostas HTTP consistentes (Interface `ApiResponse`).

---

## 🚀 Configuração Inicial

### Pré-requisitos

* Node.js (versão 18+)
* npm ou yarn
* Editor de código (VS Code recomendado)
* Cliente HTTP (Postman, Thunder Client, Insomnia)

### Passos de Configuração

1.  **Inicialize o projeto Node.js:**
    ```bash
    npm init -y
    ```
2.  **Instale as dependências necessárias:**
    ```bash
    npm install express typescript @types/express @types/node ts-node-dev
    ```
3.  **Inicialize a configuração do TypeScript:**
    ```bash
    npx tsc --init
    ```
4.  **Ajuste o arquivo `tsconfig.json`** (o conteúdo deve ser exatamente este):
    ```json
    { 
        "compilerOptions": { 
            "target": "es2016", 
            "module": "commonjs", 
            "rootDir": "./src", 
            "outDir": "./dist", 
            "esModuleInterop": true, 
            "forceConsistentCasingInFileNames": true, 
            "strict": true, 
            "skipLibCheck": true 
        } 
    }
    ```
5.  **Configure o `package.json`**: Adicione os seguintes scripts:
    ```json
    { 
        "scripts": { 
            "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
            "build": "tsc",
            "start": "node dist/server.js"
        } 
    }
    ```

---

## 📚 Estrutura do Projeto

O projeto deve seguir a seguinte estrutura (seu arquivo principal de rotas e lógica deve estar em `src/`):
endpoints-review/
├── src/
│ └── server.ts # Arquivo principal (ou divido em router/controller/business)
├── package.json
├── tsconfig.json
└── README.md # Este arquivo

---

## 🎪 Como Usar Este Guia

### 🔍 Legenda dos Símbolos

* **✅ = Método implementado como EXEMPLO (NÃO ALTERAR)**
* **🔧 = Método para SER IMPLEMENTADO pelos alunos**
* **📝 = Seção de conceitos e teoria**

### 📖 Metodologia de Estudo

1.  Leia os conceitos em cada seção.
2.  Estude os exemplos marcados com **✅**.
3.  **Implemente os exercícios marcados com 🔧.**
4.  Teste cada endpoint com um cliente HTTP.
5.  Compare sua implementação com os exemplos e requisitos de validação.

---

## 🎯 Roteiro de Exercícios

### 📖 Seção 1: Métodos GET - Conceitos Básicos

* **Conceitos Abordados:** O que é o método GET, Route Parameters vs Query Parameters, Tratamento de erros 404, Filtros e buscas.
* **✅ Exemplo Implementado:** `GET /users` (Listar todos) e `GET /users/search` (Busca com filtros avançados).

#### 🔧 EXERCÍCIO 1: GET com Route Parameter
* **Endpoint:** `GET /users/:id`
* **Objetivo:** Buscar um usuário específico pelo ID.
* **Testes:**
    * `GET /users/1`
    * `GET /users/999` (Deve retornar 404)

#### 🔧 EXERCÍCIO 2: GET com Query Parameters Avançados
* **Endpoint:** `GET /users/age-range?min=25&max=35`
* **Objetivo:** Filtrar usuários por faixa etária.
* **Dicas:**
    * Capture `req.query.min` e `req.query.max`.
    * Valide se são números válidos (**Retorne 400 se inválido**).
    * Filtre usuários dentro do range.
* **Testes:**
    * `GET /users/age-range?min=20&max=40`
    * `GET /users/age-range?min=abc&max=40` (Deve dar erro 400)

### 📝 Seção 2: Métodos POST - Criando Dados

* **Conceitos Abordados:** Request Body e JSON, Validação de dados, Status **201 (Created)**, Prevenção de duplicatas.
* **✅ Exemplo Implementado:** `POST /users` (Criar usuário com validações completas).

#### 🔧 EXERCÍCIO 3: POST com Validações Personalizadas
* **Endpoint:** `POST /posts`
* **Body de Exemplo:**
    ```json
    { 
        "title": "Meu Post", 
        "content": "Conteúdo do post...", 
        "authorId": 1 
    }
    ```
* **Objetivo:** Criar sistema de posts relacionados aos usuários.
* **Regras de Validação:**
    * `title`: mínimo 3 caracteres
    * `content`: mínimo 10 caracteres
    * `authorId`: deve existir na lista de usuários
* **Estrutura do Post (Interface):**
    ```typescript
    interface Post { 
        id: number; 
        title: string; 
        content: string; 
        authorId: number; 
        createdAt: Date; 
        published: boolean; // Posts são criados como false
    } 
    ```

### 🔄 Seção 3: Métodos PUT e PATCH - Atualizando Dados

* **Conceitos Abordados:** Diferença entre PUT (completo) e PATCH (parcial), Spread operator para atualizações, Validação de campos permitidos, Preservação de dados importantes.
* **✅ Exemplo Implementado:** `PATCH /users/:id` (Atualização parcial avançada).

#### 🔧 EXERCÍCIO 4: PUT - Atualização Completa
* **Endpoint:** `PUT /users/:id` (Ex: `/users/1`)
* **Objetivo:** Substituir o objeto do usuário completamente.
* **Regras para PUT:**
    * **TODOS** os campos devem ser fornecidos no corpo (validação de campos faltantes).
    * Validar como no POST (campos obrigatórios, formato do `role`, etc.).
    * Verificar conflitos de email (retornar **409 Conflict** se o novo email já pertencer a outro usuário).

#### 🔧 EXERCÍCIO 5: PATCH para Posts
* **Endpoint:** `PATCH /posts/:id` (Ex: `/posts/1`)
* **Objetivo:** Permitir atualização parcial do post.
* **Regras para PATCH:**
    * **Campos Permitidos:** `title`, `content`, `published`.
    * **Não Permitir Alteração:** `id`, `authorId`, `createdAt`.
    * Aplicar validações de formato e tamanho (min 3 p/ title, min 10 p/ content) se o campo for enviado.

### 🗑️ Seção 4: Métodos DELETE - Removendo Dados

* **Conceitos Abordados:** Idempotência do DELETE, Regras de negócio, Autorização e permissões.
* **✅ Exemplos Implementados:** `DELETE /users/:id` (Remoção com regras de negócio) e `DELETE /users/bulk-delete`.

#### 🔧 EXERCÍCIO 6: DELETE com Autorização
* **Endpoint:** `DELETE /posts/:id` (Ex: `/posts/1`)
* **Objetivo:** Deletar um post, exigindo autorização.
* **Regras:**
    * Para simplificar, usar o Header **`User-Id`** para identificar o usuário solicitante.
    * Apenas o **autor do post ou um administrador (`role: admin`)** podem remover.
    * Retornar **403 Forbidden** se o usuário não tiver permissão.
    * Verificar se o post existe (Retornar **404** se não existir).

#### 🔧 EXERCÍCIO 7: DELETE Condicional
* **Endpoint:** `DELETE /users/cleanup-inactive?confirm=true`
* **Objetivo:** Remover usuários inativos (usuários sem nenhum post).
* **Regras:**
    * **Parâmetro `confirm=true` obrigatório** (Retornar erro 400 se ausente/false).
    * Não remover administradores (`role: admin`).
    * Retornar a lista de usuários removidos no corpo da resposta.

---

## ✅ Lista de Verificação (Para a Nota Máxima)

| Categoria | Requisito | Status Code Esperado |
| :--- | :--- | :--- |
| **Básico** | GET simples funcionando | `200` |
| | Route parameters implementados (Ex. 1) | `200`/`404` |
| | Query parameters funcionando (Ex. 2) | `200` |
| | POST com validações (Ex. 3) | `201`/`400` |
| | Tratamento de erros 404/400 (básico) | `404`/`400` |
| **Intermediário** | PUT vs PATCH implementados (Ex. 4 e 5) | `200`/`400`/`409` |
| | DELETE com regras de negócio (Ex. 6 e 7) | `200`/`403`/`404` |
| | Validações robustas (acumulando erros e retornando 400) | `400` |
| | Status codes apropriados (conforme lista abaixo) | `200`, `201`, `400`, `404`, `409`, `403` |
| | Interface `ApiResponse` consistente | Todos |

### Status Codes Apropriados (Guia Rápido)

* `200 OK`: Sucesso geral (GET, PATCH, DELETE com sucesso).
* `201 Created`: Novo recurso criado com sucesso (POST).
* `400 Bad Request`: Dados inválidos, campos faltantes, ou regra de negócio violada por input (Ex: `min > max`).
* `403 Forbidden`: Usuário não tem permissão para a ação (Ex: DELETE sem ser autor/admin).
* `404 Not Found`: Recurso não encontrado (Ex: ID de usuário ou post inexistente).
* `409 Conflict`: Conflito de dados (Ex: Tentar criar/editar com email duplicado).

---

## 📖 Recursos Adicionais

* [Documentação Express.js](https://expressjs.com/en/4/api.html)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [HTTP Status Codes (MDN)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)
* **Ferramentas Recomendadas:** VS Code com extensões TypeScript e Thunder Client / Postman para testes de API.

**Bom estudo!** 
Lembre-se: o aprendizado vem da prática. Implemente cada exercício com calma, teste bastante e não tenha medo de experimentar!