const express = require('express');
import { Router } from 'express';
import { validateBodyIdAsString, validateParamsIdAsString } from '../../utils/validators/validateItem';
import { 
  createNewTag,
  fetchAllTags,
  fetchUserTags,
  updateTag,
  removeTag
} from './Tags.controllers';

const router: Router = express.Router();
// @route   GET and POST api/tags
// @desc    Get all tags. Create a new tag
// @access  Private

// /api/tags
router
  .route('/')
  .get(fetchAllTags)
  .post(createNewTag)

// /api/tags/users
router
.route('/users')
  .post(validateBodyIdAsString, fetchUserTags)

// /api/tags/:id
// @route   PATCH, DELETE api/auth
// @desc    update and delete tag
// @access  Public
router
.route('/:id')
  .put(validateParamsIdAsString, updateTag)
  .delete(validateParamsIdAsString, removeTag)

export default router;