import { v4 as uuidv4 } from 'uuid';


export function generateInvoiceRefNumber(): string {
    // var baseChar = '01234567';
    // var generatedNum = '';
    // var length = 6;

    // for (var i = 6; i > 0; --i) generatedNum += baseChar[Math.floor(Math.random() * baseChar.length)];

    // var randomNum = Date.now();

    return uuidv4()
    
}