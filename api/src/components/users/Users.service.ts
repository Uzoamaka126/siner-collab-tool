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
            message: "An error occurred",
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

// Update a single user
export const updateASingleUser = async (data: any, id: string) => {
    try {
        // do a check to see if an id is passed as an argument.
        // If no id, then return false
        if(!id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "User Id is required!",
            }
        }
        // else continue
        const updatedUser = await User
            .findOneAndUpdate(
                { _id: id },
                data,
                { new: true }
            )
            .exec()
            
        // if no user was found on the db, then return false
        if(!updatedUser) {
            return {
                status: 404,
                isSuccessful: false,
                message: "User not found!",
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "Successful update!",
                data: updatedUser
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

export const removeAUser = async (id: string) => {
    if(!id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "user id must be provided!",
            }
        }
  try {
    const removedUser = await User.findOneAndRemove({ _id: id })

    if (!removedUser) {
      return {
        status: 400,
        isSuccessful: false,
        message: "User was not found",
       }
    } else {
        return {
            status: 200,
            isSuccessful: true,
            message: "User successfully removed!",
            data: removedUser
        }
    }
  } catch (err) {
    console.error(err)
    return {
        status: 400,
        isSuccessful: false,
        message: "An error occured during this operation",
        data: err
    }
  }
}

export const userServices = () => ({
//   removeAUser: removeAUser,
  updateASingleUser: updateASingleUser,
  getSingleUser: getSingleUser(),
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