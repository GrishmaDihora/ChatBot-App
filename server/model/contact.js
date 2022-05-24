const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const contactSchema = new Schema({
  author : {type: String, required: true},
  receiver: [
    {
      nameR:String
    }
  ]  
}, { collection : 'contact' });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;