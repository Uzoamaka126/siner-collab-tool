const express = require('express');
import { Router } from 'express';
import { validateUserId } from '../../utils/middleware/validateUserId';
import { validateParamsId } from '../../utils/validators/validateParamsId';
import { 
  createNewTag,
  fetchAllTags,
  fetchTags,
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
  .get(validateUserId, fetchTags)
  .post(createNewTag)

// /api/tags/users
router
.route('/all')
  .get(fetchAllTags)

// /api/tags/:id
// @route   PATCH, DELETE api/auth
// @desc    update and delete tag
// @access  Public
router
.route('/:id')
  .put(validateParamsId, updateTag)
  .delete(validateParamsId, removeTag)

export default router;