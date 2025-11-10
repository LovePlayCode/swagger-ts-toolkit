# 更新日志

本文档记录了 swagger-ts-toolkit 的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

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
