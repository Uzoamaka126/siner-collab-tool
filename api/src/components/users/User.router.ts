const router = require('express').Router()
import { fetchAllUsers, fetchSingleUser } from './Users.controllers'

// /api/users
router
  .route('/users')
  .get(fetchAllUsers)
//   .post(controllers.createOne)

// /api/users/:id
router
  .route('/:id')
  .get(fetchSingleUser)
//   .put(controllers.updateOne)
//   .delete(controllers.removeOne)

export default router