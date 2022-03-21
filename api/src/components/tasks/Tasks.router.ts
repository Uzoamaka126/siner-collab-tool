const express = require('express');
import { Router } from 'express';
import { validateParamsId } from '../../utils/validators/validateParamsId';
import { validateUserId } from '../../utils/middleware/validateUserId';
import { 
  createNewTask,
  fetchTasks,
  updateTask,
  removeTask,
  fetchAllTasks
} from './Tasks.controllers';

const router: Router = express.Router();
// @route   GET api/tags
// @desc    Get authenticated user given the token
// @access  Private

// /api/tasks
router
  .route('/')
  .get(validateUserId, fetchTasks)
  .post(createNewTask)

// /api/tasks/projects
router
.route('/all')
  .post(fetchAllTasks)

// /api/tasks/:id
router
.route('/:id')
  .put(validateParamsId, updateTask)
  .delete(validateParamsId, removeTask)

export default router;