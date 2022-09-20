const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const authMiddleWare = require('../middleware/auth')

router.route('/create')
    .post(authMiddleWare, taskController.create)

router.route('/status')
    .put(authMiddleWare,taskController.update)

router.route('/tasks')
    .post(authMiddleWare,taskController.getTasks)

router.route('/delete')
    .put(authMiddleWare,taskController.remove)
      
module.exports = router