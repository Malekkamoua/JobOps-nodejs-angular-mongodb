const mongoose = require("mongoose");
var SchemaTypes = mongoose.Schema.Types;
const UserSearch = mongoose.model(
    'UserSearch',
    new mongoose.Schema({
        
        keywords: [{
            type: String,
            required: true,
            min: 6,
            max: 1024,
        }],
        search_text: {
            type: String,
            required: true
        },
        job_count: {
            type: SchemaTypes.Number,
            required: true,
            default: 0
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: Date,
            default: Date.now,
        },

    }));

module.exports = UserSearch;