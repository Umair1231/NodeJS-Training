const mongoose = require('mongoose');
const starWars = require('./starWars')


const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

userSchema.post('save', async function(doc) {
  try
  {
    const newStarWars = new starWars({
      name: "Luke Skywalker",
      birth_year: "19BBY",
      imagePath: "1703153060876.png",
      email: doc.email
    })
    const newStarWars2 = new starWars({
      name: "C-3PO",
      birth_year: "112BBY",
      imagePath: "1703153060876.png",
      email: doc.email
    })

    await newStarWars.save()
    await newStarWars2.save()
  }
  catch(err)
  {
    console.log(err)
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;