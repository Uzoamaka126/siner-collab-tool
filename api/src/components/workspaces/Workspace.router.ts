const express = require('express');

import { 

} from './Workspace.controllers';

const router = express.Router();

// /api/users
router
  .route('/')
  // .get(fetchAllUsers)
  // .post(addNewUser)

// /api/users/:id
router
  .route('/:id')
  // .patch(updateAUserController)
  // .get(fetchSingleUser)
  // .delete(deleteAUser)

export default router