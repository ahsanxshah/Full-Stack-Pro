const express = require("express");
const userRoute = express();
const { User, validate } = require("../model/user_model");
const { celebrate, Joi, errors, Segments } = require("celebrate");
// userRoute.post("/user" ,async (req,res) => {
  
// // Check if this user already exisits
// let user = await User.findOne({ email: req.body.email });
// if (user) {
//     return res.status(400).send('That user already exisits!');
// } else {
//     // Insert the new user if they do not exist yet
//     user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     await user.save();
//     res.send(user);
// }
// })



// Registering USER into mongo DATABASE (Atlas)
userRoute.post(
    "/register",
    celebrate(
      {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().min(5).max(20).required(),
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().min(10).max(100000).required(),
        }),
      },
      { abortEarly: false }
    ),
  
    async (req, res) => {
   // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
    }
  );

module.exports = userRoute;

