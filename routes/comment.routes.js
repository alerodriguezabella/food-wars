const router = require("express").Router();
const Comment = require("../models/Comment.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Recipe = require("../models/Recipe.model");
const User = require("../models/Comment.model")

router.get('/comments-list/:id', isLoggedIn, (req,res) =>{
    const currentuser = req.session.user;
    Recipe.findById(req.params.id)
    .populate('comments')
		.populate({
			path: 'comments',
			populate: {
				path: 'user'
			}
		})
    .then( recipe => { console.log(recipe.comments)
        res.render('comments/comments-list', {recipe, currentuser})})
    .catch( Err => console.error(Err))
})

router.post('/comment-new/:id', (req,res) => {
    const id = req.params.id;
    const userid = req.session.user._id;
    const {comment, rate} = req.body;
    Comment.create({user: userid, comment, rate})
    .then( comment => Recipe.findByIdAndUpdate(
        id, {$push: {comments: comment._id.toString()}}
    ))
    .then(()=>res.redirect('/comments/comments-list/'+id))
    .catch( Err => console.error(Err))
})

router.get('/comment-edit/:id', (req,res)=>{
    Comment.findById(req.params.id)
    .populate('user')
    .then( comment => {
        if(req.session.user._id===comment.user._id.toString()){
            res.render('comments/comment-edit', comment)
        }else{
            res.render('comments/comment-edit', {
                errorMessage: 'You are not the owner of this comment.'})
        }
    })
    .catch( Err => console.error(Err))
})

router.post('/comment-edit/:id', (req,res) => {
    const {comment, rate} = req.body;
    Comment.findByIdAndUpdate(req.params.id, {comment, rate})
    // try to redirect to /comment-edit/:id
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch( Err => console.error(Err))
})

router.post('/comment-delete:id', isLoggedIn,(req, res, next) => {

    Comment.findById(req.params.id)
    .then( comment => {
        if(req.session.user._id===comment.user._id.toString()){
        Comment.findByIdAndDelete(req.params.id)
        .then(()=>res.redirect('/recipes/recipe-list'))
        }else{
            res.render('/recipes/recipes-list', {
                errorMessage: 'You are not the owner of this comment.'
              })
        }
    })
    .catch( (err) => next(err));
  })

module.exports = router;