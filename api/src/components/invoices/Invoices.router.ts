const express = require('express');
import { 
  fetchInvoices,
  createNewInvoice,
  fetchInvoice,
  updateInvoice,
  deleteInvoice,
  createInvoiceAsDraft
} from './Invoices.controllers';
import { validateCreateInvoiceData, validateId } from './Invoices.validation';

const router = express.Router();

// /api/users
router
  .route('/')
  .get(fetchInvoices)
  .post(validateCreateInvoiceData, createNewInvoice)

router
  .route('/draft')
  .post(validateCreateInvoiceData, createInvoiceAsDraft)

// all invoices irrespective of user
  // .route('/invoices')
  // .get(fetchInvoice)
  // .post(createANewWorkspace)

// router: get, edit or delete a single invoice
router
  .route('/:id')
  .get(validateId, fetchInvoice)
  .patch(validateId, updateInvoice)
  .delete(validateId, deleteInvoice)

export default router