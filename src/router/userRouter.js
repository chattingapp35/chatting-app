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
        email: userdata.email
    })
    res.cookie("user", token, {maxAge: 604800000, httpOnly: true})
    res.redirect(`/user/${userdata.email}`) // this is incomplete.. validate from db if the user exists.. if user doesn't exists then return back to login page
})

router.get('/logout', (req, res) => {
    res.clearCookie("user");
    res.redirect('/');
})

router.post('/login', async (req, res) => {

})

router.get('/signup', (req, res) => {
    res.sendFile(`${homeDirectory}/signup.html`)
})

router.get("/user/:user", (req, res) => {
    res.send(`welcome ${req.params.user}`)
})

module.exports = router