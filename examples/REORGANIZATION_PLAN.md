# 📁 Examples 目录重新整理计划

## 🎯 整理目标
- 按功能分类，结构清晰
- 便于用户快速找到需要的示例
- 减少文件重复和冗余
- 保持向后兼容性

## 📂 新的目录结构

```
examples/
├── README.md                           # 总体说明和快速导航
├── 01-getting-started/                 # 🚀 入门示例
│   ├── README.md
│   ├── basic-usage.js                  # 基础使用
│   ├── quick-start.js                  # 快速开始
│   └── cli-usage.md                    # CLI使用说明
├── 02-configuration/                   # ⚙️ 配置示例
│   ├── README.md
│   ├── basic-config.js                 # 基础配置
│   ├── advanced-config.js              # 高级配置
│   ├── environment-config.js           # 环境配置
│   └── swagger-ts-toolkit.config.js    # 完整配置文件
├── 03-api-generation/                  # 🔧 API生成示例
│   ├── README.md
│   ├── single-service.js               # 单服务生成
│   ├── multi-service.js                # 多服务生成
│   ├── remote-swagger.js               # 远程Swagger
│   └── watch-mode.js                   # 监控模式
├── 04-custom-request/                  # 🌐 自定义请求客户端
│   ├── README.md
│   ├── fetch-client.ts                 # Fetch实现
│   ├── ky-client.ts                    # Ky实现
│   ├── axios-custom.ts                 # 自定义Axios
│   ├── middleware-examples.ts          # 中间件示例
│   └── compatibility-test.ts           # 兼容性测试
├── 05-integration/                     # 🔗 项目集成示例
│   ├── README.md
│   ├── react-project/                  # React项目集成
│   ├── vue-project/                    # Vue项目集成
│   ├── node-api/                       # Node.js API集成
│   └── microservices/                  # 微服务架构
├── 06-advanced-usage/                  # 🎯 高级用法
│   ├── README.md
│   ├── error-handling.js               # 错误处理
│   ├── development-workflow.js         # 开发工作流
│   ├── real-world-usage.ts            # 真实项目用法
│   └── performance-optimization.ts     # 性能优化
├── 07-testing/                         # 🧪 测试示例
│   ├── README.md
│   ├── unit-tests/                     # 单元测试
│   ├── integration-tests/              # 集成测试
│   └── mock-examples/                  # Mock示例
├── 08-swagger-files/                   # 📄 Swagger文档示例
│   ├── README.md
│   ├── petstore-api.yaml              # 宠物商店API
│   ├── user-service.json              # 用户服务API
│   ├── product-api.json               # 商品API
│   └── complex-api.yaml               # 复杂API示例
├── 09-generated-output/                # 📤 生成文件示例
│   ├── README.md
│   ├── api-types.d.ts                 # 类型定义
│   ├── api-functions.ts               # API函数
│   ├── endpoints.ts                   # 端点定义
│   └── usage-examples.ts              # 使用示例
└── 10-documentation/                   # 📚 文档和指南
    ├── README.md
    ├── custom-request-guide.md         # 自定义请求指南
    ├── type-compatibility-fix.md       # 类型兼容性修复
    ├── migration-guide.md              # 迁移指南
    └── troubleshooting.md              # 故障排除
```

## 🔄 文件迁移映射

### 当前文件 → 新位置

#### 入门示例
- `basic-usage.js` → `01-getting-started/basic-usage.js`
- `quick-start.js` → `01-getting-started/quick-start.js`
- `cli-examples.md` → `01-getting-started/cli-usage.md`

#### 配置相关
- `config-examples/complete-config.js` → `02-configuration/advanced-config.js`
- `config-examples/swagger-ts-toolkit.config.js` → `02-configuration/swagger-ts-toolkit.config.js`

#### API生成
- `multi-service.js` → `03-api-generation/multi-service.js`
- `remote-swagger.js` → `03-api-generation/remote-swagger.js`
- `watch-mode.js` → `03-api-generation/watch-mode.js`
- `docs/generate-api.js` → `03-api-generation/single-service.js`

#### 自定义请求
- `custom-request-examples.ts` → `04-custom-request/middleware-examples.ts`
- `test-custom-clients.js` → `04-custom-request/compatibility-test.ts`
- `test-type-compatibility.ts` → `04-custom-request/compatibility-test.ts` (合并)

#### 项目集成
- `microservices-setup.js` → `05-integration/microservices/setup.js`
- `project-integration/` → `05-integration/` (整理后)

#### 高级用法
- `error-handling.js` → `06-advanced-usage/error-handling.js`
- `development-workflow.js` → `06-advanced-usage/development-workflow.js`
- `real-world-usage.ts` → `06-advanced-usage/real-world-usage.ts`

#### Swagger文件
- `sample-swagger-files/` → `08-swagger-files/`
- `docs/swagger/` → `08-swagger-files/` (合并)

#### 生成文件示例
- `docs/generated/` → `09-generated-output/` (清理后保留示例)

#### 文档
- `docs/CUSTOM_REQUEST_GUIDE.md` → `10-documentation/custom-request-guide.md`
- `docs/TYPE_COMPATIBILITY_FIX.md` → `10-documentation/type-compatibility-fix.md`

## 🗑️ 清理文件

以下文件将被清理或合并：
- 重复的配置文件
- 过时的测试文件
- 冗余的文档
- 临时生成文件

## ✅ 整理后的优势

1. **结构清晰**：按功能分类，便于导航
2. **渐进式学习**：从基础到高级，循序渐进
3. **快速定位**：用户可快速找到需要的示例
4. **维护性好**：减少重复，便于维护更新
5. **文档完善**：每个目录都有详细说明

## 🚀 执行计划

1. 创建新目录结构
2. 移动和重命名文件
3. 更新文件内容和引用
4. 创建各级README.md
5. 清理冗余文件
6. 更新根目录文档