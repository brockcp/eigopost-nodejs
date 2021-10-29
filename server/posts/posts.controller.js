const express = require("express");
const postRouter = express.Router();
const Joi = require('joi');
const { accountService } = require('../accounts/account.service');
const postService = require('./post.service');
const validateRequest = require('../_middleware/validate-request');
const Post  = require('./post.model');
const Comment  = require('./comment.model');
const Account  = require('../accounts/account.model');

module.exports = postRouter;

postRouter.post('/new-post', registerPostSchema, registerPost);
postRouter.post("/new-comment/:slug", registerCommentSchema, registerComment);
postRouter.put('/comment/upvote/:commentId', async(req, res) => {
  let upvotedbyId = req.body.user;
  let commentId = req.params.commentId;
  let response = {};
  try {
    let user = await Account.findById(upvotedbyId);
    if (user) {
      let comment = await Comment.findById(commentId);
      if (comment) {
        let allUpvotes = comment.upvotedby.map((obj) => obj.toString());
        let allDownvotes = comment.downvotedby.map((obj) => obj.toString());
        let operator = allUpvotes.includes(upvotedbyId) ? '$pull' : '$addToSet';
        let updatedComment = await Comment.findByIdAndUpdate( // Add/Remove that upvote to the post
           commentId,
           { [operator]: { upvotedby: upvotedbyId } },
           { new: true }
        );
        if (allDownvotes.includes(upvotedbyId)) { // If already downvoted, then remove the downvote
          updatedComment = await Comment.findByIdAndUpdate(
           commentId,
           { $pull: { downvotedby: upvotedbyId } },
           { new: true }
          );
        }
        let score =updatedComment.upvotedby.length - updatedComment.downvotedby.length; //update the score
        updatedComment = await Comment.findByIdAndUpdate(
          commentId,
          { score },
          { new: true }
        );
        response.success = true; // Send updated comment back to client for storing/display
        response.comment = updatedComment;
        res.json(response);
      } else {
        response.message = `The user doesnt exists`;
        res.json(response);
      }
    } else {
      response.message = `The user doesnt exist or banned`;
      res.json(response);
    }
  }
  catch (error) {
    response.message = `Server encountered an error while upvoting comment ${error}`;
    res.json(response);
  }
});
postRouter.put('/comment/downvote/:commentId', async(req, res) => {
  let downvotedbyId = req.body.user;
  let commentId = req.params.commentId;
  let response = {};
  try {
    let user = await Account.findById(downvotedbyId);// Check if the user exists and is not banned
    if (user && !user.banned) {
      let comment = await Comment.findById(commentId);// Find comment & add downvote to comment
      if (comment) {
        let allDownvotes = comment.downvotedby.map((obj) => obj.toString());
        let allUpvotes = comment.upvotedby.map((obj) => obj.toString());
        let operator = allDownvotes.includes(downvotedbyId)
          ? '$pull'
          : '$addToSet';
        let updatedComment = await Comment.findByIdAndUpdate(// Add/Remove upvote to post
          commentId,
          { [operator]: { downvotedby: downvotedbyId } },
          { new: true }
        );
        if (allUpvotes.includes(downvotedbyId)) {// remove upvote if post already upvoted
          updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $pull: { upvotedby: downvotedbyId } },
            { new: true }
          );
        }
        let score = updatedComment.upvotedby.length - updatedComment.downvotedby.length;// update score
        updatedComment = await Comment.findByIdAndUpdate(
          commentId,
          { score },
          { new: true }
        );
        response.success = true; // Send updated comment back to client for storing/display
        response.comment = updatedComment;
        res.json(response);
      } else {
        response.message = `comment doesnt exist`;
        res.json(response);
      }
    } else {
      response.message = 'user doesnt exist or banned';
      res.json(response);
    }
  } catch (error) {
    response.message = `Server encountered error while downvoting comment ${error}`;
    res.json(response);
  }
});
postRouter.get("/postComments/:ppp", async (req, res) => {
  let comments = await Comment.find({postId: req.params.ppp})
  .populate("userId")
  .then(function(comments){
    res.json(comments);
  })
  .catch(function(err){
    res.json(err);
  });
});
postRouter.get("/userComments/:iii", async (req, res) => {
  let usercomments = await Comment.find({userId: req.params.iii})
  .populate('postId') //TO GET SLUG
  .then(function(usercomments){
    res.json(usercomments);
  })
  .catch(function(err){
    res.json(err);
  });
});
postRouter.get("/userPosts/:userId", async (req, res) => {
  let userposts = await Post.find({userId: req.params.userId})

  .then(function(userposts){
    res.json(userposts);
  })
  .catch(function(err){
    res.json(err);
  });
});

postRouter.get("/userVotesUp/:iii", async (req, res) => {
  let upvotes = await Comment.find({upvotedby: req.params.iii})
  .populate('postId'); //TO GET SLUG FOR PROFILE/USERVOTESUP
  res.json(upvotes);
});
postRouter.get("/userVotesDown/:iii", async (req, res) => {
  let downvotes = await Comment.find({downvotedby: req.params.iii})
  .populate('postId'); //TO GET SLUG FOR PROFILE/USERVOTESDOWN
  res.json(downvotes);
});

postRouter.get("/", async (req, res) => {
  let posts = await Post.find({})
  .populate("userId")
  .populate('comments')
  res.json(posts);
});
postRouter.get("/:slug", async (req, res) => {
  let post = await Post.findOne({slug: req.params.slug})
  .populate("userId") //NECESSARY FOR POST PAGE TO RETRIEVE USERNAME
  //.populate('comments')
  res.json(post);
});


function registerPostSchema(req, res, next){
  const schema = Joi.object({
    post_title: Joi.string().required(),
    post_body: Joi.string().required(),
    category: Joi.string().required(),
    userName: Joi.string().required()
  });
  validateRequest(req, next, schema);
}
function registerPost(req, res, next) {
  postService.insertPost(req.body, req.get('origin'))
    .then(() => res.json({ message: 'success, your post was posted' }))
    .catch(next);
}
function registerCommentSchema(req, res, next){
  const schema = Joi.object({
    comment_body: Joi.string().required(),
    userName: Joi.string().required(),
    userId: Joi.string().required(),
    postId: Joi.string().required()
  });
  validateRequest(req, next, schema);
}
function registerComment(req, res, next){
  postService.insertComment(req.body, req.get("origin"))
    .then(() => res.json({message: 'your comments was received'}))
    .catch(next);
}
