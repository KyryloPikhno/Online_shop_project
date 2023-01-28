const {Device} = require("../models");


module.exports = {
    find: async (query) => {
        const {limit = 10, page = 1, name, price_lte, category, price_gte, color, brand} = query;

        let findObj = {};

        if (name) {
            findObj = {
                ...findObj,
                name: new RegExp(name),
            }
        }

        if (price_lte) {
            findObj = {
                ...findObj,
                price: {$lte: +price_lte},
            }
        }

        if (price_gte) {
            findObj = {
                ...findObj,
                price: {$gte: +price_gte},
            };
        }

        if (category) {
            findObj = {
                ...findObj,
                category: category.split(','),
            }
        }

        if (brand) {
            findObj = {
                ...findObj,
                brand: brand.split(','),
            }
        }

        if (color) {
            findObj = {
                ...findObj,
                color,
            }
        }

        const [devices, count] = await Promise.all([
            Device.find(findObj).limit(limit).skip((+page - 1) * limit).populate('category'),
            Device.count(findObj)
        ]);

        return {
            page: +page,
            limit,
            count,
            devices,
        };
    }
};