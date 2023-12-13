import app from '~/app/http';

export default async (request: Request) => {
  return app.fetch(request);
};
