import { jest } from '@jest/globals'

// Mockar o middleware de autenticação para os testes (bypass)
jest.unstable_mockModule('../src/middlewares/authMiddleware.js', () => ({
  default: (req, res, next) => next(),
  isAdministrador: (req, res, next) => next()
}))

import request from 'supertest'

const { default: app } = await import('../src/app.js')

describe('Certificados - validação de endpoints', () => {
  test('GET /voluntarios/:id/certificados retorna 400 para id inválido', async () => {
    const res = await request(app)
      .get('/voluntarios/123/certificados')
      .set('Accept', 'application/json')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toMatch(/ID de voluntário inválido/i)
  })

  test('POST /voluntarios/:id/certificados retorna 400 quando horas inválidas', async () => {
    const idValido = '64a1b2c3d4e5f6a7b8c9d0e1'
    const res = await request(app)
      .post(`/voluntarios/${idValido}/certificados`)
      .send({ horas: 'abc' })
      .set('Accept', 'application/json')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toMatch(/Horas do certificado inválidas/i)
  })

  test('PUT /voluntarios/:id/certificados/:certificadoId valida certificadoId', async () => {
    const idValido = '64a1b2c3d4e5f6a7b8c9d0e1'
    const certificadoIdInvalido = '123'
    const res = await request(app)
      .put(`/voluntarios/${idValido}/certificados/${certificadoIdInvalido}`)
      .send({ horas: 10 })
      .set('Accept', 'application/json')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toMatch(/ID de certificado inválido/i)
  })

  test('DELETE /voluntarios/:id/certificados/:certificadoId valida certificadoId', async () => {
    const idValido = '64a1b2c3d4e5f6a7b8c9d0e1'
    const certificadoIdInvalido = 'abc'
    const res = await request(app)
      .delete(`/voluntarios/${idValido}/certificados/${certificadoIdInvalido}`)
      .set('Accept', 'application/json')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toMatch(/ID de certificado inválido/i)
  })
})
