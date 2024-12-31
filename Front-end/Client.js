function SubmitClick() {
    const username = document.getElementById('usernameVAL').value.trim().toLowerCase(); // username isn't case sensitive, so we trim white space and make it lower case
    const password = document.getElementById('passwordVAL').value.trim(); // password is case sensitive so we care about upper and lowercases


    const payload = {'username': username, 'password': password}; //formating sent data as a JS object as our middleware in server can accept this.   
    // the general format for the ajax request are pulled from the JQUERY resources, this is somewhat similair to what we did in lab 8 however we are directly sending a post request
    //as req.body
    $.ajax({ 
        type: "POST", 
        url: 'http://localhost:3000/login', //route in server
        data: payload, 
        success: function(data, status) {
            if (data.Auth === false) {
                alert('Invalid Username or Password');
            } else {
                alert('Login Successful. Welcome: ' + data.User);
                window.location.href = "Chatting.html"; //redirect upon a succesful login to the home page
            }
        }
    });
}



function CreateClick() {
    const username = document.getElementById('usernameCreate').value.trim().toLowerCase();
    const password = document.getElementById('passwordCreate').value.trim();
    const passwordCheck = document.getElementById('passwordCheck').value.trim();

    //same idea passwords are case sensitive while usernames are not

    if (password === passwordCheck) {
        const payload = { 'username': username, 'password': password }; // formating post data

        $.ajax({ 
            type: "POST", 
            url: 'http://localhost:3000/create', 
            data: payload, 
            success: function (data, status) {
                if (data.Create === false) { 
                    alert('Username is Already Taken, Please Choose Another.');
                } else {
                    alert('Account "' + data.User + '" has been created.');
                }
            }
        });
    } else {
        alert('Error: Passwords do not match');
    }
}

function ForgottenClick() {

    const username = document.getElementById('usernameForgot').value.trim().toLowerCase();
    payload = {'username': username,}
    
    $.ajax({ 
        type: "POST", 
        url: 'http://localhost:3000/forgot', 
        data: payload, 
        success: function(data, status) {
            if (data.Forgot === false) {
                alert('Invalid Username');
            } else {
                document.getElementById('passwordPlaceholder').innerHTML =('The Password for "' + username + '" is "' + data.Forgot + '"'); // displaying password in html element
            }
        }
    });
}

