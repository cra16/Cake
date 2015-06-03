/**
 * Created by graceyang on 15. 6. 3..
 */


'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'New CAKE Project',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        //type: String,
        type: Object,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Project', ProjectSchema);
