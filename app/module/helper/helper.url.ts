export const relativeURL = (string_: string): string => string_.replace(/^(?:\/\/|[^/]+)*/, '');

export const fixRoute = (route: string): string => {
  let urlOriginal = /^(https?:)/.test(route) ? new URL(route).pathname : route;

  // fix redirect by remove trailing splash
  if (urlOriginal.endsWith('/')) {
    urlOriginal = urlOriginal.replace(/\/$/, '');
  }

  // const matches = route.match(/\[.+?(?=])./g);
  // if (matches) {
  //   for (const match of matches) {
  //     route = route.replace(match, match.replace('[', ':').replace(']', ''));
  //   }
  // }

  return route;
};

export const isStaticFilePath = (path: string) => {
  return path.match(/(\.\w+$)|@vite|@id|@react-refresh/);
};
