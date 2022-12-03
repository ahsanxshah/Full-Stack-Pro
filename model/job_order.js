const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");

// This is a user modal / user schema

const JobOrder = mongoose.model(
  "JobOrder",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1000,
    },
    status: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    // one to one relationship
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    // // one to one relationship
    contact: {
      type: mongoose.Schema.Types.Object,
      ref: "Contact",
    },
    priority: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
  })
);

exports.JobOrder = JobOrder;
