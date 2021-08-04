const express = require('express');
import { Request, Response } from 'express';

import { fetchAllUsers, fetchSingleUser } from './Users.controllers';

const router = express.Router();

// /api/users
router
  .route('/')
  .get(fetchAllUsers)
//   .post(controllers.createOne)

// /api/users/:id
router
  .route('/:id')
  .get(fetchSingleUser)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne)

export default router