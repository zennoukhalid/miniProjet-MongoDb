const express = require("express");
const coments = express.Router()
const cors = require('cors')

const Coment = require('../Models/comentaire');
const { auth } = require("../medlware/auth");
coments.use(cors())



coments.post('/addComent',auth, (req, res) => {
  const coment = {
    text: req.body.text,
    new: req.body.new,
    user: req.user.userId
  }

  Coment.create(coment)
            .then(neww => {
              res.json({ status: neww.titre + 'comentaire added successfully!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
   
})

coments.get("/", async (request, response) => {
  const Coments = await Coment.find({});

  try {
    response.send(Coments);
  } catch (error) {
    response.status(500).send(error);
  }
});

  module.exports = coments;