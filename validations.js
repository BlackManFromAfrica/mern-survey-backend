import { body } from "express-validator"

export const registerValidation = [
    body("username", "имя должно быть минмум 3 символа").isLength({ min: 3 }),
    body("password", "пароль должен быть минмум 5 символов").isLength({ min: 5 }),
    body("avatarUrl" , "не верная ссылка на аватар").optional().isString(),
]

export const loginValidation = [
    body("username", "имя должно быть минмум 3 символа").isLength({ min: 3 }),
    body("password", "пароль должен быть минмум 5 символов").isLength({ min: 5 }),
]


export const pollCreateValidation = [
    body('title', 'Введите название опроса').isLength({min:3}).isString(),
    body('description', 'Введите описание опроса').isLength({min:5}).isString(),
    body('pages', 'Введите вопросы').isArray(),
    body('logo', 'Неверная ссылка на изображение').optional().isString(),
]
