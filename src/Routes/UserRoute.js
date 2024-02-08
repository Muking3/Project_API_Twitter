import express from "express"
import { getAlluser, postuser } from "../Controllers/UserController.js"
import { validate } from "../Middlewar/UserValidation.js"

export const user = express.Router()

user.get("", getAlluser)

// user.get("/:id", getuser)

user.post("", validate, postuser)

// user.patch("", patchuser)

// user.delete("", deleteuser)
