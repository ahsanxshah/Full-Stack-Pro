const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
// const companyy = require("./company");

// This is a user modal / user schema

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 7,
      maxlength: 12,
    },
    status: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    // one to one relationship
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  })
);

exports.Contact = Contact;
