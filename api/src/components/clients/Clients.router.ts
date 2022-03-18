const express = require('express');
import { Router } from 'express';
import { 
  fetchUserClients, 
  createANewClient,  
  fetchAllClients,
  updateSingleClient,
  removeSingleClient,
  fetchSingleClient
} from './Clients.controllers';
import { validateFetchClientsQuery } from './Clients.validation';

const router: Router = express.Router();
// @route   GET api/clients
// @desc    Get authenticated user given the token
// @access  Private

// /api/users
router
  .route('/')
  .get(fetchAllClients)
  .post(createANewClient)

router
.route('/users')
  .get(validateFetchClientsQuery, fetchUserClients)
// /api/clients/:id
// @route   POST, GET, FETCH, PATCH, DELETE api/auth
// @desc    Login user and get token
// @access  Public
router
.route('/:id')
  .get(fetchSingleClient)
  .put(updateSingleClient)
  .delete(removeSingleClient)

export default router;