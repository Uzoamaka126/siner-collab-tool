const express = require('express');
import { 
  fetchAllWorkspace, 
  createANewWorkspace, 
  fetchSingleWorkspace 
} from './Workspace.controllers';

const router = express.Router();

// /api/users
router
  .route('/')
  .get(fetchAllWorkspace)
  .post(createANewWorkspace)

// /api/users/:id
router
  .route('/:id')
  // .patch(updateAUserController)
  .get(fetchSingleWorkspace)
  // .delete(deleteAUser)

export default router