import { Schema, ObjectId, Types } from "mongoose";

// This is how you tell mongoose what your documents look like
// Create a client schema

export const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 100
  },
  /* 
  "is_verified": true,
        "_id": "61edbd9ca3d644df266ba764",
        "fullName": "Uzoamaka Peters",
        "email": "uzoamaka@gmail.com",
        "password": "$2a$10$psJVoc9309zJZvxNPr2JhuT13KW9Ec1bslLnOMUa8CXd0iHulocJS",
        "username": "Uzor",
        "createdAt": "2022-01-23T20:42:04.631Z",
        "updatedAt": "2022-01-23T20:42:04.631Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjFlZGJkOWNhM2Q2NDRkZjI2NmJhNzY0IiwidXNlcm5hbWUiOiJVem9yIiwicm9sZXMiOlsiZW1haWwiXSwiaWF0IjoxNjQyOTcwNTI0LCJleHAiOjE2NzQ1MDY1MjR9.eIspdRkOm92f5onhVpBVnlD1m62XxYnVkqzBVBI3YdQ"
  
  
  
  */
  user_id: {
    type: Types.ObjectId, 
    required: true,
    trim: true,
    minLength: 2,
    maxlength: 1000,
    ref: "User"
  }
},{ timestamps: true },
);
