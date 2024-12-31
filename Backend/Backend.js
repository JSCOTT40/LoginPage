const express = require('express');
var app = express();
const path = require('path')
const PORT = 3000;

//Below is the Middleware we used throughout the server code, the general resources were pulled from: https://expressjs.com/en/api.html

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//We opted to use urlencoded so we could intrepret the POST request as JS obejct
//This saves us a few lines of code of formating the json for each route

app.use(express.static(path.join(__dirname, '../Front-End')));

const users = [
    { username: 'admin', password: 'admin123' }
];

//This is our User DataBase. The only constant user is the admin account
// it was easier to work with an array of JS objects then arrays of usernames and passwords  

app.get('/test', (req, res) => {    
    console.log('Server is Working')
});

// the /test route was used for debugging purpose and was to make sure the server was running on the correct domain 
app.get('/', (req, res) => {
    res.redirect('/Login.html');
});
app.post('/login', (req, res) => {

    console.log('New request received: Login');
    console.log(JSON.parse(JSON.stringify(req.body)))
    const data = req.body;
    
    const username = data.username
    const password = data.password 

    //Parsing Post JS Object for the required parameters
    
    console.log('Username:', username);
    console.log('Password:', password);

    const Auth = authcheck(username, password, users);
    console.log('Authentication result:', Auth);    

    res.header("Access-Control-Allow-Origin", "*");
    res.json({ 'Auth': Auth , 'User': username});
    
    //Here we send the Authorization result and the User back to the Client, we first most format the responce
});

// The /login Route was used for when someone would try and login to the main home page
// it's mainly used for validation and to make sure the user is in the database and has entered the correct parameters

app.post('/create', (req, res) => {

    console.log('New request received: Create');
    console.log(JSON.parse(JSON.stringify(req.body)))
    const data = req.body;

    if (!data) {
        console.error('Invalid request: logindata not found in request body');
        res.status(400).send('Bad Request');
        return;
    }
    
    const username = data.username;
    const password = data.password;
    
    
    console.log('Username:', username);
    console.log('Password:', password);

    const Create = addUser(username, password)

    console.log('Creation result:', Create);    

    res.header("Access-Control-Allow-Origin", "*");
    res.json({ 'Create': Create , 'User': username});
});

// the /create route adds a user to our database above such that when the /login route it called it will have these new values 
app.post('/forgot', (req, res) => {

    console.log('New request received: Forgot');
    console.log(JSON.parse(JSON.stringify(req.body)))
    const data = req.body;

    if (!data) {
        console.error('Invalid request: data not found in request body');
        res.status(400).send('Bad Request');
        return;
    }
    //sends an error if there is no data in the request, mainly used for debugging in the earlier phases of devolpment as sometimes the POST requests would
    //send bad requests

    const username = data.username;
    
    console.log('Username:', username);

    const Forgot = checkUser(username)

    console.log('Forgot result:', Forgot);    

    
    res.header("Access-Control-Allow-Origin", "*");
    res.json({ 'Forgot': Forgot })

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/login`);
});

// Below we have our functions that will be used throughout the server requests above

function authcheck(username, password, users) {
    // Parse through the entire array of objects in our database 'users'
    for (const user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    return false;
}

//we use the logical operators && to make sure both password and username are equal to the same username and password in the database
// it returns false if this isn't satsifed and true otherwise


function addUser(username, password) {
    const userExists = users.find(user => user.username === username);
    //here we parse the array using .find to find if the username already exists in our database, We used an arrow function for symplficaiton of syntax 
    // The resources for this were found on W3 schools 

    if (userExists) {
        return false; // Username already exists
    } else {
        users.push({ username, password });
        return true; // User added successfully
    }
}

function checkUser(username){
    for (const user of users) {
        if (user.username === username) {
            return user.password;
        }
    }
    return false; 
}
// This function simply checks if a username is in the database and returns a boolean if false and the password if it exists in the database