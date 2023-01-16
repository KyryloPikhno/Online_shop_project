const {ApiError} = require("../errors");
const {User} = require("../models");


module.exports = {
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({ [dbField]: fieldToSearch });

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.user = user;

            next()
        } catch (e) {
            next(e);
        }
    },

    checkForUniqueness: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({ [dbField]: fieldToSearch });

            if (user) {
                throw new ApiError('User already exists..', 400);
            }

            next()
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                throw new ApiError('Email not present', 400);
            }

            const user = await User.findOne({ email });

            if (user) {
                res.status(409).json('User with this email already exists')
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    // isNewUserValid: async (req, res, next) => {
    //     try {
    //         let validate = userValidator.newUserValidator.validate(req.body);
    //
    //         if (validate.error) {
    //             throw new ApiError(validate.error.message, 400);
    //         }
    //
    //         req.body = validate.value;
    //
    //         next()
    //     } catch (e) {
    //         next(e);
    //     }
    // },
}