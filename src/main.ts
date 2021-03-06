import express from 'express';
import swaggerUi from 'swagger-ui-express';
import db from './database/database.config';
import { EstoqueProdutoModel } from './model/EstoqueProduto';
import estoqueRouter from './router/EstoqueRouter';
import produtoRouter from './router/ProdutoRouter';
import estoqueProdutoRouter from './router/EstoqueProdutoRouter';
import autenticacaoRouter from './router/AutenticacaoRouter';
import usuarioRouter from './router/UsuarioRouter';
import swaggerDocs from './swagger.json';

db.sync().then(async () => {
  console.log('connected to db')
  await EstoqueProdutoModel.sync()
})

const app = express();
app.use(express.json());

app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const port = 9000;

app.use('/produto', produtoRouter)
app.use('/estoque', estoqueRouter)
app.use('/estoqueProduto', estoqueProdutoRouter)
app.use('/usuario', usuarioRouter)
app.use('/', autenticacaoRouter)

app.listen(port, () => {
  console.log('server is running');
});
