const express = require('express');
import { Router } from 'express';
import { 
  createNewTag,
  fetchAllTags,
  fetchUserTags,
  updateTag,
  removeTag
} from './Tags.controllers';

const router: Router = express.Router();
// @route   GET api/tags
// @desc    Get authenticated user given the token
// @access  Private

// /api/users
router
  .route('/')
  .get(fetchAllTags)
  .post(createNewTag)

router
.route('/users/:id')
  .get(fetchUserTags)
// /api/tags/:id
// @route   POST, GET, FETCH, PATCH, DELETE api/auth
// @desc    Login user and get token
// @access  Public
router
.route('/:id')
  .put(updateTag)
  .delete(removeTag)

export default router;