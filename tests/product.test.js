const request = require('supertest');
const app = require('../server'); // Asumiendo que exportas app desde server.js

describe('Productos API', () => {
  it('Debería obtener todos los productos', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Debería crear un nuevo producto', async () => {
    const product = {
      name: 'Producto de prueba',
      description: 'Descripción de prueba',
      price: 100,
    };

    const response = await request(app)
      .post('/api/products')
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(product.name);
  });
});
