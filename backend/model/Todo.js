const mongoose = require("mongoose")

module.exports = mongoose.model("todo", mongoose.Schema({
    task: String,
    complete: Boolean,
    priority: Number,
}))