const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const isAdmin = require("../middleware/isAdmin");

router.get('/', (req,res) => {
    const Admin = req.session.user.isAdmin
    Recipe.find()
    .then(recipe => 
    res.render('recipes/recipes-list', {recipe, Admin}))
    .catch( Err => console.error(Err))
})

router.get('/new-recipes', isAdmin, (req,res) => {
    const user=req.session.user;
    res.render('recipes/new-recipes', {user})
    // .catch( Err => console.error(Err));
})

router.post('/new-recipes', isAdmin, (req,res) => {
    const {title, level, ingredients, dishtype, image, duration} = req.body;
    Recipe.create({title, level, ingredients, dishtype, image, duration})
    .then(() => res.redirect('/recipes/recipes-list'))
    .catch(Err => console.error(Err))
})

router.get('/recipe-edit:id', isAdmin, (req,res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.render('recipes/recipe-edit', recipe))
    .catch(Err => console.error(Err))
})

router.post('/recipe-edit:id', isAdmin, (req,res) => {
    const {title, level, ingredients, dishtype, image, duration} = req.body;
    Recipe.findByIdAndUpdate(req.params.id, {title, level, ingredients, dishtype, image, duration})
    .then(() => res.redirect('/recipes/recipes-list'))
    .catch(Err => console.error(Err))
})

router.post('/recipe-delete:id', isAdmin,(req,res)=> {
    Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/recipes/recipes-list'))
    .catch(Err => console.error(Err))
})

module.exports = router;