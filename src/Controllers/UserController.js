import { v4 as uuidv4 } from 'uuid';
import crypt from "bcryptjs"
import { Users } from '../Models/model.js';
import jwt from "jsonwebtoken"

export const getAlluser = (req, res) => {
    return res.status(200).json(Users)
}

// export const getuser = (req, res) => {
//     console.log(req.params.id);
//     const newusers = users.filter((user) => req.params.id == user.id)
//     res.status(200).json(newusers)
// }

export const postuser = (req, res) => {
    const user = req.body;
    console.log(user);
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    const salt = crypt.genSaltSync(10);
    const hash = crypt.hashSync(req.body.password, salt);
    console.log(hash);
    const _id = uuidv4()
    // console.log(Math.floor(Date.now() / 1000));
    // console.log(Date.now());
    const newUser = {
        userId: _id,
        token: (
            {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                user: _id
            },
            `${process.env.JWT_KEY}`
        ),
        password: hash
    }
    Users.push(newUser)
    console.log(Users);
    // return res.send("yes user")
}

// export const patchuser = (req, res) => {
//     const newusers = users.find((user) => req.body.id == user.id)
//     const user = users.find(user => req.body.userId == user.userId && req.body.id == user.id)
//     console.log(user);
//     const index = users.indexOf(user)
//     if (!user) {
//         newusers.like += 1
//         users.push({ userId: req.body.userId })
//         return res.send("yes patch +1")
//     }
//     newusers.like -= 1
//     users.splice(index, 1)
//     return res.send("yes patch -1")
// }

// export const deleteuser = (req, res) => {
//     const newusers = users.find((user) => req.body.id == user.id)
//     const index = users.indexOf(newusers)
//     users.splice(index, 1)
//     return res.send("yes delete")
// }
