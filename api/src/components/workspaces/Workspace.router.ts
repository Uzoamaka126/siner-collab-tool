const express = require('express');
import { 
  fetchAllWorkspace, 
  createANewWorkspace, 
  fetchSingleWorkspace,
  updateASingleWorkspace 
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
  .get(fetchSingleWorkspace)
  .patch(updateASingleWorkspace)
  // .delete(deleteAUser)

export default router