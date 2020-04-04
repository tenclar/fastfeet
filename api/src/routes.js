import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';

import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import OrderController from './app/controllers/OrderController';
import PickupController from './app/controllers/PickupController';

import DeliveryProblem from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({ message: ' FASTFEET api ok' });
});
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);
routes.get('/recipients', RecipientController.index);
routes.delete('/recipients/:id', RecipientController.remove);

routes.get('/deliverymans/:id', DeliverymanController.show);
routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);

routes.get('/deliveryman/:id/deliveries', DeliveryController.index);

routes.get('/orders/:id', OrderController.show);
routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.get('/orders/id', OrderController.update);

routes.put('/orders/:id/pickup', PickupController.update);
routes.put('/orders/:id/delivery', DeliveryController.update);

routes.get('/delivery/problems', DeliveryProblem.index);
routes.get('/delivery/:id/problem', DeliveryProblem.edit);
routes.get('/delivery/:id/problems', DeliveryProblem.show);
routes.post('/delivery/:id/problems', DeliveryProblem.store);
routes.delete('/delivery/:id/cancel', DeliveryProblem.destroy);

routes.use(authMiddleware);
export default routes;
