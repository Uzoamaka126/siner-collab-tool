const express = require('express');

import { 
  fetchAllUsers, 
  fetchSingleUser, 
  updateAUserController, 
  deleteAUser
} from './Users.controllers';

const router = express.Router();

// /api/users
router
  .route('/')
  .get(fetchAllUsers)

// /api/users/:id
router
  .route('/:id')
  .patch(updateAUserController)
  .get(fetchSingleUser)
  .delete(deleteAUser)

export default router