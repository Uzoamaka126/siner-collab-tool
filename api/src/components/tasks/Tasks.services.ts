const Task = require('./Tasks.model');
import Project from '../projects/Projects.services';
import { 
    ITaskResponsePayload,
    IBaseTask,
    QueryStringsTask,
    TaskQueryData
} from './Tasks.types';

// Find all users
async function getAllTasks(): Promise<ITaskResponsePayload> {
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
async function getTasks(query: QueryStringsTask, userId: string): Promise<ITaskResponsePayload> {
    try {
        let buildQuery = {} as TaskQueryData;
        let page = Number(query.page) || 1;
        let limit = parseInt(query.limit) || 20;
        let offset = page ? (page - 1) * limit : 0; 
        let download = query.download ? query.download : 0
        
        // 
        if (userId) {
            buildQuery.where = { ...buildQuery.where, user_id: userId }
        }

        if (query.projectId) {
            buildQuery.where = { ...buildQuery.where, project_id: query.projectId }
        }

        if (query.name) {
            const regexName = new RegExp(`^${query.name}$`, 'i');

            buildQuery.where = { ...buildQuery.where, name: regexName }  // make title a case insensitive match
        }

        if (query.isCompleted) {      
            buildQuery.where = { ...buildQuery.where, isCompleted: query.isCompleted }
        }
        
        // TO DO: add a download feature/option
        if (download === 1) {
            limit = 1000
        } else {
            limit = limit
        }

        console.log('buildQuery.where:', buildQuery.where);

        const tasks = await Task.find(buildQuery.where).limit(limit).skip(offset).sort({ createdAt: -1 }).lean();
        const totalPages = Math.ceil(tasks.length / limit);
        // const pageSize = Math.ceil(projects.length / limit); // TO DO *

        return {
            status: 200,
            isSuccessful: true,
            message: "Operation successful!",
            data: {
                info: tasks,
                pageDetails: {
                    total: tasks.length,
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

async function addNewTask (data: IBaseTask) {
    const projectId = data.project_id;
    const validateProject = await Project.getProjectById(projectId);
    
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
                isCompleted: false,
                priorityLabel: data.priorityLabel,
                deadline: data.deadline
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
        const updatedClient = await Task.findOneAndUpdate(filter, { ...data }, { new: true } ).exec()

        if(!updatedClient) {
             return {
                status: 400,
                isSuccessful: false,
                message: "Invoice not found",
            }
        }
                    
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
    getAllTasks,
    addNewTask,
    editTask,
    deleteTask
}

export default TaskControllers;
