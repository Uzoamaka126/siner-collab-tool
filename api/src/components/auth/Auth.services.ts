import { checkPassword, generateToken, hashPassword } from '../../utils/authValidator';
import { IUserInput, IBaseUserLogin } from '../users/User.types';
const User = require('../users/Users.model');

// Create a new user
export async function createNewUser (data: IUserInput) {
    try {
        const updatedUserData = hashPassword(data)
        const newUser = await User.create({
            fullName: updatedUserData.fullName,
            email: updatedUserData.email,
            password: updatedUserData.password,
            jwt: updatedUserData.jwt,
            is_verified: true,
            username: updatedUserData.username,
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
        const passwordMatchResponse = await checkPassword(user.password, password);
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


// export const authServices = () => ({
//   createNewUser: createNewUser()
// })