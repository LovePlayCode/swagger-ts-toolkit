# 🔧 API 生成示例

本目录包含 API 代码生成的各种场景和用法示例。

## 📂 文件说明

### 基础生成
- **single-service.js** - 从单个 Swagger 文件生成 API
- **multi-service.js** - 同时生成多个服务的 API

### 进阶用法
- **remote-swagger.js** - 从远程 URL 获取 Swagger 文档并生成 API
- **watch-mode.js** - 监控 Swagger 文件变更，自动重新生成

## 🚀 快速开始

```bash
# 单服务生成
node single-service.js

# 多服务生成
node multi-service.js

# 远程文档处理
node remote-swagger.js

# 监控模式
node watch-mode.js
```

## 💡 使用场景

1. **开发初期**：使用 `single-service.js` 生成初始 API
2. **多服务架构**：使用 `multi-service.js` 管理多个微服务
3. **自动化流程**：使用 `watch-mode.js` 实现 CI/CD 集成
4. **外部 API**：使用 `remote-swagger.js` 集成第三方 API

## 📚 相关文档

- 详见 `../02-configuration/` 了解如何配置生成选项
- 详见 `../10-documentation/` 获取详细指南
