const express = require('express')
const router = express.Router()
const path = require('path')

const bcrypt = require('bcrypt')

const {urlGoogle, getGoogleAccountFromCode} = require('./../utils/google_sign_in')
const {createJWT, verifyJWT} = require('./../utils/jwt')

const homeDirectory = path.join(__dirname, '/../../public')

router.get('/login', (req, res) => {
    res.sendFile(`${homeDirectory}/login.html`)
})

router.post('/get-google-auth-url', async (req, res) => {
    const url = await urlGoogle();
    res.send({
        url
    })
})

router.get('/google-auth', async (req, res) => {
    const userdata = await getGoogleAccountFromCode(req.query.code)
    const token = createJWT({
        picture: userdata.picture,
        email: userdata.email
    })
    res.cookie("user", token)
    res.send(userdata);
})

router.get('/getUserData', (req, res) => {
    res.send(req.cookies)
})

router.post('/login', async (req, res) => {

})

router.get('/signup', (req, res) => {
    res.sendFile(`${homeDirectory}/signup.html`)
})

module.exports = router