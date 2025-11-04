import request from 'supertest'
import app from '../src/app.js'

describe('Autenticação - POST /login/token', () => {
  test('retorna 401 quando email e senha não são informados', async () => {
    const res = await request(app)
      .post('/login/token')
      .send({})
      .set('Accept', 'application/json')

    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toMatch(/Email e senha são obrigatórios/i)
  })
})
