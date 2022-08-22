const router = require("express").Router();
const axios = require('axios')

/* GET home page */
router.get("/", (req, res, next) => {
  axios.get('https://api.api-ninjas.com/v1/quotes?category=food', {
    headers: {
      'X-Api-Key': process.env.YOUR_API_KEY
    }
  })
  .then((response) => {
    console.log(response.data)
    const user=req.session.user;
    res.render("index", {user, quote: response.data[0]});
  }) 
  .catch(err => console.error(err))
});

module.exports = router;
