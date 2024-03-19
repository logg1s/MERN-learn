const HttpError = require("../models/http-error");
const uuid = require("uuid");
const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Long Nguyen',
        email: 'a@gmail.com',
        password: 'test'
    },
    {
        id: 'u2',
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'john123'
    },
    {
        id: 'u3',
        name: 'Jane Smith',
        email: 'jane@gmail.com',
        password: 'jane123'
    },
    {
        id: 'u4',
        name: 'Alice Johnson',
        email: 'alice@gmail.com',
        password: 'alice123'
    },
    {
        id: 'u5',
        name: 'Bob Williams',
        email: 'bob@gmail.com',
        password: 'bob123'
    }
];

function getUsers(req, res, next) {
    res.json(DUMMY_USERS)
}

function signup(req, res, next) {
    const {name, email, password} = req.body
    
    const hasEmail = DUMMY_USERS.find(u => u.email === email)
    if(hasEmail) {
        return next(new HttpError("Email existed", 409))
    }

    const newUser = {id: uuid.v4(), name, email, password}

    DUMMY_USERS.push(newUser)

    res.status(201).json(newUser)
}

function login(req, res, next) {
    const {email, password} = req.body

    const account = DUMMY_USERS.find(u => u.email === email)

    if(!account || account.password !== password) {
        return next(new HttpError('Wrong email or password', 401))
    }

    res.json({message: 'Login successful'})
}

module.exports = { getUsers, signup, login }