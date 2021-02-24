const mongoose = require("mongoose");

const User = mongoose.model(
    
    'User',
     new mongoose.Schema({ 
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        }, 
        first_name: {
            type: String,
            required: false,
            min: 6,
            max: 255,
        },
        last_name: {
            type: String,
            required: false,
            min: 6,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        motivation_letter: {
            type: String,
            required: false,
            min: 6,
            max: 3000,
        },
        cv: {
            type: String,
            required: false,
            default: "none",
            min: 6,
            max: 1024,
        },
        date: {
            type: Date,
            default: Date.now,
        }

    }));

module.exports = User;
