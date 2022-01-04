const express = require('express');
import { 
  fetchUserClients, 
  createANewClient,  
  fetchAllClients,
  updateSingleClient,
  removeSingleClient,
} from './Clients.controllers';

const router = express.Router();
// @route   GET api/clients
// @desc    Get authenticated user given the token
// @access  Private

// /api/users
router
  .route('/')
  .get(fetchAllClients)
  .post(createANewClient)

// /api/clients/:id
// @route   POST, GET, FETCH, PATCH, DELETE api/auth
// @desc    Login user and get token
// @access  Public
router
.route('/:id')
  .get(fetchUserClients)
  .patch(updateSingleClient)
  .delete(removeSingleClient)

export default router;