const express = require('express');
import { validateParamsId } from '../../utils/validators/validateParamsId';
import { 
  fetchInvoices,
  createNewInvoice,
  fetchInvoice,
  updateInvoice,
  deleteInvoice,
  createInvoiceAsDraft
} from './Invoices.controllers';
import { validateCreateInvoiceData } from './Invoices.validation';

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
  .get(validateParamsId, fetchInvoice)
  .patch(validateParamsId, updateInvoice)
  .delete(validateParamsId, deleteInvoice)

export default router