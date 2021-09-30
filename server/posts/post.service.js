const Account  = require('../accounts/account.model');
const Post  = require('./post.model');
const Comment  = require('./comment.model');

module.exports = {
  insertPost,
  insertComment
};

async function insertPost(params, origin){
  const user = Account.findOne({_id: params.userName})
  const post = new Post();
  post.post_title = params.post_title;
  post.post_body = params.post_body;
  post.category = params.category;
  post.userId = params.userName;
  await post.save();
  console.log('this is the post: ' + post);
};

async function insertComment(params, origin){
  let post = await Post.findOne({_id: params.postId})
  let comment = new Comment();
  comment.comment_body = params.comment_body;
  comment.userName = params.userName;
  comment.postId = params.postId;
  comment.userId = params.userId;
  try{
    await comment.save();
    console.log(comment);
  }catch(err){
  console.log('COMMENT SAVE, ' + err)
  }
  console.log("POST ID IS..." + post._id);
  try{
    post.comments.push(comment._id);
    await post.save();
    console.log(post);
  }catch(err){
    console.log('DARNIT POST SAVE,' + err)
  }
};
