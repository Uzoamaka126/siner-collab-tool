const express = require('express');

import { fetchAllUsers, fetchSingleUser, addNewUser } from './Users.controllers';

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
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne)

export default router