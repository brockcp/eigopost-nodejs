const mongoose = require('mongoose');
const Post = require('./post.model');
const Account = require('../accounts/account.model');

const commentSchema = new mongoose.Schema(
  {
    comment_body:{type:String, required:"Required"},
    userName:{type:String, required:"Required"},
    postId:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Post",
    }],
    userId:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Account",
    }],
    score:{type:Number, default:0},
    upvotedby:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Account"
    }],
    downvotedby:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Account"
    }],
  },
  { timestamps: true}
);
module.exports = mongoose.model("Comment", commentSchema);
