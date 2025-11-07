# 🌐 自定义请求客户端

这里展示如何使用不同的HTTP客户端替代默认的axios，实现完全自定义的请求处理。

## 📁 文件说明

### `middleware-examples.ts`
中间件系统示例，包含：
- 认证中间件
- 缓存中间件
- 日志中间件
- 重试中间件
- 性能监控中间件

### `compatibility-test.js`
兼容性测试，验证：
- Fetch API客户端
- Node.js原生HTTP
- 模拟Axios客户端
- 中间件系统

### `test-type-compatibility.ts`
TypeScript类型兼容性测试：
- 类型安全验证
- 接口兼容性测试
- 扩展性验证

## 🔌 支持的HTTP客户端

### 1. Fetch API
```typescript
import { configureApiClient, RequestClient } from './generated/api-functions';

class FetchClient implements RequestClient {
  async request<T>(config: ApiRequestConfig): Promise<T> {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.data ? JSON.stringify(config.data) : undefined
    });
    return response.json();
  }
}

configureApiClient({
  customClient: new FetchClient()
});
```

### 2. Ky HTTP客户端
```typescript
import ky from 'ky';

class KyClient implements RequestClient {
  async request<T>(config: ApiRequestConfig): Promise<T> {
    return ky(config.url, {
      method: config.method.toLowerCase(),
      json: config.data,
      headers: config.headers
    }).json<T>();
  }
}
```

### 3. 自定义Axios
```typescript
import axios from 'axios';

configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  middlewares: [authMiddleware, loggingMiddleware]
});
```

## 🛠 中间件系统

### 认证中间件
```typescript
const authMiddleware: RequestMiddleware = {
  onRequest: (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  }
};
```

### 缓存中间件
```typescript
const cacheMiddleware: RequestMiddleware = {
  onRequest: async (config) => {
    if (config.method === 'GET') {
      const cached = localStorage.getItem(`cache_${config.url}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 300000) { // 5分钟缓存
          return Promise.resolve(data);
        }
      }
    }
    return config;
  },
  onResponse: (response) => {
    // 缓存响应
    return response;
  }
};
```

## 🚀 使用方式

### 方式1: 使用默认配置
```typescript
import { apiClient } from './generated/api-functions';

// 直接使用，自动使用默认axios配置
const response = await apiClient.getUserById({ pathParams: { id: 123 } });
```

### 方式2: 自定义配置
```typescript
import { configureApiClient } from './generated/api-functions';

configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  middlewares: [authMiddleware, loggingMiddleware]
});
```

### 方式3: 完全自定义客户端
```typescript
import { configureApiClient } from './generated/api-functions';
import { MyCustomClient } from './my-http-client';

configureApiClient({
  customClient: new MyCustomClient()
});
```

## 🧪 测试和验证

### 运行兼容性测试
```bash
node 04-custom-request/compatibility-test.js
```

### 运行类型测试
```bash
npx tsx 04-custom-request/test-type-compatibility.ts
```

## 📚 相关文档

- [自定义请求指南](../10-documentation/custom-request-guide.md) - 详细使用指南
- [类型兼容性修复](../10-documentation/type-compatibility-fix.md) - 技术细节

## 🎯 最佳实践

1. **渐进式迁移**：先使用默认配置，然后逐步自定义
2. **环境隔离**：为不同环境使用不同配置
3. **错误处理**：始终包含错误处理中间件
4. **性能监控**：在开发环境启用性能监控
5. **类型安全**：充分利用TypeScript类型检查