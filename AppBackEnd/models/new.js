const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    titre:{
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comments: [
        {
        user:
        { 
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,

        }, text: String,
        createdAt: {
                default: Date.now(),
                type: Date,
        } 
        }
],
    likes: [ 
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    dislikes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ]
  

},{timestamps: true});


const User = mongoose.model("New", schema);

module.exports = User;