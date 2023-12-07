const axios = require('axios');


let items = [
  { name: 'Luke Skywalker', birth_year: '19BBY' },
  { name: 'C-3PO', birth_year: '112BBY' },
  { name: 'R2-D2', birth_year: '33BBY' },
  { name: 'Darth Vader', birth_year: '41.9BBY' },
  { name: 'Leia Organa', birth_year: '19BBY' },
  { name: 'Owen Lars', birth_year: '52BBY' },
  { name: 'Beru Whitesun lars', birth_year: '47BBY' },
  { name: 'R5-D4', birth_year: 'unknown' },
  { name: 'Biggs Darklighter', birth_year: '24BBY' },
  { name: 'Obi-Wan Kenobi', birth_year: '57BBY' }
]


const getStarWars = async (req, res) => {
  try
  {
    res.json(items)
  }
  catch(err)
  {
    res.status(500);
    console.log(err)
  }
}

const getOneStarWars = async (req, res) => {
  itemName = req.params.name
  oneItem = items.find(item => { item.name === itemName})
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
    items.push(newItem);
    return res.status(201).json({ message: 'Added Successfully' });
  }
    return res.status(500).json({message: "Server Error"})
}

const putStarWars = async (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body.name;
  let itemUpdated = false
  items.forEach(( item, index) => {
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
  items = items.filter( item => item.name !== itemName)
  return res.status(204).json({ message: "Item deleted" });
}

module.exports = {
  getStarWars,
  putStarWars,
  postStarWars,
  deleteStarWars,
  getOneStarWars
}