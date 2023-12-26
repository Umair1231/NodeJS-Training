const mongoose = require('mongoose');


const starWarsSchema = new mongoose.Schema({
  characterID: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    required: true
  },

  birth_year: {
    type: String,
    required: true
  },

  imagePath: {
    type: String,
    required: true
  },

  email: {
    type: String,
    ref: 'User',
    required: true
  }
})


module.exports = mongoose.model('starWar', starWarsSchema)