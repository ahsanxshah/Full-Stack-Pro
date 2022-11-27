const express = require("express");
const company = express();
const { Company, validate } = require("../model/company");
const { celebrate, Joi, errors, Segments } = require("celebrate");

// Registering USER into mongo DATABASE (Atlas)
company.post(
    "/company",
    celebrate(
      {
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().min(5).max(50).required(),
          status: Joi.string().required(),
          phone: Joi.string().min(10).max(99999999).required(),
          social_media: Joi.string().min(5).max(55).required(),
          website: Joi.string().min(5).max(55).required(),
        }),
      },
      { abortEarly: false }
    ),
  
    async (req, res) => {
   // Check if this user already exisits
    let company = await Company.findOne({ name: req.body.name });
    if (company) {
        return res.status(400).send('That company already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        company = new Company({
            name: req.body.name,
            status: req.body.status,
            phone: req.body.phone,
            social_media: req.body.social_media,
            website: req.body.website
          });
        await company.save();
        res.send(company);
    }
    }
  );

module.exports = company;

