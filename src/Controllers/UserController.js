import crypt from "bcryptjs";
import { Users } from '../Models/model.js';
import { authenticateUser } from '../Middlewares/AuthUser.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getAllUser = (req, res) => {
    return res.status(200).json(Users);
}

export const getUser = (req, res) => {
    const user = Users.filter((user) => req.params.id == user.userId);
    res.status(200).json(user);
}

export const postUser = async (req, res) => {
    const exist = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    console.log(exist);
    if (exist)
        return res.send("L'email existe deja, connectez-vous")
    const hash = await crypt.hash(req.body.password, 10)
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: hash
        },
    })
    res.send("User created")
}

export const postAuth = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = await authenticateUser(email, password);
    if (!token)
        return res.json({ success: false, msg: 'Wrong email or password' });
    return res.json({ success: true, token });
}

export const getProfile = (req, res) => {
    res.json({ id: req.user });
}

