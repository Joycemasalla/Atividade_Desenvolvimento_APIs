import express from 'express'
import cors from 'cors'

export const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003')
})


// Route recebe requisição → userRouter.get('/:id', ...)
// Controller processa parâmetros → const id = Number(req.params.id)
// Business aplica regras → valida ID, verifica se existe
// Data busca no "banco" → users.find(user => user.id === id)
// Controller formata resposta → ApiResponse estruturada
// Route retorna ao cliente → res.status(200).send(response)