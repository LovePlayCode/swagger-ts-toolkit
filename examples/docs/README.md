# 📁 docs 文件夹示例 - 🆕 支持自动生成API函数

这个示例展示了如何从 `docs` 文件夹下的 Swagger 文档生成可供前端直接调用的 API 函数。

## 🆕 新功能亮点

### ✨ 自动生成可直接调用的API方法
现在工具能够自动生成如下格式的API调用函数：

```typescript
// 自动生成的API函数
async function getUserById(pathParams: { id: number }): Promise<User> {
  const url = buildPath('/users/{id}', pathParams);
  return apiClient.get(url);
}

// 使用示例
const user = await userApi.getUserById({ pathParams: { id: 123 } });
```

### 🔧 完整的HTTP客户端集成
- 自动处理路径参数替换 (`/users/{id}` → `/users/123`)
- 统一的请求/响应拦截器
- 完整的错误处理机制
- 自动token认证管理

## 📂 目录结构

```
examples/docs/
├── swagger/                           # Swagger 文档目录
│   ├── user-api.yaml                 # 用户管理 API 文档（YAML 格式）
│   └── product-api.json              # 商品管理 API 文档（JSON 格式）
├── generated/                        # 生成的文件目录
│   ├── api-types.d.ts               # TypeScript 类型定义
│   ├── endpoints.ts                 # API 端点常量
│   ├── userApi.ts                   # 用户服务 API 函数
│   ├── productApi.ts                # 商品服务 API 函数
│   └── .backup/                     # 备份文件
├── swagger-ts-toolkit.config.js      # 配置文件
├── generate-api.js                   # 生成脚本
├── frontend-usage-example.ts         # 前端使用示例
└── README.md                         # 说明文档
```

## 🚀 快速开始

### 1. 准备 Swagger 文档

我们已经准备了两个示例 API 文档：

- **`swagger/user-api.yaml`**: 用户管理 API，包含用户 CRUD、登录登出等功能
- **`swagger/product-api.json`**: 商品管理 API，包含商品 CRUD、分类管理、库存管理等功能

### 2. 运行生成脚本

```bash
# 确保项目已构建
npm run build

# 运行生成脚本
node examples/docs/generate-api.js
```

### 3. 查看生成的文件

生成完成后，你会看到以下文件：

```
generated/
├── api-types.d.ts      # 包含所有 API 的 TypeScript 类型定义
├── endpoints.ts        # 所有 API 端点的常量定义
├── userApi.ts         # 用户服务的 API 调用函数
└── productApi.ts      # 商品服务的 API 调用函数
```

## 📋 Swagger 文档说明

### 用户管理 API (`user-api.yaml`)

**功能模块：**
- 👥 用户管理：获取、创建、更新、删除用户
- 🔐 认证授权：登录、登出
- 📊 分页查询：支持搜索、筛选、排序

**主要端点：**
- `GET /users` - 获取用户列表
- `POST /users` - 创建新用户
- `GET /users/{userId}` - 获取用户详情
- `PUT /users/{userId}` - 更新用户信息
- `DELETE /users/{userId}` - 删除用户
- `POST /auth/login` - 用户登录
- `POST /auth/logout` - 用户登出

### 商品管理 API (`product-api.json`)

**功能模块：**
- 🛍️ 商品管理：商品 CRUD 操作
- 📂 分类管理：商品分类层级管理
- 📊 库存管理：库存查询和更新
- 🔍 高级搜索：多条件筛选和排序

**主要端点：**
- `GET /products` - 获取商品列表
- `POST /products` - 创建新商品
- `GET /products/{productId}` - 获取商品详情
- `PUT /products/{productId}` - 更新商品信息
- `DELETE /products/{productId}` - 删除商品
- `GET /categories` - 获取商品分类
- `GET /products/{productId}/inventory` - 获取商品库存
- `PUT /products/{productId}/inventory` - 更新商品库存

## 💻 前端使用示例

### 1. 导入生成的类型和 API

```typescript
// 导入类型定义
import type { components } from './generated/api-types';
import { API_ENDPOINTS } from './generated/endpoints';

// 定义类型别名
type User = components['schemas']['User'];
type Product = components['schemas']['Product'];
type CreateUserRequest = components['schemas']['CreateUserRequest'];
```

### 2. 使用 API 端点常量

```typescript
// 使用端点常量
console.log(API_ENDPOINTS.getUserList.path);    // '/users'
console.log(API_ENDPOINTS.getUserList.method);  // 'GET'
console.log(API_ENDPOINTS.getUserList.summary); // '获取用户列表'

// 动态构建 URL
const userId = 123;
const userDetailUrl = API_ENDPOINTS.getUserById.path.replace('{userId}', userId.toString());
// 结果: '/users/123'
```

### 3. 创建 API 服务类

