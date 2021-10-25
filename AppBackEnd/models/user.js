const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
],
});

const User = mongoose.model("User", schema);

module.exports = User;