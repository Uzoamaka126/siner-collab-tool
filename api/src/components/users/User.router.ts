const express = require('express');

import { 
  fetchAllUsers, 
  fetchSingleUser, 
  addNewUser, 
  signInUserController,
  updateAUserController 
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
  .get(fetchSingleUser)
  .put(updateAUserController)
//   .delete(controllers.removeOne)

// /api/users/login
router
  .route('/login')
  .post(signInUserController)


export default router