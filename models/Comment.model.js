const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, maxlength: 500 },
    rate: {type:Number}
  },
  { timestamps: true }
  );

const Comment = model("Comment", commentSchema);

module.exports = Comment;