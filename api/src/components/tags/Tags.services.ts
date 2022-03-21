const Tag = require('./Tags.model');
import { getSingleUser } from '../users/Users.service';
import { 
    ITagsResponsePayload,
    IBaseTag,
    ITagResponsePayload,
    TagQueryData,
    QueryStringsTag
} from './Tags.types';

// Find all users
async function getAllTags(): Promise<ITagsResponsePayload> {
    try {
        const tags = await Tag.find({}).lean()
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
async function getTags(query: QueryStringsTag, id:string): Promise<ITagsResponsePayload> {
     try {
        let buildQuery = {} as TagQueryData;
        let page = Number(query.page) || 1;
        let limit = parseInt(query.limit) || 20;
        let offset = page ? (page - 1) * limit : 0; 
        let userId = id;
        let download = query.download ? query.download : 0
        
        // 
        if (userId) {
            buildQuery.where = { ...buildQuery.where, user_id: userId }
        }

        if (query.name) {
            const regexedName = new RegExp(`^${query.name}$`, 'i');

            buildQuery.where = { ...buildQuery.where, title: regexedName }  // make title a case insensitive match
        }
        
        // TO DO: add a download feature/option
        if (download === 1) {
            limit = 1000
        } else {
            limit = limit
        }

        console.log('buildQuery.where:', buildQuery.where);

         const getUserDetails = await getSingleUser(id);
    
        if (!getUserDetails.isSuccessful) {
            return {
                status: 401,
                isSuccessful: false,
                message: "Unable to fetch user",
                data: null
            }
        }
        const tags = await Tag.find(buildQuery.where).limit(limit).skip(offset).sort({ createdAt: -1 }).lean();
        const totalPages = Math.ceil(tags.length / limit);
        // const pageSize = Math.ceil(projects.length / limit); // TO DO *

        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: {
                info: tags,
                pageDetails: {
                    total: tags.length,
                    currentPage: page,
                    totalPages: totalPages,
                    pageSize: 20
                }
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

async function addNewTag(data: IBaseTag): Promise<ITagResponsePayload> {
    const userId = data.user_id;
    const validateUser = await getSingleUser(userId);
    
    if(!validateUser.isSuccessful) {
        return {
            status: 401,
            isSuccessful: false,
            message: "An error occured while adding this client. Please, try again!",
            data: null
        }
    }
    try {        
        const tag = await Tag
            .create({
                name: data.name,
                user_id: userId,
            })
        
        return {
            status: 201,
            isSuccessful: true,
            message: "Operation successful!",
            data: tag
        }
    } catch(err) {
        console.error(err);
        return {
            status: 400,
            isSuccessful: false,
            message: err.message
        }
    }
}

async function editTag(data: any) {
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

async function deleteTag(id: string) {
  try {
    const deletedTagItem = await Tag.findOneAndRemove({ _id: id })
    
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
    getTags,
    addNewTag,
    editTag,
    deleteTag
}

export default TagControllers;
