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
  try
  {
    oneItem = await starWars.findOne( { _id: itemID})
    if(oneItem)
    {
      res.status(201).json(oneItem)
    }
    res.status(404).json( { message: "Item not found" } );
  }
  catch(err)
  {
    res.status(500).json( { message: "Server Error" } )
  }
}

const postStarWars = async(req, res) => {
  const newItem = req.body;
  try
  {
    if(newItem)
    {
      const newStarWars = new starWars({
        name: newItem.name,
        birth_year: newItem.birth_year
      })

      await newStarWars.save()
      
      return res.status(201).json({ message: 'Added Successfully' });
    }
    return res.status(400).json({ message: 'Bad Request' });
  }
  catch(err)
  {
    return res.status(500).json({message: "Server Error"})
  }
}

const putStarWars = async (req, res) => {
  const itemID = req.params.id;
  const updatedItem = req.body.name;
  try
  {
    const existingItem = await starWars.findById(itemID)
    if(existingItem) {
      const updatedEntry = await starWars.findByIdAndUpdate(
        itemID,
        {
          name: updatedItem
        },
        { new: true }
      )
      await updatedEntry.save()
      res.status(200).json( { message:"Updated successfully" } )
    }
    return res.status(404).json( { message: "Item not found" } )
  }
  catch(err)
  {
    res.status(500).json( { message: "Server Error" } )
  }
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
    return res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getStarWars,
  putStarWars,
  postStarWars,
  deleteStarWars,
  getOneStarWars
}