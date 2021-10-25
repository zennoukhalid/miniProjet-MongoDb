const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    new: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "New",
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
  

},{timestamps: true});


const User = mongoose.model("Coment", schema);

module.exports = User;