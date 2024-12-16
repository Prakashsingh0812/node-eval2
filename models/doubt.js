const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
    studentId: String,
    question: String,
    status:{type:String, default:"unanswered"},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Doubt", doubtSchema);
