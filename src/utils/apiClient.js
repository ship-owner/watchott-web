const PUBLIC_API_PATHS = [
  '/api/user/login',
  '/api/user/signup',
  '/api/movie/trend',
  '/api/movie/latest',
];

const isPublicApi = (url) => {
  return PUBLIC_API_PATHS.some(publicPath => url.startsWith(publicPath));
};

async function request(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null
  };


  const token = localStorage.getItem('accessToken');

  if (!isPublicApi(url) && token) {
      options.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
        localStorage.removeItem('accessToken'); 
        throw new Error('Unauthorized');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.error('Non-JSON API Response:', textResponse);
      throw new Error(`서버에서 예상치 못한 응답을 받았습니다 (Content-Type: ${contentType}).`);
    }

    const apiResponse = await response.json();

    if (response.ok) {
      if (apiResponse.status === 'SUCCESS') {
        return apiResponse;
      } else {
        console.warn('API Response status is not success despite HTTP OK:', apiResponse);
        throw new Error(apiResponse.message || 'API 처리 중 알 수 없는 문제가 발생했습니다.');
      }
    } else {
      if (apiResponse.status === 'FAIL' || apiResponse.status === 'ERROR') {
        console.error('API Error:', apiResponse.message, apiResponse.data);
        throw new Error(apiResponse.message || 'API 요청 실패.');
      } else {
        console.error('Unexpected API Error Response:', apiResponse);
        throw new Error('예상치 못한 API 오류가 발생했습니다.');
      }
    }
  } catch (error) {
    console.error('API 오류 발생:', error);
    throw error.message; 
  }
}

export const apiClient = {
  get: (url) => request(url, 'GET'),
  post: (url, body) => request(url, 'POST', body),
  put: (url, body) => request(url, 'PUT', body),
  del: (url) => request(url, 'DELETE'),
};
