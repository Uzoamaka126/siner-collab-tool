import { IBaseUser } from './User.types';
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
export const getAllUsers = () => async () => {
    try {
        // else continue
        const users = await User
            .find()
            .lean()
            .exec()
        
        console.log("userData:", users);
        console.log("type of user:", typeof users);

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
export const createNewUser = () => async (data: IBaseUser) => {
    try {
        const newUser = await User.create({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            username: data.username,
            bio: data.bio || null,
            workspaces: null,
            activities: null,
            cards: null,
            createdAt: new Date()
        })
        .lean()
        .exec()
        
        console.log("userData:", newUser);
        console.log("type of user:", typeof newUser);

        // return {
        //     status: 200,
        //     isSuccessful: true,
        //     message: "Operation successful!",
        //     data: newUser
        // }
    
    } catch(err) {
        console.error(err)
        return {
            status: 400,
            isSuccessful: false,
            message: "An error occured",
        }
    }
}



export const userServices = () => ({
//   removeOne: removeOne(model),
//   updateOne: updateOne(model),
  getAllUsers: getAllUsers(),
  getSingleUser: getSingleUser(),
  createNewUser: createNewUser()
})