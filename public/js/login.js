function login(){

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username.length < 5)
    {
        document.getElementById("authentication").innerHTML = "Username must me atleast 5 characters long"
    }
    else if(password.length < 6)
    {
        document.getElementById("authentication").innerHTML = "Password min length is 6."
    }
    else
    {
        fetch('/login', {
                method: "POST",
                body: JSON.stringify({ 
                    username,
                    password
                }), 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response)
                throw new Error(response.statusText)
            }
        }).then((response) => {
            console.log(response)
            // window.location = response.url;
        }).catch((error) => {
            console.log(error)
            document.getElementById("authentication").innerHTML = error
        })
    }
}

function getGoogleAuthUrl() {
    fetch('/get-google-auth-url', {
        method: "POST",
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            console.log(response)
            throw new Error(response.statusText)
        }
    }).then((response) => {
        console.log(response)
        window.location = response.url;
    }).catch((error) => {
        console.log(error)
        document.getElementById("authentication").innerHTML = error
    })
}