import { describe, expect, test } from '@jest/globals';
import { build } from '~/app/module/helper/helper.build.ts';

const app = build();
describe('base http routes', () => {
  test('GET:/ping', async () => {
    const response = await app.inject({
      url: '/ping',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBe('🏓 Pong!');
  });

  test('GET:/health', async () => {
    const response = await app.inject({
      url: '/health',
    });

    expect(response.statusCode).toEqual(200);
  });
});

