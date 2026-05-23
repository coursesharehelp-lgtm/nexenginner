const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const token = req.session.token;

    if (!token) {

        return res.redirect('/login');
    }

    try {

        const verified = jwt.verify(
            token,
            "nexengineer_jwt_secret"
        );

        req.user = verified;

        next();

    } catch (error) {

        return res.redirect('/login');
    }

};

module.exports = authMiddleware;