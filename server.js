const express = require('express');
const path = require('path');
const session = require('express-session');

const connectDB = require('./config/db');
const authRoutes = require('./routes/main.routes');

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'nexengineer_secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', authRoutes);

app.listen(5000, () => {
    console.log("Server Running on 5000");
});