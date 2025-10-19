const User = require('../models/User')

exports.getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

// https://localhost:3000/getUserById?id=1
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: `Error ${error.message}`
        })
    }
}

exports.createUser = async (req, res) => {
    const { name, email, age } = req.body
    try {
        const user = new User({ name, email, age })
        const createdUser = await user.save()
        res.status(200).json({
            message: 'user created',
            user: createdUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })        
    }
}

exports.updateUser = async (req, res) => {
    const { name, email, age } = req.body
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        user.name = name || user.name 
        user.email = email || user.email
        user.age = age || user.age

        const updatedUser = await user.save()
        res.status(200).json({
            message: "User updated",
            user: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.aggregateUsersByAge = async (req, res) => {
    try {
        
        const result = await User.aggregate([
            {
                $group: {
                    _id: '$age',
                        users: {
                            $push: '$$ROOT'
                        },
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                   $sort: {
                        _id: 1
                    }
                }
        ])

        res.status(200).json({
            result
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.aggregateUsersByAgeLess70 = async (req, res) => {
    try {
        
        const result = await User.aggregate([
            {
                $match: {
                    age: {
                        $lt: 70
                    }
                }
            }
        ])

        res.status(200).json({
            result
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}