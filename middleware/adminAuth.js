const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const token = req.header('x-auth-header'); 
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ msg: "Access denied. Admins only." });
        }

        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = { 
    adminAuth};
