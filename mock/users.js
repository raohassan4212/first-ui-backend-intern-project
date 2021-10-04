const Users = [ 
    {id: "1",  firstname: "Hassan", lastname: "lastname", number:"789456", email: "hassan@gmail.com", confirmemail: "", password: "123"},
    {id: "2",  firstname: "Ibrahim", lastname: "lastname", number:"789456", email: "ibrahimn@gmail.com", confirmemail: "", password: "123"},
    {id: "3",  firstname: "Ali", lastname: "lastname", number:"789456", email: "ali@gmail.com", confirmemail: "", password: "123"},
    {id: "4",  firstname: "Khan", lastname: "lastname", number:"789456", email: "khan@gmail.com", confirmemail: "", password: "123"},
];

module.exports.getUsers =  () => { return [...Users]};

module.exports.addUser = async (user) => {
    user = {id: `${Users.length + 1}`, ...user}
    Users.push(user);
}