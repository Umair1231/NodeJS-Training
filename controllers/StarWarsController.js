const axios = require('axios');
const constants = require('../Constants');

const getStarWars = async (req, res) => {
  try
  {
    res.json(constants.items)
  }
  catch(err)
  {
    res.status(500);
    console.log(err)
  }
}

const getOneStarWars = async (req, res) => {
  itemName = req.params.name
  oneItem = constants.items.find(item => { item.name === itemName})
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
    constants.items.push(newItem);
    return res.status(201).json({ message: 'Added Successfully' });
  }
    return res.status(500).json({message: "Server Error"})
}

const putStarWars = async (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body.name;
  let itemUpdated = false
  constants.items.forEach(( item, index) => {
    if(item.name === itemName)
    {
      item.name = updatedItem;
      itemUpdated = true;
      return res.status(201).json({ message: "Item updated" });
    }
  })
  if(!itemUpdated)
  {
    return res.status(404).json({ message: "Item not found" });
  }
}

const deleteStarWars = async (req, res) => {
  const itemName = req.params.name;
  constants.items = constants.items.filter( item => item.name !== itemName)
  return res.status(204).json({ message: "Item deleted" });
}

module.exports = {
  getStarWars,
  putStarWars,
  postStarWars,
  deleteStarWars,
  getOneStarWars
}