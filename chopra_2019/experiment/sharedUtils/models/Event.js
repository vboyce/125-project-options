const mongoose = require('mongoose');

// A general object type 
const EventSchema = new mongoose.Schema({
    dbname: String,
    colname: String,
}, {
    strict: false
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
