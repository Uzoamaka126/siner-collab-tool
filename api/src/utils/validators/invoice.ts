import { v4 as uuidv4 } from 'uuid';


export function generateInvoiceRefNumber(): string {
    let baseChar = '01234567';
    let generatedNum = '';
    let length = 6;

    for (var i = length; i > 0; --i) generatedNum += baseChar[Math.floor(Math.random() * baseChar.length)];

    var date = Date.now().toString().slice(-6)
    return date
    
}