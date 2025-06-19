import axios from 'axios';

let router ;

export function setRouter(fn) {
  router  = fn;
}

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const PUBLIC_API_PATHS = [
  '/user/login',
  '/user/signup',
  '/movie/trend',
  '/movie/latest',
];

const isPublicApi = (url) => {
  return PUBLIC_API_PATHS.some(publicPath => url.startsWith(publicPath));
};

//토큰 검증
apiClient.interceptors.request.use((config) => {
  if (!isPublicApi(config.url)) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setTimeout(() => {
        router('/login');
      }, 1500);
      return Promise.reject(new Error('로그인이 필요합니다. 로그인 페이지로 이동합니다.'));
    }
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//응답 검증 및 신규 발행 토큰 추가
apiClient.interceptors.response.use((response) => {
  const newToken = response.headers['new-authorization'];
  if (newToken && newToken.startsWith('Bearer ')) {
    localStorage.setItem('accessToken', newToken.slice(7));
  }

  const contentType = response.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return Promise.reject(new Error(`서버에서 예상치 못한 응답을 받았습니다 (Content-Type: ${contentType}).`));
  }

  const data = response.data;

  if (data.status === 'SUCCESS') {
    return data;
  }

  return Promise.reject(new Error(data.message || '예상치 못한 API 오류가 발생했습니다.'));
}, (error) => {
  const response = error.response;

  if (response) {
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      setTimeout(() => {
        router('/login');
      }, 1500);
      return Promise.reject(new Error('로그인이 필요하거나 세션이 만료되었습니다. 로그인 페이지로 이동합니다.'));
    }

    if (response.data && (response.data.status === 'FAIL' || response.data.status === 'ERROR')) {
      return Promise.reject(new Error(response.data.message || 'API 요청 실패.'));
    }
  }

  return Promise.reject(new Error('예상치 못한 API 오류가 발생했습니다.'));
});


export default apiClient;
