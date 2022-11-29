const express = require("express");
const job_orderRoute = express();
const { User, validate } = require("../model/user_model");
const { celebrate, Joi, errors, Segments } = require("celebrate");
// Adding new job_order into mongo DATABASE (Atlas)
job_orderRoute.post(
  "/job_order",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().min(5).max(20).required(),
        description: Joi.string().email().lowercase().required(),
        status: Joi.string().min(10).max(100000).required(),
        contact: Joi.string().min(5).max(20).required(),
        company: Joi.string().min(5).max(20).required(),
        priority: Joi.string().min(5).max(20).required(),
      }),
    },
    { abortEarly: false }
  ),

  async (req, res) => {
    // Check if this job_order already exisits
    let job_order = await User.findOne({ email: req.body.email });
    if (job_order) {
      return res.status(400).send("That job_order already exisits!");
    } else {
      // Insert the new job_order if it do not exist yet
      job_order = new User({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        contact: req.body.contact,
        company: req.body.company,
        priority: req.body.priority,
      });
      await job_order.save();
      res.send(job_order);
    }
  }
);

module.exports = job_orderRoute;
