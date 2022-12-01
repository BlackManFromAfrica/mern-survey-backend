import express from "express"
import mongoose from 'mongoose'
import fs from 'fs';
import { registerValidation, loginValidation, pollCreateValidation } from './validations.js'
import checkAuth from "./utils/checkAuth.js"
import * as PollController from "./controllers/PollController.js"
import * as  UserController from "./controllers/UserController.js"
import handleValidationErrors from './utils/handleValidationErrors.js'
import cors from "cors"

mongoose.connect(
 'mongodb+srv://admin:admin@cluster0.u7umau7.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log("DB Ok")).catch((err) => console.log("db error", err))

const app = express();
app.use(express.json())
app.use(cors())
app.post('/register', registerValidation, handleValidationErrors, UserController.register)
app.post('/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/me', checkAuth, UserController.getMe)


app.get('/', PollController.getAll)
app.get('/polls/:id', checkAuth, PollController.getOne)
app.post('/polls', checkAuth, pollCreateValidation, PollController.create)
app.delete('/polls/:id', checkAuth, PollController.remove)
app.patch('/polls/:id', checkAuth, PollController.update)


app.listen(3000 , (err) => {
  if (err) {
    return console.log(err)
  }
  console.log("Server Ok")
})