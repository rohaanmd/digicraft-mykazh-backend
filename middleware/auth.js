module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.send({
            success: false,
            message: "please LogIn",
        });
    }
    next();
}