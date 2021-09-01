const joi = require('joi');

const AreaSchema = joi.object({
    areaName: joi.string().required(),
    parkingSpace: joi.number().required()
})

module.exports = {
    AreaSchema,
}