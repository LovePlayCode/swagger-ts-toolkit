# 🚀 项目集成示例

这个示例展示了如何在实际的前端项目中集成和使用 `swagger-ts-toolkit`。

## 📁 项目结构

```
my-frontend-project/
├── docs/
│   └── swagger/                    # Swagger 文档目录
│       ├── api-dev.yaml           # 开发环境 API 文档
│       ├── api-staging.yaml       # 测试环境 API 文档
│       ├── api-prod.yaml          # 生产环境 API 文档
│       ├── user-service.yaml      # 用户服务 API
│       ├── order-service.yaml     # 订单服务 API
│       └── payment-service.json   # 支付服务 API
├── src/
│   ├── types/                     # 类型定义目录
│   │   ├── api-generated.d.ts     # 生成的 API 类型
│   │   └── .backup/               # 备份文件
│   ├── api/                       # API 相关代码
│   │   ├── generated/             # 生成的 API 代码
│   │   │   ├── endpoints.ts       # API 端点常量
│   │   │   ├── userService.ts     # 用户服务 API
│   │   │   ├── orderService.ts    # 订单服务 API
│   │   │   └── paymentService.ts  # 支付服务 API
│   │   ├── client.ts              # HTTP 客户端配置
│   │   └── index.ts               # API 模块统一导出
│   ├── components/                # React 组件
│   ├── hooks/                     # 自定义 Hooks
│   ├── utils/                     # 工具函数
│   └── main.tsx                   # 应用入口
├── .github/
│   └── workflows/
│       └── api-types.yml          # GitHub Actions 工作流
├── package.json                   # 项目配置（包含 API 相关脚本）
├── swagger-ts-toolkit.config.js   # swagger-ts-toolkit 配置
├── tsconfig.json                  # TypeScript 配置
├── vite.config.ts                 # Vite 配置
└── README.md                      # 项目说明
```

## 🛠️ 设置步骤

### 1. 安装依赖

```bash
# 安装项目依赖
npm install

# 安装 swagger-ts-toolkit
npm install --save-dev swagger-ts-toolkit openapi-typescript
```

### 2. 初始化配置

```bash
# 初始化 swagger-ts-toolkit 配置
npm run api:init

# 或手动创建配置文件
cp examples/config-examples/complete-config.js swagger-ts-toolkit.config.js
```

### 3. 准备 Swagger 文档

```bash
# 创建文档目录
mkdir -p docs/swagger

# 复制示例文件或放置你的 API 文档
cp examples/sample-swagger-files/*.yaml docs/swagger/
cp examples/sample-swagger-files/*.json docs/swagger/
```

### 4. 生成 API 类型

```bash
# 生成所有 API 类型
npm run api:generate

# 或按服务分别生成
npm run api:user
npm run api:order
npm run api:payment
```

## 🔄 开发工作流

### 日常开发
```bash
# 启动开发服务器（自动生成 API 类型）
npm run dev

# 或者启动监听模式
npm run api:dev
```

### 环境切换
```bash
# 开发环境
npm run api:dev

# 测试环境
npm run api:staging

# 生产环境
npm run api:prod
```

### 代码提交前
```bash
# 验证 API 文档
npm run api:validate

# 检查类型
npm run type-check

# 格式化代码
npm run format

# 提交代码（会自动运行 pre-commit hooks）
git commit -m "feat: add new feature"
```

## 💻 代码使用示例

### 1. 类型安全的 API 调用

```typescript
// src/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 请求拦截器
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

```typescript
// src/api/services/userService.ts
import { apiClient } from '../client';
import type { components } from '@/types/api-generated';
import { API_ENDPOINTS } from '@/api/generated/endpoints';

type User = components['schemas']['User'];
type CreateUserRequest = components['schemas']['CreateUserRequest'];
type UserListResponse = components['schemas']['UserListResponse'];

