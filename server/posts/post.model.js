const mongoose = require('mongoose');
const slugify = require('slugify');
const Comment = require('./comment.model');
const Account = require('../accounts/account.model');

const postSchema = new mongoose.Schema(
  {
    post_title: {type:String, unique:true, required:true},
    slug: {type:String, unique:true, required:true},
    post_body: {type:String, unique:true, required:true},
    category: {type:String, required:true},
    userId:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Account",
    }],
    comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment",
    }]
  },
  { timestamps: true}
);

postSchema.pre('validate', function(next) {
  if (this.post_title) {
    this.slug = slugify(this.post_title, { lower: true, strict: true })
  }
  next()
})

module.exports = mongoose.model("Post",postSchema);
