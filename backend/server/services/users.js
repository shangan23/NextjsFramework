const User = require("../../models").Users;
module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = User.findOne({
        attributes: ['uname', 'email', 'fullName', 'createdAt', 'updatedAt'],
        where: { uname: username, password: password }
    });
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}