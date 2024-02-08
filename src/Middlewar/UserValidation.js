import Joi from "joi"

const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(30).required()
});

export const validate = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details);
    }
    next();
};
