# 🔧 自定义Request客户端使用指南

swagger-ts-toolkit 现在支持完全自定义的HTTP请求客户端，让您可以使用任何HTTP库（fetch、ky、superagent等）或添加自定义的中间件逻辑。

## 🎯 核心特性

- ✅ **HTTP库无关**: 支持axios、fetch、ky等任何HTTP客户端
- ✅ **中间件系统**: 支持请求/响应拦截器和错误处理
- ✅ **类型安全**: 完整的TypeScript类型支持
- ✅ **零配置**: 默认使用axios，无需额外配置
- ✅ **渐进式**: 可以逐步迁移现有代码

## 📚 使用方式

### 方式1: 使用默认配置（推荐新手）

```typescript
import { elderSvrApi } from './generated/api-functions-elderSvr';

// 直接使用，自动使用axios + 内置中间件
const response = await elderSvrApi.paymentMgrServiceGetAppSetting({
  data: { appId: 'test' }
});
```

### 方式2: 自定义配置

```typescript
import { elderSvrApi, configureApiClient } from './generated/api-functions-elderSvr';

// 自定义配置
configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'value'
  },
  middlewares: [
    // 自定义中间件
    {
      onRequest: (config) => {
        console.log('发送请求:', config);
        return config;
      },
      onResponse: (response) => {
        console.log('收到响应:', response);
        return response;
      }
    }
  ]
});

// 然后正常使用API
const response = await elderSvrApi.paymentMgrServiceGetAppSetting({
  data: { appId: 'test' }
});
```

### 方式3: 使用完全自定义的HTTP客户端

```typescript
import { elderSvrApi, configureApiClient, RequestClient } from './generated/api-functions-elderSvr';

// 使用fetch实现自定义客户端
class MyCustomClient implements RequestClient {
  async request<T>(config: any): Promise<T> {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.data ? JSON.stringify(config.data) : undefined
    });
    return response.json();
  }
}

// 配置使用自定义客户端
configureApiClient({
  customClient: new MyCustomClient()
});

// API调用保持不变
const response = await elderSvrApi.paymentMgrServiceGetAppSetting({
  data: { appId: 'test' }
});
```

## 🔌 支持的HTTP客户端示例

### 1. Fetch API

```typescript
import { RequestClient, ApiRequestConfig } from './generated/api-functions-elderSvr';

class FetchClient implements RequestClient {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  async request<T>(config: ApiRequestConfig): Promise<T> {
    const url = this.baseURL + config.url;
    const searchParams = config.params ? new URLSearchParams(config.params) : null;
    const fullUrl = searchParams ? `${url}?${searchParams}` : url;

    const response = await fetch(fullUrl, {
      method: config.method,
      headers: config.headers,
      body: ['GET', 'DELETE'].includes(config.method) ? 
        undefined : JSON.stringify(config.data)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

// 使用
configureApiClient({
  customClient: new FetchClient('https://api.example.com')
});
```

### 2. Ky HTTP客户端

```typescript
import ky from 'ky';

class KyClient implements RequestClient {
  private client: typeof ky;

  constructor(baseURL: string) {
    this.client = ky.create({
      prefixUrl: baseURL,
      retry: 2,
      timeout: 10000
    });
  }

  async request<T>(config: ApiRequestConfig): Promise<T> {
    return this.client(config.url, {
      method: config.method.toLowerCase() as any,
      json: config.data,
      searchParams: config.params,
      headers: config.headers
    }).json<T>();
  }
}

configureApiClient({
  customClient: new KyClient('https://api.example.com')
});
```

### 3. 原生XMLHttpRequest

```typescript
class XHRClient implements RequestClient {
  async request<T>(config: ApiRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      let url = config.url;
      if (config.params) {
        const params = new URLSearchParams(config.params);
        url += '?' + params.toString();
      }

      xhr.open(config.method, url);
      
      // 设置headers
      if (config.headers) {
        Object.entries(config.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network Error'));
      
      const body = config.data ? JSON.stringify(config.data) : null;
      xhr.send(body);
    });
  }
}
```

## 🛠 中间件系统

### 内置中间件

