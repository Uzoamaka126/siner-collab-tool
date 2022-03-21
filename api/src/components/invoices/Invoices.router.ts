const express = require('express');
import { 
  fetchInvoices,
  createNewInvoice,
  fetchInvoice,
  updateInvoice
} from './Invoices.controllers';
import { validateCreateInvoiceData, validateId } from './Invoices.validation';

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
  .get(validateId, fetchInvoice)
  .patch(validateId, updateInvoice)
  // .delete(deleteASingleWorkspace)

export default router