const express = require('express')

const router = express.Router()

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    aggregateUsersByAge,
    aggregateUsersByAgeLess70
} = require('../controllers/userController')

router.route('/')
    .get(getUsers)
    .post(createUser)


router.route('/clubByAge')
    .get(aggregateUsersByAge)

router.route('/clubBelowAge70')
    .get(aggregateUsersByAgeLess70)

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)


module.exports = router