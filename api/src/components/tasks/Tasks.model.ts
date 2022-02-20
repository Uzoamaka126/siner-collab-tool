import { ITaskDocument } from './Tasks.types';
import { taskSchema } from './Tasks.schema'
import { model, Model } from 'mongoose'

// schemas are building blocks for models
// to build a model, we pass a name and schema as arguments to the model function
// Create a task model from the task schema

const Task: Model<ITaskDocument> = model("Task", taskSchema)

module.exports = Task;