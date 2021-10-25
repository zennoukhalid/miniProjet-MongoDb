const express = require("express");
const news = express.Router()
const cors = require('cors')
const New = require('../Models/new');
const { auth } = require("../medlware/auth");
news.use(cors())


news.post('/addNew',auth, (req, res) => {
  const newData = {
    titre: req.body.titre,
    url: req.body.url,
    image: req.body.image,
    user: req.user.userId
  }

  New.findOne({  
      url: req.body.url
  })
    //TODO bcrypt
    .then(neww => {
      if (!neww) {  
        New.create(newData)
            .then(neww => {
              res.json({ status: neww.titre + 'New added successfully!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
      } else {
        res.json({ error: 'New already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

news.get("/", async (request, response) => {
  try {
    const NNews = await New.find().populate("comments.user user");
    response.send(NNews);
  } catch (error) {
    response.status(500).send(error);
  }
});

news.get("/count", async (request, response) => {
  try {
    const NNews = await New.count({ titre: 'test' });
    console.log("--------------->",NNews);
    response.sendStatus(NNews);
  } catch (error) {
    response.status(500).send(error);
  }
});



//add likes 

news.put('/addLike/:id',auth, async(req, res) => {
try {
  console.log("req.user.userId",req.user.userId);

const nnew = await New.findOne({  
  _id: req.params.id
})
console.log("nnew",nnew);
if(nnew.likes.includes(req.user.userId)){
  const resulte = await New.findByIdAndUpdate({_id: req.params.id},{ $pull: { likes: req.user.userId }})
    res.status(200).json(resulte);
  return 
}
const resulte = await New.findByIdAndUpdate({_id: req.params.id},{ $push: { likes: req.user.userId }})
res.status(200).json(resulte);

} catch (error) {
  res.status(500).json(error);
}
})

//add dislikes

news.put('/addDislike/:id',auth, async(req, res) => {
  try {
    console.log("req.user.userId",req.user.userId);
  
  const nnew = await New.findOne({  
    _id: req.params.id
  })
  console.log("nnew",nnew);
  if(nnew.dislikes.includes(req.user.userId)){
    const resulte = await New.findByIdAndUpdate({_id: req.params.id},{ $pull: { dislikes: req.user.userId }})
      res.status(200).json(resulte);
    return 
  }
  const resulte = await New.findByIdAndUpdate({_id: req.params.id},{ $push: { dislikes: req.user.userId }})
  res.status(200).json(resulte);
  
  } catch (error) {
    res.status(500).json(error);
  }
  })

  //add comment
  news.put('/addComment/:id',auth, async(req, res) => {
    try {
      console.log("req.user.userId");
    
    const nnew = await New.findOne({  
      _id: req.params.id
    })
    console.log("nnew",nnew);

    const resulte = await New.findByIdAndUpdate(
      {_id: req.params.id},
      { $push: { comments:{
        user: req.user.userId,
        text: req.body.text
      }}})
    res.status(200).json(resulte);
    
    } catch (error) {
      res.status(500).json(error);
    }
    })

  module.exports = news;