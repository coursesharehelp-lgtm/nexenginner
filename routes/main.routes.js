const express = require('express');
const router = express.Router();

// CONTROLLERS
const userRegister = require('../controller/register.controller');
const userLogin = require('../controller/login.controller');

// MIDDLEWARE
const authMiddleware = require('../middleware/login.middleware');

// HOME
router.get('/', (req, res) => {
    res.render('index');
});

// ================= LOGIN =================

// LOGIN PAGE
router.get('/login', (req, res) => {

    const message = req.session.message || '';

    req.session.message = '';

    res.render('login', { message });

});

// LOGIN USER
router.post('/login', userLogin);

// ================= REGISTER =================

// REGISTER PAGE
router.get('/register', (req, res) => {

    const message = req.session.message || '';

    req.session.message = '';

    res.render('register', { message });

});

// REGISTER USER
router.post('/register', userRegister);

// ================= DASHBOARD =================

router.get('/dashboard', authMiddleware, (req, res) => {

    res.render('dashboard', { user: req.user });

});

// ================= LOGOUT =================

router.get('/logout', (req, res) => {

    req.session.destroy(() => {

        res.redirect('/login');

    });

});

module.exports = router;