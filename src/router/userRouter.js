const express = require('express')
const router = express.Router()
const path = require('path')

const bcrypt = require('bcrypt')
const passport = require('passport')

const initializePassport = require('./../helpers/passport_config')
// initializePassport(passport, email => {
//     return users.find(user => user.email === email)
// })

const homeDirectory = path.join(__dirname, '/../../public')

router.get('/login', (req, res) => {
    res.sendFile(`${homeDirectory}/login.html`)
})

router.post('/login', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    } catch (e) {

    }
    // if(req.body.username == 'aashlay') {
    //     res.statusMessage = "Invalid username"
    //     return res.status(400).send({
    //         error: "invalid username"
    //     })
    // }
    // if(req.body.password == 'aashlay') {
    //     res.statusMessage = "Invalid password"
    //     return res.status(400).send({
    //         error: "invalid password"
    //     })
    // }
    res.send({
        url: '/signup'
    })
    // res.send('hah')
})

router.get('/signup', (req, res) => {
    res.sendFile(`${homeDirectory}/signup.html`)
})

module.exports = router