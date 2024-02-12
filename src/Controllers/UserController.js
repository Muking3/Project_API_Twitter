import { v4 as uuidv4 } from 'uuid';
import crypt from "bcryptjs";
import { Users } from '../Models/model.js';
import { authenticateUser } from '../Middlewar/UserValidation.js';

export const getAllUser = (req, res) => {
    return res.status(200).json(Users);
}

export const getUser = (req, res) => {
    const user = Users.filter((user) => req.params.id == user.userId);
    res.status(200).json(user);
}

export const postUser = (req, res) => {
    const user = req.body;
    const _id = uuidv4();
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    crypt.hash(req.body.password, 10).then(Hash => {
        const newUser = {
            _id: _id,
            email: req.body.email,
            password: Hash
        }
        Users.push(newUser);
    })
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
    res.json({ user: req.user });
}

