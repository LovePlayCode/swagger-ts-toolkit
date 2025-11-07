# 🔧 API生成示例

这里展示了各种API生成的方法和技巧，从简单的单服务生成到复杂的多服务批量处理。

## 📁 文件说明

### `single-service.js`
单个服务的API生成示例：
- 从本地Swagger文件生成
- 基础配置和输出
- 生成后的文件结构说明

### `multi-service.js`
多服务批量生成示例：
- 同时处理多个Swagger文档
- 服务间的依赖管理
- 批量操作的最佳实践

### `remote-swagger.js`
远程Swagger文档处理：
- 从URL获取Swagger文档
- 网络请求配置和错误处理
- 缓存策略

### `watch-mode.js`
文件监控模式：
- 自动监控Swagger文件变化
- 增量更新生成
- 开发环境的实时同步

## 🎯 生成类型

### 1. 本地文件生成
```javascript
const generator = new SwaggerTsGenerator({
  swagger: {
    localPaths: {
      userApi: './swagger/user-api.yaml'
    }
  },
  outputPath: './src/types/api.d.ts'
});

await generator.generate({
  source: 'local',
  service: 'userApi'
});
```

### 2. 远程文档生成
```javascript
const generator = new SwaggerTsGenerator({
  swagger: {
    remotePaths: {
      userApi: 'https://api.example.com/swagger.json'
    }
  },
  outputPath: './src/types/api.d.ts'
});

await generator.generate({
  source: 'remote',
  service: 'userApi'
});
```

### 3. 批量生成
```javascript
const services = ['userApi', 'productApi', 'orderApi'];

for (const service of services) {
  await generator.generate({
    source: 'local',
    service: service
  });
  console.log(`✅ ${service} 生成完成`);
}
```

## 🚀 运行示例

```bash
# 单服务生成
node 03-api-generation/single-service.js

# 多服务生成
node 03-api-generation/multi-service.js

# 远程文档生成
node 03-api-generation/remote-swagger.js

# 监控模式
node 03-api-generation/watch-mode.js
```

## ⚙️ 高级配置

### 自定义输出路径
```javascript
const generator = new SwaggerTsGenerator({
  swagger: {
    localPaths: {
      userApi: './swagger/user-api.yaml'
    }
  },
  outputPath: './src/types/user-api.d.ts',
  endpointsPath: './src/constants/user-endpoints.ts',
  backupPath: './backups/user-api.backup.d.ts'
});
```

### 生成选项配置
```javascript
const generator = new SwaggerTsGenerator({
  // ... 其他配置
  generateOptions: {
    generateApiModule: true,
    generateEndpoints: true,
    generateFunctions: true,
    customClient: true
  }
});
```

## 📊 生成文件说明

### 类型定义文件 (`api.d.ts`)
```typescript
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

### API函数文件 (`api-functions.ts`)
```typescript
export const userApi = {
  async getUserById(pathParams: { id: number }): Promise<User> {
    // 自动生成的API调用函数
  },
  // ... 更多函数
};
```

### 端点常量 (`endpoints.ts`)
```typescript
export const API_ENDPOINTS = {
  getUserById: {
    path: '/users/{id}',
    method: 'GET'
  },
  // ... 更多端点
};
```

## 🔄 开发工作流

### 1. 开发环境设置
```bash
# 启动监控模式
node 03-api-generation/watch-mode.js

# 在另一个终端启动开发服务器
npm run dev
```

### 2. 更新流程
1. 修改Swagger文档
2. 工具自动检测变化
3. 重新生成类型和函数
4. 开发服务器热重载

### 3. 生产环境构建
```bash
# 生成所有服务的API
node 03-api-generation/multi-service.js

# 构建项目
npm run build
```

## 📚 下一步

- [自定义请求](../04-custom-request/) - 使用自定义HTTP客户端
- [项目集成](../05-integration/) - 集成到实际项目
- [高级用法](../06-advanced-usage/) - 学习更多技巧