const express = require('express');

import { 
  addNewUser, 
  signInUserController,
  intiatePasswordReset
} from './Auth.controllers';
import { validateSignUpData, validateSignInData, validateInitiateRequestData } from './Auth.validation';

const router = express.Router();

// api/auth/register
router
  .route('/register')
  .post(validateSignUpData,addNewUser)

// /api/users/login
router
  .route('/login')
  .post(validateSignInData, signInUserController)

// /api/users/login
router
  .route('/initiate-reset')
  .post(validateInitiateRequestData, intiatePasswordReset)

export default router