const express = require('express');
import { 
  fetchInvoices,
  createNewInvoice
} from './Invoices.controllers';
import { validateCreateInvoiceData } from './Invoices.validation';

const router = express.Router();

// /api/users
router
  .route('/')
  .get(fetchInvoices)
  .post(validateCreateInvoiceData, createNewInvoice)

// all invoices irrespective of user
// router
//   .route('/invoices')
  // .get(fetchUserInvoices)
  // .post(createANewWorkspace)

// router: get, edit or delete a single invoice
// .route('/:id')
  // .get(fetchSingleWorkspace)
  // .patch(updateASingleWorkspace)
  // .delete(deleteASingleWorkspace)

export default router