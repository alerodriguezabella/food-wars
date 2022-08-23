const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const isAdmin = require("../middleware/isAdmin");

router.get('/recipe-list', (req,res) => {
    const user = req.session.user;
    const {level, dishType} = req.query;
    let filter = null;
    if(!level && dishType){
        filter = {dishType: dishType}
    }else if(level && !dishType){
        filter = {level: level}
    }else if(level && dishType) {
        filter = {level: level, dishType: dishType}
    }
    Recipe.find(
        filter
    )
    .then(recipe =>{
    res.render('recipes/recipe-list', {recipe, user})})
    .catch( Err => console.error(Err))
})

router.get('/recipe-list-search', (req,res) => {
    const user = req.session.user;
    const {title} = req.query;
    Recipe.find(
        {title: title}
    )
    .then(recipe =>{
    res.render('recipes/recipe-list', {recipe, user})})
    .catch( Err => console.error(Err))
})

router.get('/new-recipe', isAdmin, (req,res) => {
    const user=req.session.user;
    res.render('recipes/new-recipe', {user})
    // .catch( Err => console.error(Err));
})

router.post('/new-recipe', isAdmin, (req,res) => {
    const {title, level, ingredients, instructions, dishType, image, duration} = req.body;
    Recipe.create({title, level, ingredients: ingredients.split(';'), instructions: instructions.split(';'), dishType, image, duration})
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
    Recipe.findByIdAndUpdate(req.params.id, {title, level, ingredients: ingredients.split(';'), instructions: instructions.split(';'), dishType, image, duration})
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch(Err => console.error(Err))
})

router.post('/delete-recipe/:id', isAdmin,(req,res)=> {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch(Err => console.error(Err))
})

module.exports = router;