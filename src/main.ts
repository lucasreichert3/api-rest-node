import express from 'express';
import db from './database/database.config';
import { EstoqueProdutoModel } from './model/EstoqueProduto';
import estoqueRouter from './router/EstoqueRouter';
import produtoRouter from './router/ProdutoRouter';
import estoqueProdutoRouter from './router/EstoqueProdutoRouter';


db.sync().then(async () => {
  console.log('connected to db')
  await EstoqueProdutoModel.sync()
})

const app = express();
app.use(express.json());

const port = 9000;

app.use('/estoque', estoqueRouter)
app.use('/produto', produtoRouter)
app.use('/estoqueProduto', estoqueProdutoRouter)

app.listen(port, () => {
  console.log('server is running');
});
