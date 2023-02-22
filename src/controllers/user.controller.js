import db from "../models"
const User = db.user;
import bcrypt from "bcryptjs"

const userController = {};

userController.create = async (req, res) => {
    // Create a user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                message: err,
                success: false
            });
            return;
        } else {
            return res.status(201).json({
                success: true,
                message: 'New user created successfully',
                newUser: user,
            });
        }
    });
};

userController.findAll = async (req, res) => {
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip)
    User.find().sort({
        createdAt: -1
    }).limit(limit).skip(skip)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });


};

userController.findOne = async (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found User with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving user with id=" + id
                });
        });
};

userController.changePassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password)
        User.findByIdAndUpdate(id, req.body)
            .then(data => {
                data.save().then(() => res.send(data))
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating user with id=" + id
                });
            });
    }
}


userController.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password)
    }

    User.findByIdAndUpdate(id, req.body)
        .then((data) => {
            data.save().then(() => res.send(data))
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

userController.deleteOne = async (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            } else {
                res.send({
                    message: "user was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};

userController.deleteAll = async (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users."
            });
        });
};

export default userController