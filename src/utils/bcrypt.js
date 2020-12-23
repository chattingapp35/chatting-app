const bcrypt = require('bcrypt')

async function bcryptHashedPassword (password) {
    let pass;
    await bcrypt.hash(password, 15, function(err, hash) {
        console.log(1)
        return hash
    });
    // console.log(2)
    // return pass
}

module.exports = {
    bcryptHashedPassword
}