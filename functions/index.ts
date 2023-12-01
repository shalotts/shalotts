import { Handler } from '@netlify/functions';
import { renderPage } from 'vike/server';

export const handler: Handler = async event => {
  const pageContextInit = { urlOriginal: event.rawUrl };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  if (httpResponse) {
    console.log(httpResponse.statusCode, event.rawUrl);

    return {
      statusCode: httpResponse.statusCode,
      headers: { 'Content-Type': httpResponse.contentType },
      body: httpResponse.body,
    };
  } else {
    return { statusCode: 200 };
  }
};
