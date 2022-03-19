const express = require('express');

import { 
  addNewUser, 
  signInUserController,
} from './Auth.controllers';
import { validateSignUpData, validateSignInData } from './Auth.validation';

const router = express.Router();

// api/auth/register
router
  .route('/register')
  .post(validateSignUpData,addNewUser)

// /api/users/login
router
  .route('/login')
  .post(validateSignInData, signInUserController)

export default router