# 📚 Swagger-TS-Toolkit 示例集合

欢迎来到 swagger-ts-toolkit 的完整示例集合！这里按功能分类整理了所有使用示例，帮助您快速掌握工具的各种用法。

## 🗂 目录结构

### 📁 [01-getting-started](./01-getting-started/) - 🚀 入门示例
新手必看！从这里开始您的第一步：
- `basic-usage.js` - 最基础的使用方法
- `quick-start.js` - 5分钟快速上手
- `cli-usage.md` - 命令行工具完整指南

### 📁 [02-configuration](./02-configuration/) - ⚙️ 配置示例  
学习如何配置工具以适应不同项目需求：
- `swagger-ts-toolkit.config.js` - 标准配置文件
- `advanced-config.js` - 高级配置选项

### 📁 [03-api-generation](./03-api-generation/) - 🔧 API生成示例
掌握各种API生成技巧：
- `single-service.js` - 单服务生成
- `multi-service.js` - 多服务批量生成  
- `remote-swagger.js` - 远程Swagger文档
- `watch-mode.js` - 文件监控模式

### 📁 [04-custom-request](./04-custom-request/) - 🌐 自定义请求客户端
使用任何HTTP客户端替代默认axios：
- `middleware-examples.ts` - 中间件系统示例
- `compatibility-test.js` - 兼容性测试
- `test-type-compatibility.ts` - TypeScript类型测试

### 📁 [05-integration](./05-integration/) - 🔗 项目集成示例
真实项目集成指南：
- `react-project/` - React项目集成
- `vue-project/` - Vue项目集成  
- `node-api/` - Node.js API集成
- `microservices/` - 微服务架构

### 📁 [06-advanced-usage](./06-advanced-usage/) - 🎯 高级用法
深度使用技巧和最佳实践：
- `error-handling.js` - 错误处理策略
- `development-workflow.js` - 开发工作流
- `real-world-usage.ts` - 真实项目案例

### 📁 [07-testing](./07-testing/) - 🧪 测试示例
测试相关的示例和工具：
- `unit-tests/` - 单元测试示例
- `integration-tests/` - 集成测试
- `mock-examples/` - Mock数据示例

### 📁 [08-swagger-files](./08-swagger-files/) - 📄 Swagger文档示例
各种类型的Swagger文档示例：
- `petstore-api.yaml` - 经典宠物商店API
- `user-service.json` - 用户服务API
- `product-api.json` - 商品管理API
- `complex-api.yaml` - 复杂API示例

### 📁 [09-generated-output](./09-generated-output/) - 📤 生成文件示例
查看生成文件的结构和内容：
- `api-types.d.ts` - TypeScript类型定义
- `api-functions.ts` - API调用函数
- `endpoints.ts` - API端点常量
- `usage-examples.ts` - 使用示例

### 📁 [10-documentation](./10-documentation/) - 📚 文档和指南
详细的文档和技术指南：
- `custom-request-guide.md` - 自定义请求完整指南
- `type-compatibility-fix.md` - 类型兼容性技术细节
- `migration-guide.md` - 版本迁移指南
- `troubleshooting.md` - 常见问题解决

## 🎯 快速导航

### 👶 我是新手
1. 从 [入门示例](./01-getting-started/) 开始
2. 学习 [基础配置](./02-configuration/)
3. 尝试 [API生成](./03-api-generation/)

### 🔧 我想自定义
1. 查看 [自定义请求](./04-custom-request/) 
2. 学习 [高级配置](./02-configuration/advanced-config.js)
3. 参考 [高级用法](./06-advanced-usage/)

### 🏗 我要集成到项目
1. 选择对应的 [项目集成示例](./05-integration/)
2. 参考 [真实项目案例](./06-advanced-usage/real-world-usage.ts)
3. 查看 [测试示例](./07-testing/)

### 🐛 我遇到了问题
1. 查看 [故障排除指南](./10-documentation/troubleshooting.md)
2. 参考 [错误处理示例](./06-advanced-usage/error-handling.js)
3. 查看相关的技术文档

## 🚀 快速运行

```bash
# 克隆项目
git clone https://github.com/your-org/swagger-ts-toolkit.git
cd swagger-ts-toolkit/examples

# 运行基础示例
node 01-getting-started/basic-usage.js

# 运行快速开始
node 01-getting-started/quick-start.js

# 测试自定义客户端
node 04-custom-request/compatibility-test.js

# 运行多服务生成
node 03-api-generation/multi-service.js
```

## 💡 使用建议

### 学习路径建议
1. **入门阶段**: 01 → 02 → 03
2. **进阶阶段**: 04 → 05 → 06  
3. **专业阶段**: 07 → 08 → 09 → 10

### 项目类型建议
- **小型项目**: 使用 01、02、03 的示例即可
- **中型项目**: 重点参考 04、05、06 的内容
- **大型项目**: 全面学习所有示例，特别关注 05、06、07

### 技术栈建议
- **React项目**: 重点查看 05/react-project/
- **Vue项目**: 重点查看 05/vue-project/  
- **Node.js API**: 重点查看 05/node-api/
- **微服务架构**: 重点查看 05/microservices/

## 🤝 贡献指南

欢迎贡献更多示例！请确保：
1. 示例代码可以直接运行
2. 包含详细的注释说明
3. 提供对应的README文档
4. 遵循现有的目录结构

## 📞 获取帮助

- 📖 查看 [完整文档](../README.md)
- 🐛 提交 [Issue](https://github.com/your-org/swagger-ts-toolkit/issues)
- 💬 参与 [讨论](https://github.com/your-org/swagger-ts-toolkit/discussions)
- 📧 联系维护者

---

**开始您的 swagger-ts-toolkit 之旅吧！** 🚀