var codes = {};
var tempUsers = {
    "email@gamd./com": {name: "a", email:"dwd" }
};



module.exports.randomCode = () => {
    return (Math.random() * 1000000).toFixed(0).padStart(6, "0");
}

module.exports.addCode = (email, code) => {
    codes[email] = code;
}

module.exports.verifyCode = (email, code) => {
    return (code === codes[email] )
}

module.exports.addTempUser = (user) => {
    tempUsers[user.email] = user;
}

module.exports.getTempUser = (email) => {
    return tempUsers[email]
}