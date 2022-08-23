const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const isAdmin = require("../middleware/isAdmin");
const fileUploader = require('../config/cloudinary.config');

router.get('/recipe-list', (req,res) => {
    const user = req.session.user;
    const {level, dishType, title} = req.query;
    let filter = {title: { $regex: '.*' + (title || "") + '.*', $options: 'i' }}
    if(dishType){
        filter.dishType = dishType
    }
    if(level){
        filter.level = level
    }
    Recipe.find(
        filter
    )
    .then(recipe =>{
    res.render('recipes/recipe-list', {recipe, user})})
    .catch( Err => console.error(Err))
})

// router.get('/recipe-list-search', (req,res) => {
//     const user = req.session.user;
//     const {title} = req.query;
   
//     Recipe.find(
//         {title: { $regex: '.*' + title + '.*', $options: 'i' }},
//     )
//     .then(recipe =>{ 
//     res.render('recipes/recipe-list', {recipe, user})})
//     .catch( Err => console.error(Err))
// })

router.get('/new-recipe', isAdmin, (req,res) => {
    const user=req.session.user;
    res.render('recipes/new-recipe', {user})
    // .catch( Err => console.error(Err));
})

router.post('/new-recipe', isAdmin, fileUploader.single('image'), (req,res) => {
    let imageDef = req.file === undefined ? 'https://images.unsplash.com/photo-1628209694088-9aa9ac1c6463?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80' : req.file.path  
    const {title, level, ingredients, instructions, dishType, image, duration} = req.body;
    Recipe.create({title, level, ingredients: ingredients.split(';'), instructions: instructions.split(';'), dishType, image: imageDef, duration})
    .then(() => {
        res.redirect('/recipes/recipe-list')
        // console.log(req.file)
    })
    .catch(Err => console.error(Err))
})

router.get('/edit-recipe/:id', isAdmin, (req,res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.render('recipes/edit-recipe', recipe))
    .catch(Err => console.error(Err))
})

router.post('/edit-recipe/:id', isAdmin, fileUploader.single('image'), (req,res) => {
    const {title, level, ingredients, instructions, dishType, image, duration, existingImage} = req.body;
    let imageDef;
    if(req.file){
        imageDef = req.file.path
    } else {
        imageDef = existingImage
    }

    Recipe.findByIdAndUpdate(req.params.id, {title, level, ingredients: ingredients.split(';'), instructions: instructions.split(';'), dishType, image: imageDef, duration})
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch(Err => console.error(Err))
})

router.post('/delete-recipe/:id', isAdmin,(req,res)=> {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/recipes/recipe-list'))
    .catch(Err => console.error(Err))
})

module.exports = router;