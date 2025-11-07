// 📚 自定义Request客户端使用示例

import { configureApiClient, RequestClient, RequestMiddleware, ApiRequestConfig } from './docs/generated/api-functions-elderSvr';

// ==================== 示例1: 使用fetch替代axios ====================

class FetchRequestClient implements RequestClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '', headers: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = headers;
  }

  async request<T = any>(config: ApiRequestConfig): Promise<T> {
    const url = this.baseURL + config.url;
    const searchParams = config.params ? new URLSearchParams(config.params).toString() : '';
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;

    const response = await fetch(fullUrl, {
      method: config.method,
      headers: {
        ...this.defaultHeaders,
        ...config.headers,
      },
      body: ['GET', 'DELETE'].includes(config.method) ? undefined : JSON.stringify(config.data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

// 使用fetch客户端
configureApiClient({
  customClient: new FetchRequestClient('https://api.example.com', {
    'Content-Type': 'application/json'
  })
});

// ==================== 示例2: 使用ky HTTP客户端 ====================

// 假设你使用ky库
/*
import ky from 'ky';

class KyRequestClient implements RequestClient {
  private client: typeof ky;

  constructor(baseURL: string) {
    this.client = ky.create({
      prefixUrl: baseURL,
      retry: 2,
      timeout: 10000,
    });
  }

  async request<T = any>(config: ApiRequestConfig): Promise<T> {
    const { url, method, data, params, headers } = config;
    
    const options = {
      method: method.toLowerCase() as any,
      json: data,
      searchParams: params,
      headers,
    };

    return this.client(url, options).json<T>();
  }
}

configureApiClient({
  customClient: new KyRequestClient('https://api.example.com')
});
*/

// ==================== 示例3: 自定义中间件 ====================

// 缓存中间件
const cacheMiddleware: RequestMiddleware = {
  onRequest: async (config) => {
    // 只缓存GET请求
    if (config.method === 'GET') {
      const cacheKey = `api_cache_${config.url}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // 缓存5分钟
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          return Promise.resolve(data);
        }
      }
    }
    return config;
  },
  onResponse: async (response) => {
    // 缓存GET请求的响应
    const config = response.config;
    if (config?.method === 'GET') {
      const cacheKey = `api_cache_${config.url}`;
      localStorage.setItem(cacheKey, JSON.stringify({
        data: response,
        timestamp: Date.now()
      }));
    }
    return response;
  }
};

// 性能监控中间件
const performanceMiddleware: RequestMiddleware = {
  onRequest: (config) => {
    (config as any)._startTime = Date.now();
    return config;
  },
  onResponse: (response) => {
    const config = (response as any).config;
    if (config?._startTime) {
      const duration = Date.now() - config._startTime;
      console.log(`[Performance] ${config.method} ${config.url}: ${duration}ms`);
    }
    return response;
  }
};

// 重试中间件
const retryMiddleware: RequestMiddleware = {
  onError: async (error) => {
    const config = error.config;
    const retryCount = config._retryCount || 0;
    const maxRetries = 3;

    if (retryCount < maxRetries && error.response?.status >= 500) {
      config._retryCount = retryCount + 1;
      console.log(`[Retry] Attempt ${retryCount + 1}/${maxRetries} for ${config.method} ${config.url}`);
      
      // 指数退避
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      
      // 重新发送请求（这里需要获取原始客户端实例）
      // 实际实现中可能需要更复杂的逻辑
      throw error; // 暂时抛出，实际中需要重新请求
    }
    
    throw error;
  }
};

// 应用多个中间件
configureApiClient({
  baseURL: 'https://api.example.com',
  middlewares: [
    cacheMiddleware,
    performanceMiddleware,
    retryMiddleware
  ]
});

// ==================== 示例4: 环境特定配置 ====================

// 开发环境配置
if (process.env.NODE_ENV === 'development') {
  configureApiClient({
    baseURL: 'http://localhost:3000/api',
    middlewares: [
      {
        onRequest: (config) => {
          console.log('[DEV] Request:', config);
          return config;
        },
        onResponse: (response) => {
          console.log('[DEV] Response:', response);
          return response;
        }
      }
    ]
  });
}

// 生产环境配置
if (process.env.NODE_ENV === 'production') {
  configureApiClient({
    baseURL: 'https://api.production.com',
    timeout: 5000,
    middlewares: [
      performanceMiddleware,
      retryMiddleware
    ]
  });
}

// ==================== 示例5: 微服务架构支持 ====================

// 为不同的微服务创建不同的客户端
const createServiceClient = (serviceName: string, baseURL: string) => {
  return new FetchRequestClient(baseURL, {
    'Content-Type': 'application/json',
    'X-Service-Name': serviceName
  });
};

// 用户服务
configureApiClient({
  customClient: createServiceClient('user-service', 'https://user-api.example.com')
});

// ==================== 示例6: 认证策略自定义 ====================

// JWT自动刷新中间件
const jwtRefreshMiddleware: RequestMiddleware = {
  onError: async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // 刷新token
          const response = await fetch('/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
          });
          
          const { accessToken } = await response.json();
          localStorage.setItem('token', accessToken);
          
          // 重新发送原请求
          const originalConfig = error.config;
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          
          // 这里需要重新发送请求的逻辑
          return Promise.reject(error); // 暂时抛出
        } catch (refreshError) {
          // 刷新失败，跳转到登录页
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
};

export {
  FetchRequestClient,
  cacheMiddleware,
  performanceMiddleware,
  retryMiddleware,
  jwtRefreshMiddleware
};