export const userService = {
  // 获取用户列表
  async getUsers(params: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<UserListResponse> {
    return apiClient.get(API_ENDPOINTS.getUserList.path, { params });
  },

  // 根据 ID 获取用户
  async getUserById(id: string): Promise<User> {
    const url = API_ENDPOINTS.getUserById.path.replace('{userId}', id);
    return apiClient.get(url);
  },

  // 创建用户
  async createUser(data: CreateUserRequest): Promise<User> {
    return apiClient.post(API_ENDPOINTS.createUser.path, data);
  },

  // 更新用户
  async updateUser(id: string, data: Partial<CreateUserRequest>): Promise<User> {
    const url = API_ENDPOINTS.updateUser.path.replace('{userId}', id);
    return apiClient.put(url, data);
  },

  // 删除用户
  async deleteUser(id: string): Promise<void> {
    const url = API_ENDPOINTS.deleteUser.path.replace('{userId}', id);
    return apiClient.delete(url);
  },
};
```

### 2. React 组件中使用

```typescript
// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { userService } from '@/api/services/userService';
import type { components } from '@/types/api-generated';

type User = components['schemas']['User'];

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getUsers({ page: 1, pageSize: 20 });
        setUsers(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取用户列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2>用户列表</h2>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <p>状态: {user.status}</p>
          <p>创建时间: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};
```

### 3. 自定义 Hook

```typescript
// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { userService } from '@/api/services/userService';
import type { components } from '@/types/api-generated';

type User = components['schemas']['User'];

export const useUsers = (params: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers(params);
      setUsers(response.data);
      setTotal(response.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取用户失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [params.page, params.pageSize, params.search]);

  const refetch = () => fetchUsers();

  return {
    users,
    loading,
    error,
    total,
    refetch,
  };
};
```

## 🚀 CI/CD 集成

### GitHub Actions

```yaml
# .github/workflows/api-types.yml
name: API Types Generation and Validation

on:
  push:
    paths:
      - 'docs/swagger/**'
      - 'swagger-ts-toolkit.config.js'
  pull_request:
    paths:
      - 'docs/swagger/**'
      - 'swagger-ts-toolkit.config.js'

jobs:
  api-types:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate API types
        run: npm run api:generate
        
      - name: Validate API documentation
        run: npm run api:validate
        
      - name: Check for changes
        run: |
          if [[ -n $(git status --porcelain) ]]; then
            echo "API types have been updated"
            git diff
          else
            echo "No changes in API types"
          fi
          
      - name: Type check
        run: npm run type-check
        
      - name: Commit updated types (if any)
        if: github.event_name == 'push'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add src/types/ src/api/generated/
          git diff --staged --quiet || git commit -m "chore: update generated API types [skip ci]"
          git push
```

## 📋 最佳实践

### 1. 版本控制
- ✅ 将生成的类型文件加入版本控制
- ✅ 设置 `.gitignore` 忽略临时文件
- ✅ 使用 Git hooks 自动生成类型

### 2. 团队协作
- ✅ 统一的配置文件
- ✅ 清晰的 npm scripts
- ✅ 详细的文档说明

### 3. 错误处理
- ✅ 完善的错误处理机制
- ✅ 类型安全的错误类型
- ✅ 用户友好的错误信息

### 4. 性能优化
- ✅ 按需导入 API 服务
- ✅ 合理的缓存策略
- ✅ 避免重复的类型生成

## 🔧 故障排除

### 常见问题

1. **类型生成失败**
   ```bash
   # 检查 Swagger 文档格式
   npm run api:validate
   
   # 清理并重新生成
   npm run api:clean
   npm run api:generate
   ```

2. **网络连接问题**
   ```bash
   # 使用本地文件而不是远程 URL
   npm run api:generate -- --source local
   ```

3. **类型不匹配**
   ```bash
   # 重新生成类型定义
   npm run api:generate
   
   # 检查 TypeScript 配置
   npm run type-check
   ```

### 调试技巧

```bash
# 启用详细日志
DEBUG=swagger-ts-toolkit npm run api:generate

# 验证特定服务
npm run api:validate -- --service userService

# 逐步生成
npm run api:user
npm run api:order
npm run api:payment
```

## 📚 相关资源

- [swagger-ts-toolkit 文档](../README.md)
- [OpenAPI 3.0 规范](https://spec.openapis.org/oas/v3.0.3)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [React Query 文档](https://react-query.tanstack.com/)

---

💡 **提示**: 这个示例展示了完整的项目集成方案，你可以根据自己的项目需求进行调整和定制。