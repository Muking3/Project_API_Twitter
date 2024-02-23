import crypt from "bcryptjs";
import { authenticateUser } from '../Middlewares/AuthUser.js';
import { PrismaClient } from '@prisma/client';
import { User } from "../Models/Usermodels.js";

const prisma = new PrismaClient();
// export const getAllUser = async (req, res) => {
//     const users = await prisma.user.findMany({
//         include: { posts: true }
//     });
//     users.map(user => {
//         delete user.email
//         delete user.password
//     })
//     return res.status(200).json(users);
// }

export const getAllUser = async (req, res) => {
    try {
        const users = await User.getAllUser()
        users.map(user => {
            delete user.email
            delete user.password
        })
        return res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
    }
}

// export const getOneUser = async (req, res) => {
//     const user = await prisma.user.findUnique({
//         where: {
//             id: req.params.id
//         }
//     });
//     res.status(200).json(user);
// }

export const getOneUser = async (req, res) => {
    try {
        const user = await User.getOneUser(req.params.id)
        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
    }
}

// export const postUser = async (req, res) => {
//     const exist = await prisma.user.findUnique({
//         where: {
//             email: req.body.email
//         }
//     });
//     if (exist) {
//         return res.send(false)
//     }
//     const hash = await crypt.hash(req.body.password, 10)
//     await prisma.user.create({
//         data: {
//             name: req.body.name,
//             email: req.body.email,
//             password: hash,
//             pseudo: req.body.pseudo,
//             url: `http://localhost:${process.env.PORT}/${req.file.filename}`,
//         },
//     });
//     res.send(true);
// }

export const postUser = async (req, res) => {
    try {
        const exist = await User.userExist(req.body.email)
        if (exist) {
            return res.send(false)
        }
        const hash = await crypt.hash(req.body.password, 10)
        const pseudo = `${req.body.name}${Math.floor(Math.random() * 99)}`
        await User.postUser(req.body.name, req.body.email, hash, req.file.filename, pseudo)
        res.send(true);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des données." });
    }

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
};

