const auth = require('./auth');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });
    app.use('/api/auth', auth);
    //app.use('/api/user', jwt_authentication_middleware, user_route);
};