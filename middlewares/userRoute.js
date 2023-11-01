const userRoute = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}

const nonUserRoute = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return next(); // Permite que los usuarios no autenticados pasen al siguiente middleware
    }
    res.redirect('/');
}

module.exports = {
    userRoute,
    nonUserRoute
};