const followModel = require('../models/follow.model');

const userModel = require('../models/user.model')
async function  followUserController(req , res){

const followerUsername = req.user.username;
const followeeUsername =await userModel.findOne({ username: req.params.username });
if(followerUsername === followeeUsername.username){
    return res.status(400).json({
        message : "You cannot follow yourself"
    })
}


const iffolloweeexist =  await userModel.findOne({
  username  :  followeeUsername
})
if(!iffolloweeexist){
    return res.status(404).json({
        message : "User you are trying to follow does not exist"
    })
}

const isAllReadyFollowing = await followModel.findOne({
   follower: followerUsername,
   followee: followeeUsername._id
}) 
   if (isAllReadyFollowing) {
        return res.status(200).json({
            message: "You already following",
            follow: isAllreadyFollowing
        });
    }

console.log("DB result:", isAllReadyFollowing)
const followRecord = await followModel.create({
    follower : followerUsername ,
    followee : followeeUsername
})
res.status(201).json({
    message : `You are following this ${followeeUsername.username}`,
    follow :  followRecord
})

}



 async function unfollowUsercontroller ( req , res ){
    const followerUsername = req.user.username ;
    const followeeUsername =  req.params.username;
    const isUserfollowing =  await followModel.findOne({
        follower: followerUsername ,
        followee:  followeeUsername
    })
    if(!isUserfollowing){
        return res.status(200).json({
            message :  `You are not following ${followeeUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserfollowing._id)
    res.status(200).json({
        message : `You have unfollowed this user ${followeeUsername}`
    })
 }

module.exports = {
    followUserController , unfollowUsercontroller
}