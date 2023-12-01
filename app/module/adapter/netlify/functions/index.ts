import { App } from '~/app/http';

export default async (request: Request) => {
  return App.fetch(request);
};
