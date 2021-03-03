const jwt_authentication_middleware = require('../middlewares/auth/jwt_authentication_middleware');
const user = require('./user');
const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });
    app.use('/api/auth', jwt_authentication_middleware);
    app.use('/api/user', authenticate, user);
};