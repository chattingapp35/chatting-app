const { google } =  require('googleapis');

const googleConfig = {
    clientId: '713881760388-59fevhhfc13a700b9813neq7ffeknggc.apps.googleusercontent.com',
    clientSecret: 'Lxt5pI_UvRwa5Z7b7bAbqkZv',
    redirect: 'https://chattingapp35.herokuapp.com/google-auth'   
}

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
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



module.exports = {
    urlGoogle,

}