if(process.env.NODE_ENV == "development"){
    require('dotenv').config();
}

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const jwtStrategyConfig = require('./middlewares/auth/jwt_strategy_configuration');
const routesConfig = require('./routes');

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

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'lipe_hg007@hotmail.com', // Change to your recipient
  from: 'luis.pedroso.felipe@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })