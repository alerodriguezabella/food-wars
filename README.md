# Food Wars
Click [here](http://food-wars-ironhack.herokuapp.com/) to see the deployed app

## Description
Brief description of the project:

*Food Wars* is a recipe blog app where you'll find different and delicious recipes. A food related quote, chosen randomly, will appear every time you go to the home page, setting the mood for your cooking. If you are logged in, you will also be able to check the comments and scores of each recipe. 

A bit more information about the three available ranks:
- Admin: able to add, edit and delete the available recipes; able to add comments; able to edit and delete comments added by them
- User: able to see the available recipes; able to add comments; able to edit and delete comments added by them 
- Guest: able to see the available recipes


## Backlog
List of implemented features after the MVP:

- Use of external API (views/index.hbs)
    - Use of external API (*food quote of the day*)
    - [API used](https://api-ninjas.com/api/quotes)
- Login (views/auth/login.hbs)
    - Social media login (Google)
- Style (public/stylesheets/style.css)
    - Bootstrap implementation 
- Recipe page (views/recipes/recipe-list.hbs)
    - Search bar
    - Filter
- CRUD recipes (views/recipes/edit-recipe.hbs & views/recipes/new-recipe.hbs)
    - File upload with Cloudinary
- Models
    - Use of more than two models

## Routes

#### Auth
- GET /
    - Renders the homepage

- GET /auth/signup

    - Redirects to / if user logged in
    - Renders the signup form 

- POST /auth/signup
    - Redirects to / if user logged in
    - Body:
        - username
        - email
        - password

- GET /auth/login
    - Redirects to / if user logged in
    - Renders the login form 

- POST /auth/login
    - Redirects to / if user logged in
    - Body:
        username
        password

- POST /auth/logout
    - Redirects to /
    - Body: (empty)

- GET /auth/profile/:id
    - Renders /profile if user is logged in

#### Comments
- GET /comments-list/:id
    - Renders /comments/comments-list if user is logged in

- POST /comment-new/:id
    - Redirects to /comments/comments-list if user is logged in
    - Body:
        - comment
        - rate

- GET /comment-edit/:id
    - Renders /comments/comment-edit if you are the user who wrote the comment
    - Renders /comments/comments-list if you did not write the comment

- POST /comment-edit/:id
    - Redirects to /comments/comments-list
    - Body:
        - comment
        - rate

- POST /comment-delete:id
    - Redirects to /recipes/recipe-list (possible only if you wrote the comment)

#### Same principal for Google, Index and Recipe routes

## Models
- User model
```
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    googleId: {
      type: String,},
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type:String },
    isAdmin: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);
```

- Recipe model
```
const recipeSchema = new Schema({
    title: { type: String, required: true },
    level: { type: String, enum: ["Easy", "Medium", "Hard"] },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    dishType: { type: String, enum: ["Breakfast", "Lunch", "Snack", "Dinner", "Dessert", "Other"] },
    image: { type: String },
    duration: { type: Number, min: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
  );
  ```

- Comment model 
```
const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, maxlength: 500 },
    rate: {type:String}
  },
  { timestamps: true }
  );
```

## Links
- [Slides link](https://docs.google.com/presentation/d/1URDTppHS15OoqX4GZJir0E7xMJVKYbRotkACVFyiYxg/edit#slide=id.p6)
- [Github repository link](https://github.com/alerodriguezabella/food-wars.git)
- [Deployment link](http://food-wars-ironhack.herokuapp.com/)