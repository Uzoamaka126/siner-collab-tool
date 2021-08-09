const express = require('express');

import { 
  fetchAllUsers, 
  fetchSingleUser, 
  addNewUser, 
  signInUserController,
  updateAUserController, 
  deleteAUser
} from './Users.controllers';

const router = express.Router();

// /api/users
router
  .route('/')
  .get(fetchAllUsers)
  .post(addNewUser)

// /api/users/:id
router
  .route('/:id')
  .patch(updateAUserController)
  .get(fetchSingleUser)
  .delete(deleteAUser)

// /api/users/login
router
  .route('/login')
  .post(signInUserController)


export default router