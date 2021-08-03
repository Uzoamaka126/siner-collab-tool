const router = require('express').Router()
// import controllers from './item.controllers'

// /api/users
router
  .route('/users')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/users/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router