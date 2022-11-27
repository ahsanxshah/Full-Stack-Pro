const express = require("express");
const { string } = require("joi");
const Joi = require('joi');
const mongoose = require('mongoose');

// This is a user modal / user schema

const Company = mongoose.model('Company', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    // one to one relationship
    contact: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    status: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    phone : {
        type: Number,
        required: true,
        minlength: 7,
        maxlength: 12
    },
    social_media: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    website: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
}));

exports.Company = Company;

