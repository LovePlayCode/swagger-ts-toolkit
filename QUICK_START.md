# 🚀 Swagger TypeScript Toolkit - 快速开始

## 安装

```bash
npm install swagger-ts-toolkit
```

## 5分钟快速上手

### 1️⃣ 初始化配置

```bash
npx stt init
```

### 2️⃣ 编辑配置文件

```javascript
// swagger-ts-toolkit.config.js
export default {
  swagger: {
    localPaths: {
      api: 'docs/swagger.yaml'  // 你的 Swagger 文件路径
    },
    remoteUrls: {
      development: 'https://your-api.com/swagger/doc.json'
    }
  },
  outputPath: 'src/types/api.d.ts',
  endpointsPath: 'src/api/endpoints.ts'
};
```

### 3️⃣ 生成代码

```bash
# 自动生成所有文件
npx stt generate

# 监听模式（文件变化时自动重新生成）
npx stt generate --watch
```

### 4️⃣ 使用生成的代码

```typescript
// 使用生成的类型
import type { components } from './types/api';
import { API_ENDPOINTS } from './api/endpoints';

type User = components['schemas']['User'];

// 使用端点常量
const userEndpoint = API_ENDPOINTS.getUserById;
console.log(userEndpoint.path); // '/users/{id}'
console.log(userEndpoint.method); // 'GET'
```

## 🎯 常用命令

```bash
# 完整命令
npx swagger-ts-toolkit generate
npx swagger-ts-toolkit init
npx swagger-ts-toolkit validate

# 简短命令（推荐）
npx stt generate
npx stt init  
npx stt validate

# 带参数的命令
npx stt generate --source local
npx stt generate --service userApi
npx stt generate --watch
```

## 📁 生成的文件结构

```
src/
├── types/
│   └── api.d.ts                 # TypeScript 类型定义
├── api/
│   ├── endpoints.ts             # API 端点常量
│   └── generated/
│       └── userApi.ts           # 生成的 API 调用函数
```

## 🔧 高级配置

### 多服务配置

```javascript
export default {
  swagger: {
    localPaths: {
      userService: 'docs/user-api.yaml',
      orderService: 'docs/order-api.yaml'
    }
  }
};
```

```bash
# 生成特定服务
npx stt generate --service userService
npx stt generate --service orderService
```

### 自定义输出路径

```bash
npx stt generate --output src/types/custom-api.d.ts --endpoints src/api/custom-endpoints.ts
```

就这么简单！🎉