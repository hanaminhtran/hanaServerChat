import * as Router from 'koa-router';

import { githubOAuthController, loginController, registerController } from '../controllers';

export const apiRoutes = new Router()
  .post('/register', registerController) // Register
  .post('/login', loginController) // Log in
  .post('/github_oauth', githubOAuthController);
