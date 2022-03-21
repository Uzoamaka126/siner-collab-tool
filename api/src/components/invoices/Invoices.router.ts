const express = require('express');
import { 
  fetchInvoices,
  createNewInvoice,
  fetchInvoice
} from './Invoices.controllers';
import { validateCreateInvoiceData } from './Invoices.validation';

const router = express.Router();

// /api/users
router
  .route('/')
  .get(fetchInvoices)
  .post(validateCreateInvoiceData, createNewInvoice)

// all invoices irrespective of user
  // .route('/invoices')
  // .get(fetchInvoice)
  // .post(createANewWorkspace)

// router: get, edit or delete a single invoice
router
  .route('/:id')
  .get(fetchInvoice)
  // .patch(updateASingleWorkspace)
  // .delete(deleteASingleWorkspace)

export default router