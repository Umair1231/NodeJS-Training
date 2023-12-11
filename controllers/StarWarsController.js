const axios = require('axios');
const constants = require('../Constants');
const starWars = require('../models/starWars')

const getStarWars = async (req, res) => {
  try
  {
    const items = await starWars.find()
    res.json(items)
  }
  catch(err)
  {
    res.status(500);
    console.log(err)
  }
}

const getOneStarWars = async (req, res) => {
  itemID = req.params.id
  oneItem = await starWars.findOne( { _id: itemID})
  if(oneItem)
  {
    res.json(oneItem)
  }
  res.status(404);
}

const postStarWars = async(req, res) => {
  const newItem = req.body;
  if(newItem)
  {
    const newStarWars = new starWars({
      name: newItem.name,
      birth_year: newItem.birth_year
    })

    await newStarWars.save()
    
    return res.status(201).json({ message: 'Added Successfully' });
  }
    return res.status(500).json({message: "Server Error"})
}

const putStarWars = async (req, res) => {
  const itemID = req.params.id;
  const updatedItem = req.body.name;
  const existingItem = await starWars.findById(itemID)
  if(!existingItem) {
    return res.status(404).json( { message: "Item not found" } )
  }
  const updatedEntry = await starWars.findByIdAndUpdate(
    itemID,
    {
      name: updatedItem
    },
    { new: true }
  )

  await updatedEntry.save()
  res.status(200).json( { message:"updated successfully" } )
}

const deleteStarWars = async (req, res) => {
  try
  {
    const itemID = req.params.id;
    await starWars.findByIdAndDelete(itemID)
    return res.status(204).json({ message: "Item deleted" });
  }
  catch(err)
  {
    console.log(err)
  }
}

module.exports = {
  getStarWars,
  putStarWars,
  postStarWars,
  deleteStarWars,
  getOneStarWars
}