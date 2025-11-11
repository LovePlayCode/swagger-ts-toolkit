# 更新日志

本文档记录了 swagger-ts-toolkit 的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.3] - 2025-11-11

### 🚀 重大简化

- **API 函数生成器大幅简化** - 移除了约 200 行的中间件系统代码
  - 删除 `RequestMiddleware` 接口
  - 删除 `AxiosRequestClient` 类及其复杂的中间件处理逻辑
  - 删除所有内置中间件（`authMiddleware`、`errorHandlingMiddleware`、`loggingMiddleware`）
  - 删除自动初始化逻辑

### ✨ 优化改进

- **简化 `configureApiClient` 函数**（从 ~150 行减少到 ~25 行）
  - 保留核心功能：支持 `customClient` 或创建默认 axios 实例
  - 默认 axios 实例不再包含任何拦截器，保持纯净
  - 只做必要的 `response.data` 提取

### 📊 代码精简

- 生成文件从 ~650 行减少到 ~300 行（减少 **54%**）
- 接口定义从 5 个减少到 3 个
- 中间件相关代码完全移除

### 💡 设计理念

遵循"工具做好代码生成，用户掌控业务逻辑"的原则：
- 工具只提供最小必要的客户端管理
- 用户完全控制拦截器、认证、错误处理等业务逻辑
- 推荐用户使用自定义 axios 实例配置拦截器

### 📝 文档更新

- 新增 `SIMPLIFICATION_SUMMARY.md` - 详细的简化说明和使用示例
- 更新生成文件中的使用示例，展示如何使用自定义 axios 实例

### ⚠️ 向后兼容

- ✅ 保留 `getApiClient().request()` 用法
- ✅ 保留 `configureApiClient()` 函数
- ✅ 保留 `customClient` 支持
- ✅ 无破坏性变更

### 💡 迁移建议

如果之前依赖内置中间件，建议使用自定义 axios 实例：

```typescript
import axios from 'axios';
import { configureApiClient } from './api-functions';

const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 添加拦截器
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

configureApiClient({
  customClient: {
    request: (config) => instance.request(config)
  }
});
```

## [1.0.1] - 2025-11-10

### 🐛 Bug 修复

- **修复配置路径无效问题** - 修复了用户配置的 `outputPath`、`endpointsPath`、`apiFunctionsPath` 等路径部分被忽略的问题
- **修复 API 模块硬编码路径** - API 模块之前被硬编码生成到 `src/api/generated/`，现在可以通过配置自定义
- **修复生成代码的 TypeScript 错误** - 修复了生成的 API 函数代码中的模板字符串转义问题和重复定义问题

### ✨ 新功能

- **新增 `apiModulePath` 配置项** - 允许自定义兼容版本 API 模块的输出路径
- **多服务独立文件支持** - 现在为每个服务生成独立的端点文件、API 模块和 API 函数文件

### 📝 文档更新

- 新增 `CONFIGURATION_FIX.md` - 详细说明配置路径修复
- 更新 `examples/docs/generate-api.js` - 添加完整配置示例

### 🔧 改进

- 改进文件命名：多服务时自动添加服务名后缀（如 `api-module-userApi.ts`）
- 保持向后兼容：不配置 `apiModulePath` 时使用默认路径

## [1.0.0] - 2025-11-10

### 🎉 首次发布

- ✅ 支持从 Swagger/OpenAPI 文档自动生成 TypeScript 类型定义
- ✅ 生成 API 端点常量
- ✅ 生成可直接调用的 API 函数
- ✅ 支持 YAML 和 JSON 格式
- ✅ 支持本地文件和远程 URL
- ✅ 支持多个后端服务
- ✅ 文件监听和自动重新生成
- ✅ 完善的 CLI 命令行工具
- ✅ 灵活的配置系统
