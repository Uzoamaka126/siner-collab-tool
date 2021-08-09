const express = require('express');

import { 
  addNewUser, 
  signInUserController,
} from './Auth.controllers';

const router = express.Router();

// api/auth/register
router
  .route('/register')
  .post(addNewUser)

// /api/users/login
router
  .route('/login')
  .post(signInUserController)

export default router