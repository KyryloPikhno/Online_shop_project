const {ApiError} = require("../errors");
const {User} = require("../models");


module.exports = {
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({ [dbField]: fieldToSearch });

            if (!user) {
                throw new ApiError('Inna not found', 404);
            }

            req.user = user;

            next()
        } catch (e) {
            next(e);
        }
    },
}