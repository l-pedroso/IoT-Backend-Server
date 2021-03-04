const auth_route = require('./auth_route');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });
    app.use('/api/auth', auth_route);
    //app.use('/api/user', jwt_authentication_middleware, user_route);
};