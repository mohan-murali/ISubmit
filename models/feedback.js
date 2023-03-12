const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    subNr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "submission",
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    mark: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Feedback", feedbackSchema);