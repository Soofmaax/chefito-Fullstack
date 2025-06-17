import { beforeAll, afterAll } from 'vitest';
import { logger } from '../src/config/logger';

// Disable logging during tests
beforeAll(() => {
  logger.level = 'silent';
});

afterAll(() => {
  // Cleanup if needed
});