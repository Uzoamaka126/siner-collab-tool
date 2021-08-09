import { generateToken, generateVerificationToken } from '../../utils/authValidator';
import { IBaseUser, IBaseUserLogin } from '../users/User.types';
const bcrypt = require("bcryptjs");
const User = require('../users/Users.model');

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
            is_verified: true,
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

// find and then login a user
export async function loginAUser({ email, password }:IBaseUserLogin) {
    try {
        const user = await User.findOne({ email: email }).exec();
        // If no user is found, send an error message
        if (!user) {
            return {
                status: 401,
                isSuccessful: false,
                message: "Invalid username or password",
                data: {}
            }
        }
        // check for password match
        const passwordMatchResponse = await user.checkPassword(password);
        if(!passwordMatchResponse) {
            return {
                status: 401,
                isSuccessful: false,
                message: "Invalid username or password!",
                data: {}
            }
        }
        const token = generateToken(user);
        return {
            status: 201,
            isSuccessful: true,
            message: "Successfully logged in!",
            data: token
        }
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occured",
            data: {}
        }
    }
}


export const authServices = () => ({
  createNewUser: createNewUser()
})