```typescript
import { 
  authMiddleware,        // JWT认证
  errorHandlingMiddleware, // 错误处理
  loggingMiddleware      // 请求日志
} from './generated/api-functions-elderSvr';

configureApiClient({
  middlewares: [
    authMiddleware,
    errorHandlingMiddleware,
    loggingMiddleware
  ]
});
```

### 自定义中间件示例

#### 1. 缓存中间件

```typescript
const cacheMiddleware: RequestMiddleware = {
  onRequest: async (config) => {
    if (config.method === 'GET') {
      const cacheKey = `cache_${config.url}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // 5分钟缓存
        if (Date.now() - timestamp < 300000) {
          return Promise.resolve(data);
        }
      }
    }
    return config;
  },
  onResponse: async (response) => {
    // 缓存GET请求响应
    return response;
  }
};
```

#### 2. 重试中间件

```typescript
const retryMiddleware: RequestMiddleware = {
  onError: async (error) => {
    const config = error.config;
    const retryCount = config._retryCount || 0;
    
    if (retryCount < 3 && error.response?.status >= 500) {
      config._retryCount = retryCount + 1;
      
      // 指数退避
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      
      // 这里需要重新发送请求的逻辑
      // 实际实现可能需要获取原始客户端实例
    }
    
    throw error;
  }
};
```

#### 3. 性能监控中间件

```typescript
const performanceMiddleware: RequestMiddleware = {
  onRequest: (config) => {
    (config as any)._startTime = performance.now();
    return config;
  },
  onResponse: (response) => {
    const config = (response as any).config;
    if (config?._startTime) {
      const duration = performance.now() - config._startTime;
      console.log(`[Performance] ${config.method} ${config.url}: ${duration.toFixed(2)}ms`);
    }
    return response;
  }
};
```

## 🌐 环境特定配置

```typescript
// 开发环境
if (process.env.NODE_ENV === 'development') {
  configureApiClient({
    baseURL: 'http://localhost:3000/api',
    middlewares: [loggingMiddleware]
  });
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
  configureApiClient({
    baseURL: 'https://api.production.com',
    timeout: 5000,
    middlewares: [
      authMiddleware,
      errorHandlingMiddleware,
      performanceMiddleware
    ]
  });
}

// 测试环境
if (process.env.NODE_ENV === 'test') {
  configureApiClient({
    customClient: mockClient // 使用mock客户端
  });
}
```

## 🏗 微服务架构支持

```typescript
// 为不同微服务创建不同配置
const createServiceConfig = (serviceName: string, baseURL: string) => ({
  customClient: new FetchClient(baseURL),
  middlewares: [
    {
      onRequest: (config) => ({
        ...config,
        headers: {
          ...config.headers,
          'X-Service-Name': serviceName
        }
      })
    }
  ]
});

// 用户服务
configureApiClient(createServiceConfig('user-service', 'https://user-api.example.com'));
```

## 🔐 高级认证策略

### JWT自动刷新

```typescript
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
          
          // 这里需要重新发送请求
        } catch (refreshError) {
          // 刷新失败，跳转登录
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    throw error;
  }
};
```

## 📝 最佳实践

1. **渐进式迁移**: 先使用默认配置，然后逐步添加自定义逻辑
2. **环境隔离**: 为不同环境使用不同的配置
3. **错误处理**: 始终包含错误处理中间件
4. **性能监控**: 在开发环境启用性能监控
5. **类型安全**: 充分利用TypeScript类型检查
6. **测试友好**: 在测试环境使用mock客户端

## 🚀 迁移指南

### 从旧版本迁移

```typescript
// 旧版本 (v1.x)
import { userApi } from './api-functions';
const response = await userApi.getUser(123);

// 新版本 (v2.x) - 无需修改API调用
import { userApi } from './api-functions';
const response = await userApi.getUser({ pathParams: { id: 123 } });

// 只需在应用启动时配置一次
configureApiClient({
  baseURL: 'https://your-api.com',
  middlewares: [authMiddleware]
});
```

这个自定义Request系统为您提供了最大的灵活性，同时保持了API调用的简洁性。您可以根据项目需求选择合适的HTTP客户端和中间件组合。