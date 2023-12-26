const express = require('express');
const fs = require('fs').promises;
const constants = require('./Constants');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors());


app.get('/json', async (req, res) => {
  try
  {
    const data = await fs.readFile(constants.JSON_FILE_PATH, 'utf-8')
    console.log(JSON.parse(data))
    res.json(JSON.parse(data))
  }
  catch(err)
  {
    console.log(err)
  } 
})

app.post('/json', async (req, res) => {
  try
  {
    const newData = req.body
    const data = await fs.readFile(constants.JSON_FILE_PATH, 'utf-8')
    const dataArray = JSON.parse(data)
    dataArray.push(newData)
    await fs.writeFile(constants.JSON_FILE_PATH, JSON.stringify(dataArray, null, 2))
    res.json({ message: "Added Sucessfully" })
  }
  catch(err)
  {
    console.log(err)
  }
})

app.put('/json/:id', async (req, res) => {
  try
  {
    const itemID = req.params.id;
    const newData = req.body
    const data = await fs.readFile(constants.JSON_FILE_PATH, 'utf-8')
    let dataArray = JSON.parse(data)
    dataArray = dataArray.map(item => (item.id === parseInt(itemID) ? { ...item, ...newData } : item));
    await fs.writeFile(constants.JSON_FILE_PATH, JSON.stringify(dataArray, null, 2))
    res.json({ message: "Changed Successfully" })
  }
  catch(err)
  {
    console.log(err)
  }
})

app.delete('/json/:id', async (req, res) => {
  try
  {
    const itemID = req.params.id
    const data = await fs.readFile(constants.JSON_FILE_PATH, 'utf-8')
    let dataArray = JSON.parse(data)
    dataArray = dataArray.filter(item => item.id !== parseInt(itemID))
    await fs.writeFile(constants.JSON_FILE_PATH, JSON.stringify(dataArray, null, 2));
    res.json({ message: 'Data deleted successfully.' });
  }
  catch(err)
  {
    console.log(err)
  }
})



app.listen(constants.PORT_NUMBER, () => {
  console.log(`Server is running on port ${constants.PORT_NUMBER}`);
});