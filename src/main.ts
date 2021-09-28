import express from 'express';
import db from './database/database.config';
import estoqueRouter from './router/EstoqueRouter';
import produtoRouter from './router/ProdutoRouter';


db.sync().then(() => {
  console.log('connected to db')
})

const app = express();
app.use(express.json());

const port = 9000;

app.use('/estoque', estoqueRouter)
app.use('/produto', produtoRouter)

app.listen(port, () => {
  console.log('server is running');
});
