const express = require('express');
import { Router } from 'express';
import { validateRequestArray, validateBodyIdAsString } from '../../utils/validators/validateItem';
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
import { validateFetchProjectsQuery } from './Projects.validation';

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
  .get(validateFetchProjectsQuery, fetchUserProjects)

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
  .post(validateBodyIdAsString, validateRequestArray, addProjectTags)

export default router;