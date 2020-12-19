const { google } =  require('googleapis');
const axios = require('axios')

const googleConfig = {
    clientId: '713881760388-59fevhhfc13a700b9813neq7ffeknggc.apps.googleusercontent.com',
    clientSecret: 'Lxt5pI_UvRwa5Z7b7bAbqkZv',
    redirect: 'https://chattingapp35.herokuapp.com/google-auth'   
}

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/contacts'
]

function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

function getConnectionURL(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}

function getGooglePlusApi(auth) {
    return google.plus({version: 'v1', auth});
}

function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionURL(auth);
    return url;
}

async function getGoogleAccountFromCode(code) {
    const auth = createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    console.log(tokens)
    // auth.setCredentials(tokens)
    // const plus = getGooglePlusApi(auth);
    // const me = await plus.people.get({userId: 'me'});
    // const userGoogleId = me.data.id;
    // const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    // return {
    //     id: userGoogleId,
    //     email: userGoogleEmail,
    //     tokens: tokens
    // };
    const userdata = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });
    // console.log(userdata.data);
    return userdata.data;
}

module.exports = {
    urlGoogle,
    getGoogleAccountFromCode
}