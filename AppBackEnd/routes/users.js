const express = require("express");
const users = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../Models/User');
const { auth } = require("../medlware/auth");
users.use(cors())

users.post('/login', (req, res) => {
  console.log("--->", req.body);
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        var result = bcrypt.compare(req.body.password, user.password);
               if (result) {
          let token = jwt.sign({userId: user._id}, 'SECRET_KEY', {
            expiresIn: 1440
          })
          const data = {token : token , user : user} ; 
          res.send(data)
        } else {
          // res.send({err:' Password is not correct '});  
          res.status(400).json({ error: ' Password is not correct' })
               
         }              
      } else {
        // res.send({err:' User does not exist '}); 
        res.status(400).json({ error: ' User does not exist' })
       
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err })
    })
})


users.post('/addUser', (req, res) => {
  console.log("----> req ",req.body);
  const userData = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  }
  console.log("---->",userData);

  User.findOne({
      email: req.body.email
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + ' user Registered successfully' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.put('/addFriend/:id',auth, async(req, res) => {
  try {
    console.log("req.user.userId",req.user.userId);  
  const user = await User.findOne({  
    _id: req.user.userId
  })
  console.log("user---->",user);
  
  if(user.friends.includes(req.params.id)){
    const resulte = await User.findByIdAndUpdate({_id: req.user.userId},{ $pull: { friends: req.params.id }})
      res.status(200).json(resulte);
    return 
  }

  const resulte = await User.findByIdAndUpdate({_id: req.user.userId},{ $push: { friends: req.params.id }})
  res.status(200).json(resulte);
  
  } catch (error) {
    res.status(500).json(error);
  }
  })

users.get("/",auth, async (req, res) => {
  console.log("req.user.userId",req.user.userId);
    const users = await User.find({_id:{$ne: req.user.userId}}).populate("friends");
    try {
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  users.get("/Friends",auth, async (req, res) => {
    console.log("req.user.userId",req.user.userId);
      const users = await User.find({_id: req.user.userId}).populate("friends");
      try {
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
    });

  // users.get("/profile",auth, async (request, response) => {
  //  // console.log("req.user.userId",req.user.userId);
  //     const users = await User.findById(request.user.userId);
  //     try {
  //       response.send(users);
  //     } catch (error) {
  //       response.status(500).send(error);
  //     }
  //   });



  users.get("/:id",auth, async (request, response) => {
    
    const users = await User.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = users;