const express = require('express');
const app = express();
// app.use(express.urlencoded({extended:false}));
var cors = require('cors');
var { addUser, getUsers } = require('./mock/users');
var { sendVerificationCode } = require('./services/email-service');
var { verifyCode, addTempUser, getTempUser, randomCode, addCode } = require('./services/verification-service');
var dotenv = require('dotenv');


dotenv.config();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    var userr = getUsers()
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
    if (verifyCode(email, code)) {
        var user = getTempUser(email);
        await addUser(user);
        res.send("Ok")
    } else {
        res.sendStatus(400);
    }
})

app.post("/forget", (req, res) => {
    var { email } = req.headers;
    var signUpUser = getUsers()
    var forgetEmailVerification = signUpUser.find((user) => {
        if (user.email === email) {
            var code = randomCode();
            addCode(email, code);
        }
    });
    res.send(forgetEmailVerification);

})

app.listen("5000", () => {
    console.log("Sever is up on port 5000");
})
