const mongoose = require("mongoose");
const User = require("./userModel");

const reportSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
