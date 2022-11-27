const express = require("express");
const Joi = require('joi');
const mongoose = require('mongoose');

// This is a user modal / user schema

const Candidate = mongoose.model('Candidate', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    job_title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 7,
        maxlength: 12
    },
    status: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    }
}));

exports.Candidate = Candidate;

