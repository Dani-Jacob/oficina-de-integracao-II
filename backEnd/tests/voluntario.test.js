import { jest } from '@jest/globals'

// Mockar o middleware de autenticação para os testes (bypass)
// Deve ser feito antes de importar o `app` para que a rota use o mock
jest.unstable_mockModule('../src/middlewares/authMiddleware.js', () => ({
  default: (req, res, next) => next(),
  isAdministrador: (req, res, next) => next()
}))

import request from 'supertest'

const { default: app } = await import('../src/app.js')

describe('Voluntários - validação de endpoints', () => {
  test('POST /voluntarios deve retornar 400 quando campos obrigatórios estão ausentes', async () => {
    const res = await request(app)
      .post('/voluntarios')
      .send({})
      .set('Accept', 'application/json')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(Array.isArray(res.body.errors)).toBe(true)

    const mensagens = res.body.errors.map(e => e.msg)

    expect(mensagens).toEqual(expect.arrayContaining([
      expect.stringMatching(/O nome é obrigatório/i),
      expect.stringMatching(/O email é obrigatório/i)
    ]))
  })

  test('PUT /voluntarios/:id deve validar CPF quando presente', async () => {
    const idValido = '64a1b2c3d4e5f6a7b8c9d0e1'
    const res = await request(app)
      .put(`/voluntarios/${idValido}`)
      .send({ cpf: '123' })
      .set('Accept', 'application/json')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    const mensagens = res.body.errors.map(e => e.msg)
    expect(mensagens).toEqual(expect.arrayContaining([
      expect.stringMatching(/O CPF deve conter exatamente 11 dígitos numéricos/i)
    ]))
  })

    test('DELETE /voluntarios/:id retorna 400 para id inválido', async () => {
      const res = await request(app)
        .delete('/voluntarios/123')
        .set('Accept', 'application/json')

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toMatch(/ID de voluntário inválido/i)
    })
})
