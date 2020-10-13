import { Router } from 'express';
import populacaoRouter from './populacao';

const routes = Router();

routes.use('/populacao', populacaoRouter);

export default routes;
