const PORT_NUMBER = 3000

const FRONTEND_IP = 'http://localhost:5173/'

const items = [
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

const DATABASE_URL = 'mongodb://127.0.0.1:27017/nodeTrainingDatabase'

const JSON_FILE_PATH = './data.json'


module.exports = {
  PORT_NUMBER,
  FRONTEND_IP,
  items,
  JSON_FILE_PATH,
  DATABASE_URL
}