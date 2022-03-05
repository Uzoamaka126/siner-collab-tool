const Project = require('./Projects.model');
const Tag = require('../tags/Tags.model');
const User = require('../users/Users.model');
import { Types } from "mongoose";

import { getSingleUser } from '../users/Users.service';
import { getSingleClientById } from '../clients/Clients.services';
import { IBaseTag, ITagDocument } from '../tags/Tags.types';
import { 
    IProjectCreatePayload, 
    IBaseProject, 
    IProjectFetchResponse, 
    IProjectCreateResponse,
} from './Projects.types';

// Find all projects
export async function getAllProjects(): Promise<IProjectFetchResponse> {
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
export async function getUserProjects(id: string): Promise<IProjectFetchResponse> {
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
            message: "User not found!",
            data: null
        }
    }

    // check that client exists
    const clientId = data.client_id;
    const verifyClientDetails = await getSingleClientById(clientId);

    if(!verifyClientDetails.isSuccessful) {
        return {
            status: 401,
            isSuccessful: false,
            message: "Client not found!",
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
                status: 'pending',
                deadline: data.deadline,
                tags: data.tags,
                invoices: []
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

export async function getProjectById(id: string): Promise<IProjectFetchResponse> {
    try {
        if (!id || typeof id !== 'string') {
            return {
                status: 401,
                isSuccessful: false,
                message: "string id is required!",
                data: null
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
            data: null
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
        const updatedProject = await Project.findOneAndUpdate(filter, update, options).exec()
                    
        return {
            status: 200,
            isSuccessful: true,
            message: "Successful update!",
            data: updatedProject
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

export async function deleteProjectById(id: string) {
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
        message: err?.message,
    }
  }
}

export async function addProjectTag(id: string, tags: any) {
  try {
    //  find parent project first
    const getParentProject = await getProjectById(id);
    
    if (!getParentProject.isSuccessful) {
        return {
            status: 400,
            isSuccessful: false,
            message: "unable to fetch project",
            data: getParentProject.data
        }
    }

    // define a variable to hold each newly created tag
    const newTags = [];

    for (var i = 0; i < tags.length; i++) {
        //    for every tag in the parameter tags array, create a new tag, add it to the tag database, then push it to the new tags array
        const tag = await Tag.create({ name: tags[i].name, user_id: tags[i].user_id })        
        newTags.push(tag._id)
    }
    
    const updatedProjectWithTags = await Project.findByIdAndUpdate(
        { _id: id },  // filter
        { tags: [ ...getParentProject.data.tags, ...newTags ] }, // update 
        { new: true, select: '_id tasks title user_id client_id status deadline tags invoices' } // select all these fields and return them. 'new' returns the modified document instead of the original
    ).lean().exec();
    console.log('updatedProjectWithTags:', updatedProjectWithTags);
    
    return {
        status: 200,
        isSuccessful: true,
        message: "Successful update!",
        data: updatedProjectWithTags
    }
  } catch (err) {
    console.error(err);
    // throw new Error(err);
    return {
        status: 400,
        isSuccessful: false,
        message: err?.message,
        // data: null
    }
  }
}

export async function deleteProjectTag(data: any) {
    if(!data.tag_id || !data.id) {
        return {
            status: 401,
            isSuccessful: false,
            message: "string id must be provided!",
        }
    }
  try {
    const getParentProject = await Project.findOne({ '_id': data.id }).exec()

    if (!getParentProject || getParentProject === null) {
      return {
        status: 400,
        isSuccessful: false,
        message: "project not found",
       }
    }
    
    await getParentProject.tags.deleteOne({ _id: data.tag_id});
    // await getParentProject.tags.id(data.tag_id).remove();
    // const getSpecificTag = await getParentProject.tags.id(data.tag_id).remove();
    console.log('Project.save:', Project);


    await Project.save(function (err:any) {
        if (err) return console.log(err)
        console.log('Success!');
    });

    console.log('getParentProject:', getParentProject);

    // if (!getSpecificTag || getSpecificTag === null) {
    //   return {
    //     status: 400,
    //     isSuccessful: false,
    //     message: "tag not found",
    //    }
    // } else {
    //     return {
    //         status: 200,
    //         isSuccessful: true,
    //         message: "tag successfully deleted!",
    //         data: getSpecificTag
    //     }
    // }
  } catch (err) {
    console.error(err);
    // throw new Error(err);
    return {
        status: 400,
        isSuccessful: false,
        message: err?.message
    }
  }
}

export async function getProjectTag(data: any) {
    if(!data.tag_id || !data.id) {
        return {
            status: 401,
            isSuccessful: false,
            message: "string id must be provided!",
        }
    }
  try {
    const getParentProject = await Project.findOne({ '_id': data.id }).exec()

    if (!getParentProject || getParentProject === null) {
      return {
        status: 400,
        isSuccessful: false,
        message: "project not found",
       }
    }
    
    const getSpecificTag = await getParentProject.tags.id(data.tag_id).remove();

    console.log('getSpecificTag:', getSpecificTag);

    if (!getSpecificTag || getSpecificTag === null) {
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
            data: getSpecificTag
        }
    }
  } catch (err) {
    console.error(err);
    // throw new Error(err);
    return {
        status: 400,
        isSuccessful: false,
        message: err?.message
    }
  }
}

const ProjectControllers = {
    getAllProjects,
    getUserProjects,
    addNewProject,
    getProjectById,
    editProjectById,
    deleteProjectById,
    deleteProjectTag,
    addProjectTag
}

export default ProjectControllers;
