const express = require('express');
import { Router } from 'express';
import { 
  fetchAllProjects,
  fetchProject,
  fetchUserProjects,
  removeProject,
  updateProject,
  createNewProject
} from './Projects.controllers';

const router: Router = express.Router();
// @route   GET api/clients
// @desc    Get authenticated user given the token
// @access  Private

// /api/users
router
  .route('/')
  .get(fetchAllProjects)
  .post(createNewProject)

router
.route('/users')
  .post(fetchUserProjects)

// /api/clients/:id
// @route   POST, GET, FETCH, PATCH, DELETE api/auth
// @desc    Login user and get token
// @access  Public
router
.route('/:id')
  .get(fetchProject)
  .put(updateProject)
  .delete(removeProject)

export default router;