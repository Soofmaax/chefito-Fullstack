import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Health Endpoint', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: {
        status: 'OK',
        version: '1.0.0',
        database: 'Connected',
      },
    });

    expect(response.body.data.timestamp).toBeDefined();
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/api/unknown')
      .expect(404);

    expect(response.body).toMatchObject({
      success: false,
      error: 'Route /api/unknown non trouvée',
    });
  });
});