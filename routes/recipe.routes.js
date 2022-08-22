const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const isAdmin = require("../middleware/isAdmin");

router.get('/recipe-list', (req,res) => {
    const user = req.session.user
    Recipe.find()
    .then(recipe => 
    res.render('recipes/recipes-list', {recipe, user}))
    // res.render('recipes/recipe-list', {recipe}))
    .catch( Err => console.error(Err))
})

router.get('/new-recipe', isAdmin, (req,res) => {
    const user=req.session.user;
    res.render('recipes/new-recipe', {user})
    // .catch( Err => console.error(Err));
})

router.post('/new-recipe', isAdmin, (req,res) => {
    const {title, level, ingredients, instructions, dishType, image, duration} = req.body;
    Recipe.create({title, level, ingredients, instructions, dishType, image, duration})
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch(Err => console.error(Err))
})

router.get('/edit-recipe/:id', isAdmin, (req,res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.render('recipes/edit-recipe', recipe))
    .catch(Err => console.error(Err))
})

router.post('/edit-recipe/:id', isAdmin, (req,res) => {
    const {title, level, ingredients, instructions, dishType, image, duration} = req.body;
    Recipe.findByIdAndUpdate(req.params.id, {title, level, ingredients, instructions, dishType, image, duration})
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch(Err => console.error(Err))
})

router.post('/recipe-delete/:id', isAdmin,(req,res)=> {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch(Err => console.error(Err))
})

module.exports = router;