import { generateToken, generateVerificationToken } from '../../utils/authValidator';
import { IBaseUser } from './User.types';
const bcrypt = require("bcryptjs");
const User = require('./Users.model');

// Find a single user
export const getSingleUser = () => async (id: string) => {
    try {
        // do a check to see if an id is passed as an argument.
        // If no id, then return false
        if(!id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "User Id required!",
            }
        }
        // else continue
        const user = await User
            .findOne({ _id: id })
            .lean()
            .exec()

        console.log("userData:", user);
        console.log("type of user:", typeof user);
            
        // if no user was found on the db, then return false
        if(!user) {
            return {
                status: 404,
                isSuccessful: false,
                message: "User not found!",
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "Operation successful!",
                data: user
            }
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occured",
        }
    }
}

// Find all users
export async function getAllUsers() {
    try {
        const users = await User
            .find()
            .lean()
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: users
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occured",
        }
    }
}

// Create a new user
// Find all users
const createNewUser = () => async (data: IBaseUser) => {
    try {
         // hash password before storing in the DB
        const hash = bcrypt.hashSync(data.password, 10);
        data.password = hash;
        data.jwt = generateVerificationToken(15, "12345abcde");
        const newUser = await User.create({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            jwt: data.jwt,
            username: data.username,
            bio: data.bio || null,
            workspaces: null,
            activities: null,
            cards: null,
            createdAt: new Date()
        });
        const token = generateToken(newUser);
        if (!token) {
            return {
                status: 200,
                isSuccessful: false,
                message: "Operation failed. Please, try again!",
            };
        } else {
            const result = {
                status: 200,
                isSuccessful: true,
                message: "Operation successful!",
                data: newUser,
                token: token
            }
            return result;
        }
    } catch(err) {
        console.error(err);
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occured",
            data: err
        }
    }
}



export const userServices = () => ({
//   removeOne: removeOne(model),
//   updateOne: updateOne(model),
  getSingleUser: getSingleUser(),
  createNewUser: createNewUser()
})


/* 
{
    "fullName": "Uzoamaka Test",
    "email": "test@gmail.com",
    "password": "test",
    "username": "Test username",
    "bio": "Test bip",
    "workspaces": null,
    "activities": null,
    "cards": null,
    "createdAt": "2017-05-15T15:12:59.152Z"
}
*/