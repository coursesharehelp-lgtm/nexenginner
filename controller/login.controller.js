const express = require('express');
require('../config/db');

const User = require('../models/register.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        // EMPTY CHECK
        if (email === "" || password === "") {

            req.session.message = "All fields are required";

            return res.redirect('/login');
        }

        // FIND USER
        const userExist = await User.findOne({ email });

        if (!userExist) {

            req.session.message = "User not found";

            return res.redirect('/login');
        }

        // PASSWORD CHECK
        const passwordMatch = await bcrypt.compare(
            password,
            userExist.password
        );

        if (!passwordMatch) {

            req.session.message = "Invalid password";

            return res.redirect('/login');
        }

        // JWT TOKEN
        const token = jwt.sign(
            {
                id: userExist._id,
                name: userExist.name,
                email: userExist.email
            },
            "nexengineer_jwt_secret",
            {
                expiresIn: "7d"
            }
        );

        // SAVE TOKEN
        req.session.token = token;

        res.redirect('/dashboard');

    } catch (error) {

        console.log(error);

        res.send("Login Error");

    }

};

module.exports = userLogin;