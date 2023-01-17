const asyncHandler = require("express-async-handler");
const Report = require("../Models/reportModel");

const registerReport = asyncHandler(async (req, res) => {
    const report = await Report.create({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        createdBy: { email: req.email },
    });

    if (report) {
        res.status(201).json({
            _id: report._id,
            title: report.title,
            content: report.content,
            category: report.category,
        });
    } else {
        res.status(400);
        throw new Error("Error occured");
    }
});

const getReport = asyncHandler(async (req, res) => {
    const email = req.email;

    if (email.endsWith("@autoritati.ro")) {
        const category = email.split("@")[0];
        const reports = await Report.find({ category });

        res.json(reports);
    } else {
        const reports = await Report.find({
            createdBy: {
                email,
            },
        });

        res.json(reports);
    }
});

module.exports = { registerReport, getReport };
