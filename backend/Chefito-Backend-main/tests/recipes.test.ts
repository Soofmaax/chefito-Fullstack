import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Recipe Endpoints', () => {
  it('should get list of recipes', async () => {
    const response = await request(app)
      .get('/api/recipes')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should get a specific recipe', async () => {
    const response = await request(app)
      .get('/api/recipes/pizza-margherita')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: 'pizza-margherita',
      title: expect.any(String),
      cuisine: expect.any(String),
    });
  });

  it('should return 404 for non-existent recipe', async () => {
    const response = await request(app)
      .get('/api/recipes/non-existent')
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Recipe not found');
  });

  it('should get recipe variants', async () => {
    const response = await request(app)
      .get('/api/recipes/pizza-margherita/variants')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should record recipe view without auth', async () => {
    const response = await request(app)
      .post('/api/recipes/view')
      .send({ recipeId: 'pizza-margherita' })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Recipe view recorded successfully');
  });

  it('should validate recipe view request', async () => {
    const response = await request(app)
      .post('/api/recipes/view')
      .send({}) // Missing recipeId
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Données invalides');
  });
});