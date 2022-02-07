import { IBaseInvoice } from "../../components/invoices/Invoices.types";

// Create a helper function to check the user input
export const isEmpty = (string: string) => {
  if (string && string.trim() === "") return true;
  return false;
};

export const validateInvoiceData = (data: IBaseInvoice) => {
  // const { client_email, currency, amount, due_date, status, invoice_no, other_emails, items, price, tax, total_amount, memo, user_id, project_id } = data;
  const getObjKeys = Object.keys(data);
  for (var i = 0; i < getObjKeys.length; i++) {
    switch(getObjKeys[i]) {
      case 'client_email':
        return `${getObjKeys[i]} should be a string`
      case 'currency':
        return `${getObjKeys[i]} should be a string`
      case 'memo':
        return `${getObjKeys[i]} should be a string`
      case 'status':
        return `${getObjKeys[i]} should be a string`
      case 'invoice_no':
        return `${getObjKeys[i]} should be a string`
      case 'user_id':
        return `${getObjKeys[i]} should be a string`
      case 'project_id':
        return `${getObjKeys[i]} should be a string`
      case 'amou'

   }
  }
  // get an array of the data object
  // loop through it and say if x || u|| o === string, then something like this: `${i} should be a string
}