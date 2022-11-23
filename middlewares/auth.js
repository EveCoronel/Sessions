const auth = async (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect('/unauthorized');
    }
};

module.exports = auth;