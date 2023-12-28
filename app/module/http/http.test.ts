import { afterAll, beforeAll, describe, expect, it, test } from '@jest/globals';
import { fastifyPlugin }                                   from 'fastify-plugin';
import { build }                                           from '~/app/module/helper/helper.build.ts';

const {
  app,
  scopedModule,
} = await build();
describe('base http routes', () => {

  beforeAll(async () => {
    void app.register(fastifyPlugin(scopedModule));
  });

  afterAll(() => app.close());

  it('should be async', async () => {
    test('HAS GET:/ping', () => {
      const has = app.hasRoute({
        method: 'GET',
        url: '/ping',
      });

      expect(has).toBe(true);
    });

    test('GET:/ping', () => {
      app.inject({
        url: '/ping',
      }).then((response) => {
        expect(response.statusCode).toEqual(200);
      });
    });

    test('GET:/health', () => {
      app.inject({
        url: '/health',
      }).then((response) => {
        expect(response.statusCode).toEqual(200);
      });
    });
  });
});
