const now = () => Date.now();
export const onRequestLog = (request: any, response: any, next: () => void) => {
  request.startTime = now();
  request.log.info({
    url: request.raw.url,
    id: request.id,
  }, 'RECEIVED');
  next();
};

export const onResponseLog = (request: any, response: any, next: () => void) => {
  request.log.info({
    url: request.raw.url, // add url to response as well for simple correlating
    statusCode: response.raw.statusCode,
    durationMs: now() - response.startTime,
  }, 'COMPLETED');
  next();
};