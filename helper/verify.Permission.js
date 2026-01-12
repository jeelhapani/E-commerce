module.exports = {
    VerifyAccessPermission: (roles) => {
        return (req, res, next) => {
            if (!roles.includes(req.payload.user_role)) {
                const message = `Only ${roles.join(" or ")} can access this route`;
                return res.status(400).json({ status: false, message });
            }
            next();
        };
    },
};