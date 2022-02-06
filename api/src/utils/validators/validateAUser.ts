const User = require('../../components/users/Users.model');

export async function validateAUser (id:string): Promise<boolean> {
    const user = await User.findOne({ _id: id }).lean().exec()

        if (!user) {
            return false
        } else {
            return true
        }
}