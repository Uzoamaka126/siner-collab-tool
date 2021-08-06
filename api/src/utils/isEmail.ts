const User = require('../components/users/Users.model');
const mongoose = require('mongoose')
export const isEmail = (email: string) => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.trim() === "") return true;
  if (email.match(emailRegEx)) return true;
  return false;
};

export const checkForDuplicateEmailsDB = async (email: string) => {
  let result:boolean;
    const response = await User.findOne({ email: email }, function (err:object, data:object) {
      if (err) {
        console.log(err); 
        result = null;
      }
     console.log(data); 
    });
    console.log(response instanceof mongoose.Document);
    if (response instanceof mongoose.Document === true) {
      // doc may be null if no document is matched
      result = true;
    } else {
      result = false
    }
    return result;
}
