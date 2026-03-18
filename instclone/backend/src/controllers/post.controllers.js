const postModel = require('../models/post.model')
const imageKit  = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
// const jwt = require('jsonwebtoken')
const likeModel =  require('../models/like.model')

const imagekit = new imageKit({
   privateKey:process.env.PRIVATEKEY,
   publicKey: process.env.PUBLICKEY,
   urlEndpoint: process.env.URLENDPOINT
})

 async function createPostController(req, res){
    console.log(req.body , req.file)

    const file = await imagekit.files.upload({
      file : await toFile(Buffer.from(req.file.buffer) , 'file'),
      fileName : "Test" ,
      folder :  "cohortInstaClone"
    })
// console.log(req.file)
const post = await postModel.create({
   caption : req.body.caption,
   imgUrl : file.url ,
   user : req.user.id
})

res.status(201).json({
   message : "Post created succesfully" ,
   post
})

 }
 
 async function getPostController (req , res ){

const userId = req.user.id
const posts = await postModel.find({
   user : userId
})
res.status(200).json({
   message : "Posts" ,
   posts
})
 }

 async function getPostDetails(req , res){

   const userId = req.user.id;
   const postId =req.params.postId;
   const post  = await postModel.findById(postId);
   if(!post){
      return res.status(404).json({
         message : "Post not found."
      })
   }
   const isValidUser = post.user.toString() === userId;
   if(!isValidUser){
      return res.status(403).json({
         message : "Forbidden Content"
      })
   }

   return  res.status(200).json({
      message : "Post fetched succesfully" 
      ,post
   })
 }


 async function likePostController(req , res ){
const userId =  req.user.id
const postId  =  req.params.postId;
const post  = await postModel.findById(postId)
if(!post){
   return res.status(404).json({
   message : "Post not found"
   })
}
const likes =  await likeModel.create({
   post :postId ,
   user : userId
})
res.status(200).json({
   message  :  "Post liked succesfully"
   ,post
})
 }


async function unlikePostController(req, res) {

   const postId = req.params.postId
   const userId = req.user.id

   const isliked = await likeModel.findOne({
      post: postId,
      user: userId
   })

   if(!isliked){
      return res.status(400).json({
         message: "Post not liked"
      })
   }

   await likeModel.findOneAndDelete({ _id: isliked._id })

   res.status(200).json({
      message: "Post unliked successfully"
   })
}

async function getfeedController(req, res) {
  try {

    const userId = req.user.id;

    const posts = await postModel
      .find({})
      .sort({ _id: -1 })
      .populate('user')
      .lean();

    const feed = await Promise.all(
      posts.map(async (post) => {

        const isLiked = await likeModel.findOne({
          user: userId,
          post: post._id
        });

        post.isLiked = Boolean(isLiked);

        return post;
      })
    );

    res.status(200).json({
      message: "Post fetched successfully",
      post: feed
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}

 module.exports ={
    createPostController , getPostController ,getPostDetails , likePostController, unlikePostController , getfeedController
 }