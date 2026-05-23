const express = require('express');
require('../config/db');

const User = require('../models/register.model');
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // CHECK EMPTY FIELDS
        if (name === "" || email === "" || password === "") {

            req.session.message = "All fields are required";

            return res.redirect('/register');
        }

        // CHECK USER EXISTS
        const userExist = await User.findOne({ email });

        if (userExist) {

            req.session.message = "Email already exists";

            return res.redirect('/register');
        }

        // HASH PASSWORD
        const passwordHash = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = new User({
            name,
            email,
            password: passwordHash
        });

        await user.save();

        req.session.message = "Registration successful. Please login.";

        return res.redirect('/login');

    } catch (error) {

        console.log(error);

        req.session.message = "Something went wrong";

        return res.redirect('/register');
    }

};

module.exports = userRegister;