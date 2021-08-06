import { Request, Response, NextFunction,  } from 'express';
const jwt = require("jsonwebtoken");
import { IUserBaseDocument } from '../components/users/User.types';
const mongoose = require('mongoose');
const User = require('../components/users/Users.model');

export function generateVerificationToken(len: number, arr:string) {
  var result = "";
  for (var i = len; i > 0; i--) {
    result += arr[Math.floor(Math.random() * arr.length)];
  }
  return result;
}

export function generateToken(user: IUserBaseDocument) {
  // Use jwt to create a new JWT Payload containing
  const payload = {
    subject: user._id,
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
    console.log(response instanceof mongoose.Document);
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
    console.log(response instanceof mongoose.Document);
    if (response instanceof mongoose.Document === true) {
      // doc may be null if no document is matched
      result = true;
    } else {
      result = false
    }
    return result;
}

