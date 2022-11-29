const express = require("express");
const candidateRoute = express();
const { Candidate, validate } = require("../model/candidate");
const { celebrate, Joi, errors, Segments } = require("celebrate");

// Adding a new candidate into mongo DATABASE (Atlas)
candidateRoute.post(
  "/candidate",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(5).max(20).required(),
        job_title: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        phone: Joi.number().min(7).less(9999999999).required(),
        status: Joi.string().min(5).max(20).required(),
      }),
    },
    { abortEarly: false }
  ),

  async (req, res) => {
    // Check if this user already exisits
    let candidate = await Candidate.findOne({ email: req.body.email });
    if (candidate) {
      return res
        .status(400)
        .send("That candidate with this email already exisits!");
    } else {
      // Insert the new user if they do not exist yet
      candidate = new Candidate({
        name: req.body.name,
        job_title: req.body.job_title,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
      });
      await candidate.save();
      res.send(candidate);
    }
  }
);

module.exports = candidateRoute;