```typescript
class UserService {
  static async getUserList(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'active' | 'inactive' | 'pending';
  }): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.getUserList.path}?${new URLSearchParams(params)}`);
    const result = await response.json();
    return result.data;
  }

  static async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.createUser.path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const result = await response.json();
    return result.data;
  }
}
```

### 4. 在 React 组件中使用

```typescript
import React, { useState, useEffect } from 'react';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await UserService.getUserList({ page: 1, limit: 20 });
        setUsers(userList);
      } catch (error) {
        console.error('获取用户列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <h2>用户列表</h2>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <p>状态: {user.status}</p>
        </div>
      ))}
    </div>
  );
};
```

## 🔧 自定义配置

### 修改配置文件

编辑 `swagger-ts-toolkit.config.js` 来自定义生成行为：

```javascript
export default {
  swagger: {
    localPaths: {
      // 添加更多 API 文档
      userApi: 'examples/docs/swagger/user-api.yaml',
      productApi: 'examples/docs/swagger/product-api.json',
      orderApi: 'examples/docs/swagger/order-api.yaml',     // 新增
      paymentApi: 'examples/docs/swagger/payment-api.json', // 新增
    }
  },
  
  // 自定义输出路径
  outputPath: 'src/types/api.d.ts',
  endpointsPath: 'src/api/endpoints.ts',
};
```

### 使用 CLI 命令

```bash
# 使用配置文件生成
npx stt generate --config examples/docs/swagger-ts-toolkit.config.js

# 生成特定服务
npx stt generate --service userApi --config examples/docs/swagger-ts-toolkit.config.js

# 监听模式
npx stt generate --watch --config examples/docs/swagger-ts-toolkit.config.js
```

## 📊 生成的内容说明

### TypeScript 类型定义 (`api-types.d.ts`)

包含所有 API 的类型定义：

```typescript
export interface components {
  schemas: {
    // 用户相关类型
    User: {
      id: number;
      username: string;
      email: string;
      status: 'active' | 'inactive' | 'pending';
      // ... 更多属性
    };
    
    // 商品相关类型
    Product: {
      id: number;
      name: string;
      price: number;
      categoryId: number;
      status: 'active' | 'inactive' | 'draft' | 'deleted';
      // ... 更多属性
    };
    
    // 请求类型
    CreateUserRequest: {
      username: string;
      email: string;
      password: string;
      // ... 更多属性
    };
    
    // ... 更多类型
  };
}
```

### API 端点常量 (`endpoints.ts`)

包含所有 API 端点的常量定义：

```typescript
export const API_ENDPOINTS = {
  // 用户相关端点
  getUserList: {
    path: '/users',
    method: 'GET',
    summary: '获取用户列表'
  },
  createUser: {
    path: '/users',
    method: 'POST',
    summary: '创建新用户'
  },
  
  // 商品相关端点
  getProductList: {
    path: '/products',
    method: 'GET',
    summary: '获取商品列表'
  },
  createProduct: {
    path: '/products',
    method: 'POST',
    summary: '创建新商品'
  },
  
  // ... 更多端点
} as const;
```

## 🎯 最佳实践

### 1. 文件组织

```
src/
├── api/
│   ├── types.ts           # 重新导出生成的类型
│   ├── endpoints.ts       # 重新导出端点常量
│   ├── services/          # API 服务类
│   │   ├── userService.ts
│   │   ├── productService.ts
│   │   └── index.ts
│   ├── client.ts          # HTTP 客户端配置
│   └── index.ts           # 统一导出
```

### 2. 错误处理

```typescript
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(
      error.error?.message || '请求失败',
      response.status,
      error.error?.code
    );
  }
  
  return response.json();
}
```

### 3. 请求拦截器

```typescript
class ApiClient {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    // 请求前拦截
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const response = await fetch(url, { ...options, headers });
      return await handleApiResponse<T>(response);
    } catch (error) {
      // 错误处理逻辑
      console.error('API 请求失败:', error);
      throw error;
    }
  }
}
```

## 🔄 开发工作流

### 1. API 文档更新流程

```bash
# 1. 更新 Swagger 文档
vim examples/docs/swagger/user-api.yaml

# 2. 重新生成 API 接口
node examples/docs/generate-api.js

# 3. 更新前端代码
# 4. 测试 API 调用
# 5. 提交代码
```

### 2. 团队协作

```bash
# package.json 脚本配置
{
  "scripts": {
    "api:generate": "node examples/docs/generate-api.js",
    "api:validate": "stt validate --config examples/docs/swagger-ts-toolkit.config.js",
    "precommit": "npm run api:validate",
    "postinstall": "npm run api:generate"
  }
}
```

## 🐛 故障排除

### 常见问题

1. **生成失败**
   ```bash
   # 检查 Swagger 文档格式
   npx stt validate --config examples/docs/swagger-ts-toolkit.config.js
   ```

2. **类型不匹配**
   ```bash
   # 重新生成类型定义
   rm -rf examples/docs/generated/
   node examples/docs/generate-api.js
   ```

3. **路径问题**
   - 确保配置文件中的路径正确
   - 使用绝对路径避免路径问题

### 调试技巧

```bash
# 启用详细日志
DEBUG=swagger-ts-toolkit node examples/docs/generate-api.js

# 分步生成
npx stt generate --service userApi --config examples/docs/swagger-ts-toolkit.config.js
npx stt generate --service productApi --config examples/docs/swagger-ts-toolkit.config.js
```

## 📚 相关资源

- [Swagger/OpenAPI 规范](https://spec.openapis.org/oas/v3.0.3)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Fetch API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

💡 **提示**: 这个示例展示了完整的从 Swagger 文档到前端 API 调用的工作流程，你可以根据自己的项目需求进行调整和扩展。