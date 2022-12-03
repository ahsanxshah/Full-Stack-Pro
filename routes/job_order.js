const express = require("express");
const job_orderRoute = express();
const { User, validate } = require("../model/user_model");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { JobOrder } = require("../model/job_order");
const { Contact } = require("../model/contact");
// Adding new job_order into mongo DATABASE (Atlas)
job_orderRoute.post(
  "/job_order/:_id",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().min(5).max(25).required(),
        description: Joi.string().required(),
        status: Joi.string().min(2).max(20).required(),
        company: Joi.string().min(5).max(9999999).required(),
        contact: Joi.string(),
        priority: Joi.string().min(2).max(20).required(),
      }),
    },
    { abortEarly: false }
  ),

  async (req, res) => {
    // Check if this job_order already exisits
    let job_order = await JobOrder.findOne({ title: req.body.title });
    if (job_order) {
      return res.status(400).send("That job_order already exisits!");
    } else {
      // Insert the new job_order if it do not exist yet
      let contactfound = await Contact.find({
        company_id: req.params.company_id,
      });

      console.log(contactfound);
      job_order = new JobOrder({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        company: req.body.company,
        contact: contactfound,
        priority: req.body.priority,
      });
      await job_order.save();
      res.send(job_order);
    }
  }
);

/// GET Request
job_orderRoute.get("/job_order", async (req, res) => {
  // Check if this user already exisits
  let job_order = await JobOrder.findOne({ title: req.body.title }).populate({
    path: "company",
    populate: {
      path: "users",
      // model: "Component",
    },
  });

  if (job_order) {
    return res.send(job_order);
  } else {
    return res.status(400).send(errors);
  }
});

module.exports = job_orderRoute;
