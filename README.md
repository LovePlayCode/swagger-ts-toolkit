# Swagger TypeScript Toolkit

功能强大的 Swagger/OpenAPI TypeScript 工具包 - 自动生成类型定义、API接口和端点常量。

## 特性

- 🚀 支持 YAML 和 JSON 格式的 Swagger 文档
- 📝 自动生成 TypeScript 类型定义
- 🔗 生成 API 端点常量
- 🛠️ 生成类型化的 API 调用函数
- 👀 支持文件监听模式，自动重新生成
- 🌐 支持本地文件和远程 URL
- 🔧 高度可配置
- 📦 支持多服务配置

## 安装

```bash
npm install swagger-ts-toolkit
# 或
yarn add swagger-ts-toolkit
# 或
pnpm add swagger-ts-toolkit
```

## 快速开始

### 1. 初始化配置

```bash
npx swagger-ts-toolkit init
# 或使用简短命令
npx stt init
```

这将创建一个 `swagger-ts-toolkit.config.js` 配置文件。

### 2. 配置 Swagger 文档路径

编辑配置文件：

```javascript
// swagger-ts-toolkit.config.js
export default {
  swagger: {
    localPaths: {
      development: 'docs/swagger/api-dev.yaml',
      production: 'docs/swagger/api-prod.yaml',
      userService: 'docs/swagger/user-service.yaml',
    },
    remoteUrls: {
      development: 'https://api-test.example.com/swagger/doc.json',
      production: 'https://api.example.com/swagger/doc.json',
    },
  },
  outputPath: 'src/typings/api-generated.d.ts',
  endpointsPath: 'src/api/generated/endpoints.ts',
};
```

### 3. 生成代码

```bash
# 自动检测并生成
npx swagger-ts-toolkit generate
# 或使用简短命令
npx stt generate

# 指定数据源
npx stt generate --source local
npx stt generate --source remote

# 指定服务
npx stt generate --service userService

# 监听模式
npx stt generate --watch
```

## API 使用

### 编程式使用

```typescript
import { SwaggerTsGenerator, generateTypes } from 'swagger-ts-toolkit';

// 使用类
const generator = new SwaggerTsGenerator({
  swagger: {
    localPaths: {
      api: 'docs/swagger.yaml'
    }
  },
  outputPath: 'src/types/api.d.ts'
});

await generator.generate({ source: 'local' });

// 或使用便捷函数
await generateTypes(
  { source: 'local', service: 'api' },
  { outputPath: 'src/types/api.d.ts' }
);
```

### 生成的文件示例

#### 类型定义文件 (`src/typings/api-generated.d.ts`)

```typescript
// 自动生成的类型定义
export interface components {
  schemas: {
    User: {
      id: number;
      name: string;
      email: string;
    };
    // ... 更多类型
  };
}
```

#### 端点常量文件 (`src/api/generated/endpoints.ts`)

```typescript
// 自动生成的API端点常量
export const API_ENDPOINTS = {
  getUserById: {
    path: '/users/{id}',
    method: 'GET',
    summary: '根据ID获取用户信息'
  },
  // ... 更多端点
} as const;
```

#### API 调用模块 (`src/api/generated/userService.ts`)

```typescript
// 基于Swagger生成的API调用模块
import { typedHttp } from '@/utils/http/typed-client';
import type { components } from '@/typings/api-generated';
import { API_ENDPOINTS } from './endpoints';

export const userServiceApi = {
  /**
   * 根据ID获取用户信息
   */
  async getUserById(data: { id: number }): Promise<components['schemas']['User']> {
    return typedHttp.get(API_ENDPOINTS.getUserById.path, data);
  },
  // ... 更多API方法
};
```

## 配置选项

### GeneratorConfig

```typescript
interface GeneratorConfig {
  swagger: {
    localPaths: Record<string, string>;  // 本地文件路径
    remoteUrls: Record<string, string>;  // 远程URL
  };
  outputPath: string;      // 类型定义输出路径
  endpointsPath: string;   // 端点常量输出路径
  backupPath: string;      // 备份文件路径
  tempJsonPath: string;    // 临时JSON文件路径
}
```

### GenerateOptions

```typescript
interface GenerateOptions {
  source?: 'auto' | 'local' | 'remote';  // 数据源类型
  service?: string;                       // 服务名称
  watch?: boolean;                        // 是否启用监听模式
}
```

## CLI 命令

### generate (gen)

生成 TypeScript 类型和接口：

```bash
npx swagger-ts-toolkit generate [options]
# 或
npx stt generate [options]

选项:
  -s, --source <type>     数据源类型 (auto|local|remote)
  -S, --service <name>    服务名称
  -c, --config <path>     配置文件路径
  -w, --watch            监听文件变化
  -o, --output <path>     输出文件路径
  -e, --endpoints <path>  端点常量输出路径
```

### init

初始化配置文件：

```bash
npx swagger-ts-toolkit init [options]
# 或
npx stt init [options]

选项:
  -f, --format <type>  配置文件格式 (js|json)
```

### validate

验证 Swagger 文档：

```bash
npx swagger-ts-toolkit validate [options]
# 或
npx stt validate [options]

选项:
  -s, --source <type>   数据源类型
  -S, --service <name>  服务名称
  -c, --config <path>   配置文件路径
```

## 高级用法

### 多服务配置

```javascript
// swagger-ts-toolkit.config.js
export default {
  swagger: {
    localPaths: {
      userService: 'docs/swagger/user-service.yaml',
      orderService: 'docs/swagger/order-service.yaml',
      paymentService: 'docs/swagger/payment-service.yaml',
    },
  },
  // ... 其他配置
};
```

生成特定服务：

```bash
npx stt generate --service userService
npx stt generate --service orderService
```

### 自定义 HTTP 客户端

生成的 API 模块使用 `typedHttp` 客户端，你需要实现这个客户端：

```typescript
// src/utils/http/typed-client.ts
export const typedHttp = {
  async get<T>(url: string, params?: any): Promise<T> {
    // 实现 GET 请求
  },
  async post<T>(url: string, data?: any): Promise<T> {
    // 实现 POST 请求
  },
  // ... 其他 HTTP 方法
};
```

## 依赖要求

- Node.js >= 16.0.0
- openapi-typescript (peer dependency)

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！