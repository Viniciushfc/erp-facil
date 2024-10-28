import { Router } from 'express';
import {
  listarFornecedores,
  buscarFornecedor,
  criarFornecedor,
  deletarFornecedor,
  atualizarFornecedor,
} from '../controllers/funcionarioController';

const router = Router();

router.get('/fornecedores', listarFornecedores);
router.get('/fornecedores/:id', buscarFornecedor);
router.post('/fornecedores', criarFornecedor);
router.put('/fornecedores/:id', atualizarFornecedor);
router.delete('/fornecedores/find/:id', deletarFornecedor);

export default router;
