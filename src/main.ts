import express from 'express';
import db from './database/database.config';


db.sync().then(() => {
  console.log('connected to db')
})

const app = express();
const port = 9000;

app.get('/', (req, res) => {
  return res.send('deu boa');
});

app.listen(port, () => {
  console.log('server is running');
});
