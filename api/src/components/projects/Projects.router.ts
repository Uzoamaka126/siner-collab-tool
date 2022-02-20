const express = require('express');
import { Router } from 'express';
import { 
  fetchAllProjects,
  fetchProject,
  fetchUserProjects,
  removeProject,
  updateProject,
  createNewProject,
  removeProjectTag,
  addProjectTags
} from './Projects.controllers';

const router: Router = express.Router();
// @route   GET api/clients
// @desc    Get authenticated user given the token
// @access  Private

// /api/projects
router
  .route('/')
  .get(fetchAllProjects)
  .post(createNewProject)

router
.route('/users')
  .post(fetchUserProjects)

// /api/projects/:id
// @route   POST, GET, FETCH, PATCH, DELETE api/auth
// @desc    Login user and get token
// @access  Public
router
.route('/:id')
  .get(fetchProject)
  .put(updateProject)
  .delete(removeProject)

router
.route('/tags')
  .post(addProjectTags)

export default router;