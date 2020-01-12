import { config } from '../../Config/config'

export const api = async (url, method, body = null, headers = {}) => {
  try {
    const endPoint = config.api.BASE_URL + url;
    const reqBody = body ? JSON.stringify(body) : null;

    const fetchParams = { method, headers };

    if ((method === 'POST' || method === 'PUT') && !reqBody) {
      throw new Exception('Request body is required');
    }

    if (reqBody) {
      fetchParams.headers['Content-type'] = 'application/json';
      fetchParams.body = reqBody;
    }

    const fetchPromise = fetch(endPoint, fetchParams);
    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Request timeout");
      }, config.api.requestTimeout)
    });

    const response = await Promise.race(fetchPromise, timeOutPromise);

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export const fetchApi = async (url, method, body, statusCode, token = null, loader = false, promiseReturnType = 'json') => {
  try {
    const headers = {};
    const result = {
      token: null,
      success: false,
      responseBody: null,
      statusCode: 400
    }

    if (token) {
      headers['x-auth'] = token;
    }

    const response = await api(url, method, body, headers);

    result.responseBody = await response.json();
    result.statusCode = response.status;

    if (response.status === statusCode) {
      result.success = true;

      if (response.headers.get('x-auth')) {
        result.token = response.headers.get('x-auth');
      }

      return result;
    }

    throw result;

  } catch (e) {
    throw e;
  }
}