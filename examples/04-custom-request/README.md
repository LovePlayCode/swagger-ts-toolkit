# 🌐 自定义请求客户端

本目录展示如何创建和使用自定义的 HTTP 请求客户端。

## 📂 文件说明

### 实现示例
- **middleware-examples.ts** - 自定义中间件、拦截器等高级功能
- **compatibility-test.js** - 客户端兼容性测试
- **type-compatibility-test.ts** - TypeScript 类型兼容性测试

## 🔌 支持的客户端

- Fetch API (原生)
- Axios
- Ky
- 自定义实现

## 🚀 快速开始

```bash
# 运行兼容性测试
node compatibility-test.js

# 运行类型测试
npx ts-node type-compatibility-test.ts
```

## 📋 常见用法

### 基础自定义客户端
```typescript
import { generateApi } from 'swagger-ts-toolkit';

const api = await generateApi({
  // ... 配置
  requestClient: customClient // 提供自定义客户端
});
```

### 中间件示例
- 请求拦截（添加认证、请求头等）
- 响应拦截（处理错误、转换数据等）
- 日志记录和调试

## 📚 相关文档

- 详见 `../10-documentation/custom-request-guide.md` 获取完整指南
- 详见 `../10-documentation/type-compatibility-fix.md` 了解类型兼容性问题
