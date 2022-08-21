const express = require('express');
const Recipe = require('../models/Recipe.model')
const router = express.Router();

router.get('/recipes', (req, res) => {
  Recipe.find()
    .then((recipes) => {
      // console.log(drones)
      res.render('recipes/list', {recipes})
    })
    .catch((err) => {
      console.log(err)
  })
});

// Adapt code

// router.get('/drones/create', (req, res) => {
//       res.render('drones/create-form')
// });

// router.post('/drones/create', (req, res) => {
//   const { name, propellers, maxSpeed } = req.body;

//   Drone.create({ name, propellers, maxSpeed })
//     .then(() => res.redirect("/"))
//     .catch((error) => `Error while creating a drone: ${error}`);
// });

// router.get('/drones/:id/edit', (req, res) => {
//   const { id } = req.params

//   Drone.findById(id)
//     .then((droneToEdit) => res.render('drones/update-form', droneToEdit))
//     .catch((error) =>
//         console.log("Error while updating the drone: ", error)
//     );
// });

// router.post('/drones/:id/edit', (req, res) => {
//   const {id} = req.params
//   const {name, propellers, maxSpeed} = req.body

//   Drone.findByIdAndUpdate(
//     id,
//     {name, propellers, maxSpeed},
//     {new: true}
//   )
//     .then(() => res.redirect('/drones'))
//     .catch((error) =>
//         console.log(`Error while updating a single book: ${error}`)
//     );
// });

// router.post('/drones/:id/delete', (req, res) => {
//    const {id} = req.params

//    Drone.findByIdAndDelete(id)
//      .then(() => res.redirect("/"))
//      .catch((error) => console.log(`Error while deleting a drone: ${error}`));

// });

module.exports = router;