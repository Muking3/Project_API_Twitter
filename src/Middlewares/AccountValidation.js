import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(3).max(15),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    pseudo: Joi.string().max(8)
});

export const AccountVerify = (req, res, next) => {
    // console.log(req);
    const { error } = schema.validate(req.body, { abortEarly: false });
    // uploadProfil()
    if (error) {
        return res.status(400).send(error.details);
    }
    next();
};


