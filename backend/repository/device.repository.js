const {Device} = require("../models");


module.exports = {
    find: async (query) => {
        const {
            limit = 12,
            page = 1,
            color,
            brand,
            name,
            price_gte = 0,
            price_lte = 9999,
            category,
        } = query;

        let findObj = {};

        if (name) {
            findObj = {
                ...findObj,
                name: { $regex: name },
            }
        }

        if (price_gte || price_lte) {
            findObj = {
                ...findObj,
                price: {$gte: +price_gte, $lte: +price_lte},
            };
        }

        if (category) {
            findObj = {
                ...findObj,
                category: category.split(',')
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
                color: color.split(','),
            }
        }

        const [devices, count] = await Promise.all([
            Device.find(findObj).limit(limit).skip((+page - 1) * limit)
                .populate('category')
                .populate('brand')
                .populate('color'),
            Device.count(findObj)
        ]);

        return {
            page: +page,
            limit,
            count,
            total_pages: Math.ceil(count / limit),
            devices,
        };
    }
};


