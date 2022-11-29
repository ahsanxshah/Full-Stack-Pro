const express = require("express");
const contactRoute = express();
const { Contact, validate } = require("../model/contact");
const { celebrate, Joi, errors, Segments } = require("celebrate");

// Registering USER into mongo DATABASE (Atlas)
contactRoute.post(
  "/contact",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().lowercase().required(),
        phone: Joi.string().min(10).max(100000).required(),
        status: Joi.string().min(5).max(20).required(),
        company_id: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),

  async (req, res) => {
    // Check if this user already exisits
    let contact = await Contact.findOne({ email: req.body.email });
    if (contact) {
      return res.status(400).send("That contact already exists!");
    } else {
      // Insert the new contact if they do not exist yet
      contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        company_id: req.body.company_id,
      });
      await contact.save();
      res.send(contact);
    }
  }
);

module.exports = contactRoute;
