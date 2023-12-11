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
  }
})


module.exports = mongoose.model('starWar', starWarsSchema)