const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


exports.signup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                const error = new Error('A user with the given email is already registered');
                error.statusCode = 409;
                throw error
            }

            return bcrypt.hash(password, 12)
        })
        .then(hashedPassword => {
            const user = new User({
                email: email,
                name: name,
                password: hashedPassword
            })
            return user.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'You have successfully registered your account',
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err)
        })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;

        User.findOne({ email: email })
            .then(userDoc => {
                if (!userDoc) {
                    const error = new Error('A user with the given email is not found');
                    error.statusCode = 404;
                    throw error
                }
                loadedUser = userDoc;
                return bcrypt.compare(password, loadedUser.password)
            })
            .then(isEqual => {
                if (!isEqual) {
                    const error = new Error('The Password for the given email is incorrect.')
                    throw error;
                }

                const token = jwt.sign(
                    {
                        name: loadedUser.name,
                        userId: loadedUser._id.toString()
                    },
                    'thisisspikykey',
                    {
                        expiresIn: '1h'
                    }
                )

                res.status(200).json({
                    message: 'You are LoggedIn Successfully',
                    token: token,
                    userId: loadedUser._id.toString()
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 404;
                }
                next(err)
            })

}   