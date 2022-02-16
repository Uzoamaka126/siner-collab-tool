const Project = require('./Projects.model');
import { getSingleUser } from '../users/Users.service';
const User = require('../users/Users.model');
import { 
    IProjectCreatePayload, 
    IBaseProject, 
    IProjectFetchAllResponse, 
    IProjectCreateResponse
} from './Projects.types';

// Find all projects
export async function getAllProjects(): Promise<IProjectFetchAllResponse> {
    try {
        const projects = await Project.find({}).lean().exec();
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: projects
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

// Find a list of projects belonging to a specific user
export async function getUserProjects(id: string): Promise<IProjectFetchAllResponse> {
     try {
         if(id.length < 24) {
            return {
                status: 400,
                isSuccessful: true,
                message: "This id does not exist!",
                data: null
            }
         }
        //  get user
        const user = await User.findOne({ _id: id }).lean().exec()

        if (!user) {
            return {
                status: 404,
                isSuccessful: false,
                message: "This user does not exist!",
            }
        }
        //  select projects that match with the passed in user id
        const clients = await Project
            .find({ user_id:  id })
            .lean() // to get plain javascript objects
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: clients
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

export async function addNewProject(data: IProjectCreatePayload): Promise<IProjectCreateResponse> {
    const userId = data.user_id;
    const verifyUserDetails = await getSingleUser(userId);
    
    if(!verifyUserDetails.isSuccessful) {
        return {
            status: 401,
            isSuccessful: false,
            message: "An error occured while adding this client. Please, try again!",
            data: null
        }
    }
    try {        
        const project = await Project
            .create({
                title: data.title,
                user_id: data.user_id,
                tasks: [],
                client_id: data.client_id,
                status: data.status,
                deadline: data.deadline,
                tags: data.tags,
            })
        
        return {
            status: 201,
            isSuccessful: true,
            message: "Operation successful!",
            data: project
        }
    } catch(err) {
        console.error(err);
        return {
            status: 400,
            isSuccessful: false,
            message: "Service error!",
        }
    }
}

export async function getProjectById(id: string) {
    try {
        if (!id || typeof id !== 'string') {
            return {
                status: 401,
                isSuccessful: false,
                message: "string id is required!",
            }
        }
        const project = await Project.findOne({ _id: id }).lean().exec();

        // if no project was found on the db, then return false
        if(!project) {
            return {
                status: 404,
                isSuccessful: false,
                message: "Client not found!",
                data: null
            }
        } else {
            return {
                status: 200,
                isSuccessful: true,
                message: "Operation successful!",
                data: project
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

export async function editProjectById(id: string, data: IBaseProject) {
    try {
        // do a check to see if an id is passed as an argument.
        // If no id, then return false
        if(!id) {
            return {
                status: 401,
                isSuccessful: false,
                message: "string id is required!",
            }
        }

        const filter = { _id: id, };
        const update = { ...data };
        const options = { lean: true, new: true }
        const updatedClient = await Project.findOneAndUpdate(filter, update, options).exec()
                    
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

export async function deleteProjectById(id:string) {
    if(!id) {
        return {
            status: 401,
            isSuccessful: false,
            message: "string id must be provided!",
        }
    }
  try {
    const deletedProject = await Project.findOneAndRemove({ _id: id })

    if (!deletedProject || deletedProject === null) {
      return {
        status: 400,
        isSuccessful: false,
        message: "project not found",
       }
    } else {
    return {
        status: 200,
        isSuccessful: true,
        message: "project successfully deleted!",
        data: deletedProject
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