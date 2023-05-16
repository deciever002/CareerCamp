//Setting the port for server 
require('dotenv').config();
const port = 8000;

// Get all the required Dependencies
const express = require('express');
const session = require('express-session');
const router = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');


//Create an instance of express app
const app = express();

//Setting view engine as ejs and also definig the folder from where the views will be rendered
app.set('view engine','ejs');
app.set('views','./views');

//Using express.Static to load asstes
app.use(express.static('./assets'));

//Creates a Persistent session in the db.
const sessionStore = MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING
})

//create a session and store that session details in mongo db with connect mongo
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    store: sessionStore,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

//Use flash messages to display message to frontend in case of success or error
app.use(flash());

//Created a custom middleware function to convert Connect Flash messages to Noty.js notifications
app.use((req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    };
    next();
});

//Using express Layouts to render views
app.use(expressLayouts);

//extract styles and scripts from individual ejs file to layout
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);


//Using body parser to parse form data
app.use(express.urlencoded({extended: false}));

//use passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAutheticatedUser);

//Adding routes to the server
app.use('/',router);

//Listening on Port 
app.listen(port,() => {
    console.log(`Server is running on PORT: ${port}`)
})

