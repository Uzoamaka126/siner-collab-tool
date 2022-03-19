const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import { IUserBaseDocument, IUserInput } from '../../components/users/User.types';
const mongoose = require('mongoose');
const User = require('../../components/users/Users.model');

function generateVerificationToken(len: number, arr:string) {
  var result = "";
  for (var i = len; i > 0; i--) {
    result += arr[Math.floor(Math.random() * arr.length)];
  }
  return result;
}

export function generateToken(user: IUserBaseDocument) {
  // Use jwt to create a new JWT Payload containing
  // console.log('user:', user);
  
  const payload = {
    subject: user,
    // subject: user._id,
    username: user.username,
    roles: ["email"]
  };
  const options = {
    expiresIn: "365d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

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
    //  console.log(data); 
    });
    if (response instanceof mongoose.Document === true) {
      // doc may be null if no document is matched
      result = true;
    } else {
      result = false
    }
    return result;
}

export const checkForDuplicateUsernameDB = async (username: string) => {
  let result:boolean;
    const response = await User.findOne({ username: username }, function (err:object, data:object) {
      if (err) {
        console.log(err); 
        result = null;
      }
    });
    if (response instanceof mongoose.Document === true) {
      // doc may be null if no document is matched
      result = true;
    } else {
      result = false
    }
    return result;
}

export function hashPassword (data: IUserInput): IUserInput {
    // hash password before storing in the DB
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const hashedJwt = generateVerificationToken(15, "12345abcde");

    return {...data, password: hashedPassword, jwt: hashedJwt}
}

export function checkPassword (currentPassword: string, argPassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(argPassword, currentPassword, (err:any, same:any) => {
      if (err) {
        return reject(err)
      }
      resolve(same)
    })
  })
}



