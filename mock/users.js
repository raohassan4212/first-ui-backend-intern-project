const Users = [ 
    {id: "1",  firstname: "Hassan", lastname: "lastname", number:"789456", email: "raohassan4212@gmail.com", confirmemail: "", password: "123"},
    {id: "2",  firstname: "Ibrahim", lastname: "lastname", number:"789456", email: "ibrahimn@gmail.com", confirmemail: "", password: "123"},
    {id: "3",  firstname: "Ali", lastname: "lastname", number:"789456", email: "ali@gmail.com", confirmemail: "", password: "123"},
    {id: "4",  firstname: "Khan", lastname: "lastname", number:"789456", email: "khan@gmail.com", confirmemail: "", password: "123"},
];

module.exports.getUsers =  () => { return [...Users]};
module.exports.getVerifiedEmail = () => {
    return   signUpUser = users.find( async (users) => {
        if (users.email === email) {
            var code = randomCode();
            addCode(email, code);
            await sendVerificationCode(email, code);
            res.send("if wala scope")
        }
    });
}

module.exports.addUser = async (user) => {
    user = {id: `${Users.length + 1}`, ...user}
    Users.push(user);
}