const express = require('express');
const app = express();
// app.use(express.urlencoded({extended:false}));
var cors = require('cors');
var { addUser, getUsers, getVerifiedEmail } = require('./mock/users');
var { sendVerificationCode } = require('./services/email-service');
var { verifyCode, addTempUser, getTempUser, randomCode, addCode } = require('./services/verification-service');
var dotenv = require('dotenv');


dotenv.config();

app.use(cors());

app.use(express.json());

// let Users = [
//     {id: "1",  firstname: "hassan", lastname: "hassan", number:"789456", email: "raohassan4212@gmail.com", confirmemail: "", password: "123456"},
//     {id: "2",  firstname: "Ibrahim", lastname: "last",number:"789456", email: "ibrahimn@gmail.com", confirmemail: "", password: "123"},
//     {id: "3",  firstname: "Ali", lastname: "last",number:"789456", email: "ali@gmail.com", confirmemail: "", password: "123"},
//     {id: "4",  firstname: "Khan", lastname: "last",number:"789456", email: "khan@gmail.com", confirmemail: "", password: "123"},
// ]

app.get("/", (req, res) => {
    var userr = getUsers()
    console.log("get User", userr);
    res.send(`Users: <br> ${JSON.stringify(userr)}`)
})

app.get('/user', function (req, res) {
    var signUpUser = getUsers()
    var user = signUpUser.find((user) => {
        return (user.email === req.headers.email && user.password == req.headers.password)
    })
    res.send(user);
    res.end();
})

app.post("/create", async (req, res) => {
    let tempUser = {
        firstname: req.headers.firstname,
        lastname: req.headers.lastname,
        number: req.headers.number,
        email: req.headers.email,
        password: req.headers.password
    };
    var code = randomCode();
    addCode(tempUser.email, code);
    addTempUser(tempUser);
    await sendVerificationCode(tempUser.email, code);
    console.log("temp user is created");
    res.send("email sent");
})

app.post("/verify", async (req, res) => {
    var { email, code } = req.headers;
    console.log(email);
    console.log(code);
    if (verifyCode(email, code)) {
        var user = getTempUser(email);
        await addUser(user);
        console.log(user);
        res.send("Ok")
        // res.sendStatus(200);
    } else {
        res.sendStatus(400);
        console.log("Some err")
    }
})

app.post("/forget", (req, res) => {
    
    console.log(signUpUser);
    res.send("if ky bahar  wala scope")
})

app.listen("5000", () => {
    console.log("Sever is up on port 5000");
})
