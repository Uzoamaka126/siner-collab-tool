const express = require('express');
import { 
  addNewUser, 
  signInUserController,
  intiatePasswordReset,
  completePasswordReset
} from './Auth.controllers';
import { 
  validateSignUpData, 
  validateSignInData, 
  initiatePasswordResetSchema, 
  completePasswordRequestSchema 
} from './Auth.validation';

const router = express.Router();

// api/auth/register
router
  .route('/register')
  .post(validateSignUpData,addNewUser)

// /api/auth/login
router
  .route('/login')
  .post(validateSignInData, signInUserController)

// /api/auth/initiate-reset
router
  .route('/initiate-reset')
  .post(initiatePasswordResetSchema, intiatePasswordReset)

// /api/auth/reset
router
  .route('/reset')
  .post(completePasswordRequestSchema, completePasswordReset)

export default router