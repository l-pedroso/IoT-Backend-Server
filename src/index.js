if(process.env.NODE_ENV == "development"){
    require('dotenv').config();
}

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const jwtStrategyConfig = require('./middlewares/auth/jwt_configuration_middleware');
const routesConfig = require('./routes/index_route');

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGO_CONN_URL, { useNewUrlParser: true , useCreateIndex: true}).then(() => {
    console.log('MongoDB --  database connection established successfully!');
}).catch(err => {
    console.log('Connection to database error' + err);
});
    

mongoose.connection.on('error', err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
})

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
jwtStrategyConfig(passport);


//=== 4 - CONFIGURE ROUTES
//Configure Route
routesConfig(app);


//=== 5 - START SERVER
app.listen(process.env.PORT || 3000, () => console.log('Server running on http://localhost:'+process.env.PORT+'/'));