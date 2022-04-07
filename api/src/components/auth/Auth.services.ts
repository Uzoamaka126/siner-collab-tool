const crypto = require('crypto');
const bcrypt = require('bcryptjs');
import { checkPassword, generateToken, hashPassword } from '../../utils/validators/authDb';
import { IUserInput, IBaseUserLogin, IUserBaseDocument } from '../users/User.types';
const User = require('../users/Users.model');
const Config = require('../../config/dev')
const Token = require('./Token.model');
const sendEmail = require('../../utils/email');
const clientURL = Config.client_url;

// Create a new user
export async function createNewUser (data: IUserInput) {
    try {
        // check if user already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            // throw new Error("Email already exist");
            return {
                status: 400,
                isSuccessful: false,
                message: "This email already exists!",
            };
        }

        const updatedhashedPasswordAndJwt = hashPassword(data.password)
        const newUser = await User.create({
            fullName: data.fullName,
            email: data.email,
            password: updatedhashedPasswordAndJwt.password,
            jwt: updatedhashedPasswordAndJwt.jwt,
            is_verified: true,
            username: data.username,
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
        const user: IUserBaseDocument = await User.findOne({ email: email }).exec();
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
            data: {
                token,
                id: user._id
            }
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

export async function requestPasswordReset(email: string) {
    try {
        // check to see that user exists
        const user: IUserBaseDocument = await User.findOne({ email: email }).exec();
        // If no user is found, send an error message
        if (!user) {
            return {
                status: 404,
                isSuccessful: false,
                message: "Email does not exist!",
                data: {}
            }
        } else {
            // we check if the user exists. If the user exists, then we check if there is an existing token that has been created for this user. 
            // If one exists, we delete the token.
            let token = await Token.findOne({ userId: user._id });            
            if (token) await token.deleteOne();

            let resetToken = crypto.randomBytes(32).toString("hex");
            const hash = await bcrypt.hash(resetToken, Number(Config.bcrypt_salt));

            await new Token({
                user_id: user._id,
                token: hash,
                createdAt: Date.now(),
            }).save();

            const link = `${clientURL}/passwordReset?token=${resetToken}&email=${user.email}`;
            const data = {
                email: user.email,
                subject:  "Password Reset Request",
                payload: { name: user.username, link: link },
                template: "../../utils/emailTemplates/RequestResetPassword.handlebars"
            }
            await sendEmail(data);
            return  {
                status: 201,
                isSuccessful: true,
                message: "Password reset request initiated!",
                link: link
            };
        }   
    } catch (error) {
        console.error(error)
        return {
            status: 404,
            isSuccessful: false,
            message: "An error occured",
            data: {}
        }
    }  
}

export const resetPassword = async (data :IUserBaseDocument) => {
    const { password, email, token } = data;

    const user: IUserBaseDocument = await User.findOne({ email }).lean();
        // If no user is found, send an error message
    if (!user) {
        return {
            status: 404,
            isSuccessful: false,
            message: "Error occurred during operation!",
            data: {}
        }
    }

    console.log('user:', user);
    
    const existingToken = await Token.findOne({ user_id: user._id });

    if (!existingToken) {
        throw new Error("Invalid or expired reset token");
    }
    const isTokenValid = await bcrypt.compare(token, existingToken.token);

    if (!isTokenValid) {
        throw new Error("Invalid or expired reset token");
    }

    const hash = await bcrypt.hash(password, Number(Config.bcrypt_salt));

    await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { password: hash } },
        { new: true }
    );
    const responsePayload = {
        email: user.email,
        subject: "Password Reset Successful!",
        payload: { name: user.username },
        template: "../../utils/emailTemplates/CompleteResetPassword.handlebars"
    }
    sendEmail(responsePayload);
    await existingToken.deleteOne();
    return {
        status: 200,
        isSuccessful: true,
        message: "Password reset successful!",
        data: {}
    }
};