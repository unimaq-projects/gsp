const axios = require('axios');

exports.handler = async (event, context) => {
  const url = `https://v1.nocodeapi.com/snmarcelo/google_sheets/xEhRBKSjzPsOJPRv/`;
  const method = event.httpMethod;
  const headers = {
    'Content-Type': 'application/json'
  };

  let body = null;
  if (event.body) {
    body = event.body;
  }

  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: body,
    });

    return {
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error proxying to nocodeapi:', error);
    return {
      statusCode: error.response ? error.response.status : 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
};