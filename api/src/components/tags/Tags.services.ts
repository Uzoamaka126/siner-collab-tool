const Tag = require('./Tags.model');
import { validateItem } from '../../utils/validators/validateItem';
import { getSingleUser } from '../users/Users.service';
import { 
    ITagsResponsePayload,
    // ITagResponsePayload,
    IBaseTag,
    ITagDocument
} from './Tags.types';

// Find all users
async function getAllTags(): Promise<ITagsResponsePayload> {
    try {
        const tags = await Tag.find({}).lean().exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: tags
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

// Find a list of tags belonging to a specific user
async function getUserTags(id: string): Promise<ITagsResponsePayload> {
    try {
         if (id.length < 24) {
            return {
                status: 400,
                isSuccessful: true,
                message: "This id does not exist!",
                data: null
            }
         }
        //  get user
        const getCreatorDetails = await getSingleUser(id);
    
        if(getCreatorDetails.status !== 200) {
            return {
                status: 401,
                isSuccessful: false,
                message: "An error occured while adding this client. Please, try again!",
                data: null
            }
        }
        //  select clients that match with the passed in user id
        const tags = await Tag
            .find({ user_id:  id })
            .lean() // to get plain javascript objects
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: tags
        }
    } catch(err) {
        throw new Error(err);
        // return {
        //     status: err.status,
        //     isSuccessful: false,
        //     message: "An error occured",
        // }
    }
}

async function addNewTag(data: IBaseTag) {
    const userId = data.user_id;
    const validateUser = await getSingleUser(userId);
    
    if(!validateUser.isSuccessful) {
        return {
            status: 401,
            isSuccessful: false,
            message: "An error occured while adding this client. Please, try again!",
            data: {}
        }
    }
    try {        
        const client = await Tag
            .create({
                name: data.name,
                user_id: userId,
            })
        
        return {
            status: 201,
            isSuccessful: true,
            message: "Operation successful!",
            data: client
        }
    } catch(err) {
        console.error(err);
        return {
            status: 400,
            isSuccessful: false,
            message: err
        }
    }
}

async function editTagById(data: any) {
    // validate tag id
    validateItem(data._id, 'tag');
    
    try {
        const filter = { _id: data._id, };
        const update = { name: data.name };
        // else continue
        const updatedClient = await Tag.findOneAndUpdate(filter, update, { new: true } ).exec()
                    
        return {
            status: 200,
            isSuccessful: true,
            message: "Successful update!",
            data: updatedClient
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

async function deleteTagById(id: string) {
    // validate tag id
    validateItem(id, 'tag');

  try {
    const deletedTagItem = await Tag.findOneAndRemove({ _id: id })
    
    console.log(deletedTagItem);

    if (!deletedTagItem) {
      return {
        status: 400,
        isSuccessful: false,
        message: "tag not found",
       }
    } else {
    return {
        status: 200,
        isSuccessful: true,
        message: "tag successfully deleted!",
        data: deletedTagItem
    }
    }
  } catch (err) {
    console.error(err);
    // throw new Error(err);
    return {
        status: 400,
        isSuccessful: false,
        message: "An error occured during this operation",
        data: err
    }
  }
}

const TagControllers = {
    getAllTags,
    getUserTags,
    addNewTag,
    editTagById,
    deleteTagById
}

export default TagControllers;
