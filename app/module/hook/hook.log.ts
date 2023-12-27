import isbot from 'isbot';

export const onRequestLog = (request: any, response: any, next: () => void) => {
  request.startTime = Date.now();
  request.log.info({
    url: request.raw.url,
    id: request.id,
    isBot: isbot(request.raw.headers['user-agent']),
  }, '');
  next();
};

export const onResponseLog = (request: any, response: any, next: () => void) => {
  request.log.info({
    url: request.raw.url, // add url to response as well for simple correlating
    statusCode: response.raw.statusCode,
    durationMs: Date.now() - response.startTime,
  }, '');
  next();
};