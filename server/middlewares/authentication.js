const userService = require("../services/users");
module.exports = basicAuth;

async function basicAuth(req, res, next) {
    // make authenticate path public
    if (req.path === '/api/users/auth' || req.path === '/api/siteSettings/1' || req.path.indexOf("api") === -1) {
        return next();
    }
    
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

  
    if (credentials.length < 4) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    
    const [username, password] = credentials.split(':');
    //console.log(username,password)
    const user = await userService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    // attach user to request object
    req.user = user

    next();
}