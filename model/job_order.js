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
      maxlength: 255,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    contact: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    company: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    priority: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

exports.JobOrder = JobOrder;
