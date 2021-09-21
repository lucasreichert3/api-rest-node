import express from 'express';
import EstoqueController from '../controller/EstoqueController'

const router = express.Router();

router.get('/', (req, res) => {
  res.json(EstoqueController.getEstoque())
});

export default router;
