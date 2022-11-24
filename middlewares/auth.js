let webAuth = (req, res, next) => {
    if (req.session?.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

let apiAuth = (req, res, next) => {
    if (req.session?.user) {
        next()
    } else {
        res.status(401).json({ error: 'no autorizado!' })
    }
}

module.exports = {
    webAuth,
    apiAuth
}