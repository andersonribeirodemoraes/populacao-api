import { Router } from 'express';
import PopulacaoController from '../controllers/populacao';

const populacaoRouter = Router();

const populacaoController = new PopulacaoController();

populacaoRouter.get('/:uf', populacaoController.show);

export default populacaoRouter;
