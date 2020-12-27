const Joi = require('joi');

const signUpValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    const result = schema.validate(data)
    return result;   
}

const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data);
}

const raceValidator = (data) => {
    const schema = Joi.object({
        raceNumber: Joi.number().required()
    });
    return schema.validate(data);
}

module.exports = {
    signUpValidator, 
    loginValidator, 
    raceValidator
};