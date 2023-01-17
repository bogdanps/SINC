const express = require("express");
const jwt = require("jsonwebtoken");
const {
    registerReport,
    getReport,
} = require("../Controllers/reportControllers");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1].slice(1, -1);
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.email = payload.email;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const router = express.Router();
router.route("/registerReport").post(authenticateJWT, registerReport);
router.route("/getReport").get(authenticateJWT, getReport);

module.exports = router;
