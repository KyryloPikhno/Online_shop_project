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
}