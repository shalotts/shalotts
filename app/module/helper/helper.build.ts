import Fastify from 'fastify';

export const build = async () => {
  const app = Fastify();

  beforeAll(async () => {
    void app.server
  });

  afterAll(() => app.close());

  return app;
}