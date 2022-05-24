const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const messageSchema = new Schema({
  receiver: { type: String, required: true},
  msgs:[
    {
        textM:String,
        timeM:String,
        typeM:String
    }
  ],
  sender: String
}, { collection : 'message' });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;