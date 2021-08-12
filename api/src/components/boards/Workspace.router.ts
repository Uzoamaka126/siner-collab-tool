const express = require('express');
import { 
  fetchAllWorkspace, 
  createANewWorkspace, 
  fetchSingleWorkspace,
  updateASingleWorkspace,
  deleteASingleWorkspace
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
  .delete(deleteASingleWorkspace)

export default router