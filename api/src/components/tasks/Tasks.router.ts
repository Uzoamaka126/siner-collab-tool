const express = require('express');
import { Router } from 'express';
import { 
  createNewTask,
  fetchTasks,
  fetchTaskByProjectId,
  updateTask,
  removeTask,
} from './Tasks.controllers';

const router: Router = express.Router();
// @route   GET api/tags
// @desc    Get authenticated user given the token
// @access  Private

// /api/tasks
router
  .route('/')
  .get(fetchTasks)
  .post(createNewTask)

// /api/tasks/projects
router
.route('/projects')
  .post(fetchTaskByProjectId)

// /api/tasks/:id
router
.route('/:id')
  .put(updateTask)
  .delete(removeTask)

export default router;