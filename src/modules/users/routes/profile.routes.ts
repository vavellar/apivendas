import { Router } from 'express';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';
import ProfileValidator from '../validators/ProfileValidator';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/me', profileController.show);

profileRouter.put(
  '/update',
  ProfileValidator.create(),
  profileController.update,
);

export default profileRouter;
