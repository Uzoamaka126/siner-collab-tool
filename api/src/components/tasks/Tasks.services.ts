const Task = require('./Tasks.model');
import { getProjectById } from '../projects/Projects.services';
import { 
    ITaskResponsePayload,
    IBaseTask,
} from './Tasks.types';

// Find all users
async function getTasks(): Promise<ITaskResponsePayload> {
    try {
        const tasks = await Task.find({}).lean().exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: tasks
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

// Find a list of tasks belonging to a specific project
async function getTaskByProjectId(id: string): Promise<ITaskResponsePayload> {
    try {
        //  get user
        const getParentProject = await getProjectById(id);
    
        if(!getParentProject.isSuccessful) {
            return {
                status: 401,
                isSuccessful: false,
                message: "An error occured while adding fetching the project for this task. Please, try again!",
                data: null
            }
        }
        //  select clients that match with the passed in user id
        const tasks = await Task
            .find({ project_id:  id })
            .lean() // to get plain javascript objects
            .exec()
        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: tasks
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

async function addNewTask (data: IBaseTask) {
    const projectId = data.project_id;
    const validateProject = await getProjectById(projectId);
    
    if(!validateProject.isSuccessful) {
        return {
            status: 401,
            isSuccessful: false,
            message: "Unable to find project",
            data: {}
        }
    }
    try {        
        const task = await Task
            .create({
                name: data.name,
                project_id: data.project_id,
                isCompleted: false
            })
        
        return {
            status: 201,
            isSuccessful: true,
            message: "Operation successful!",
            data: task
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

async function editTask(id: string, data: any) {
    try {
        const filter = { _id: id, };
        const update = { name: data.name, isCompleted: data.isCompleted };
        // else continue
        const updatedClient = await Task.findOneAndUpdate(filter, update, { new: true } ).exec()
                    
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

async function deleteTask(id: string) {
  try {
    const deletedTaskItem = await Task.findOneAndRemove({ _id: id })
    
    if (!deletedTaskItem) {
      return {
        status: 400,
        isSuccessful: false,
        message: "task not found",
       }
    } else {
    return {
        status: 200,
        isSuccessful: true,
        message: "task successfully deleted!",
        data: deletedTaskItem
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

const TaskControllers = {
    getTasks,
    getTaskByProjectId,
    addNewTask,
    editTask,
    deleteTask
}

export default TaskControllers;
