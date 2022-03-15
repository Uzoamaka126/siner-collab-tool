import { Toast } from '../assets/js/bootstrap.min.js';

/**
 * @param  {string} title
 * @param  {string} message
 * @param  {string} type
 * @returns {object}
 */

export function myToast (title, message, type) {
    var myToastEl = document.getElementById('sharedToastEl');
    var title = document.getElementById('toastTitle');
    var messgeColor = document.querySelector('.message-toast');
    var message = document.getElementById('toastMessage');

    title.innerHTML = 'An error occurred'
    message.innerHTML = 'Unable to duplicate invoice';
    messgeColor.classList.add(`${type}`)
    
    var toast = new Toast(myToastEl)
    return toast
}