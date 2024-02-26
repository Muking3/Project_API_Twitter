import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(3).max(15),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
});

export const AccountVerify = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details);
    }
    next();
};


