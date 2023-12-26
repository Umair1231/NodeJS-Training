const request = require('supertest')
const app = require('./expressApp')


describe('StarWars', () => {
  it('GET /starwars -> array starwars', async () => {
    return await request(app.serv)
    .get('/starwars')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .then( response => {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            birth_year: expect.any(String)
          })
        ])
      )
    })
  })

  it('POST /starwars -> created starwars', async () => {
    return await request(app.serv)
    .post('/starwars')
    .send({
      name: "damn",
      birth_year: "today"
    })
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(201)
    .then( response => {
      expect(response.body).toEqual(
        expect.objectContaining({
          message: expect.any(String)
        })
      )
    })
  })

  it('DELETE /starwars -> specific starwars deleted', async () => {
    return await request(app.serv)
    .delete('/starwars/65799b7b71544c4c4fe4187f')
    .expect(204)
    
  })
})
