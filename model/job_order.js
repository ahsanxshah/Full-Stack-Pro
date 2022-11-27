const express = require("express");
const Joi = require('joi');
const mongoose = require('mongoose');

// This is a user modal / user schema

const JobOrder = mongoose.model('JobOrder', new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    Description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    Status: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    Contact: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    Company: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    Priority: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
}));

exports.JobOrder = JobOrder;

