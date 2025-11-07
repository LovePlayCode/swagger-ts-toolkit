# 项目结构说明

## 📁 目录结构

```
swagger-ts-toolkit/
├── src/                          # 源代码目录
│   ├── config/                   # 配置管理模块
│   │   └── index.ts             # 默认配置和配置合并逻辑
│   ├── core/                     # 核心生成器
│   │   └── generator.ts         # 主要的 SwaggerTsGenerator 类
│   ├── generators/               # 代码生成器模块
│   │   ├── api-generator.ts     # API 函数生成器
│   │   ├── endpoints-generator.ts # 端点常量生成器
│   │   └── type-generator.ts    # TypeScript 类型生成器
│   ├── swagger/                  # Swagger 解析模块
│   │   └── parser.ts            # Swagger 文档解析和验证
│   ├── types/                    # 类型定义
│   │   └── index.ts             # 所有接口和类型定义
│   ├── utils/                    # 工具函数
│   │   ├── file-utils.ts        # 文件操作工具
│   │   └── string-utils.ts      # 字符串处理工具
│   ├── watcher/                  # 文件监听模块
│   │   └── file-watcher.ts      # 文件变化监听器
│   ├── test/                     # 测试文件
│   │   └── basic.test.js        # 基础功能测试
│   ├── cli.ts                    # CLI 命令行工具
│   └── index.ts                  # 主入口文件
├── dist/                         # 编译输出目录
├── examples/                     # 示例代码
│   ├── basic-usage.js           # 基本使用示例
│   ├── multi-service.js         # 多服务配置示例
│   ├── watch-mode.js            # 监听模式示例
│   ├── config-examples/         # 配置文件示例
│   └── http-client/             # HTTP 客户端实现示例
├── package.json                  # 项目配置
├── tsconfig.json                # TypeScript 配置
├── .eslintrc.json               # ESLint 配置
├── .prettierrc                  # Prettier 配置
├── .gitignore                   # Git 忽略文件
├── LICENSE                      # 许可证
└── README.md                    # 项目文档
```

## 🏗️ 架构设计

### 模块化设计原则

1. **单一职责**: 每个模块只负责一个特定功能
2. **低耦合**: 模块间依赖关系清晰，易于测试和维护
3. **高内聚**: 相关功能聚合在同一模块内
4. **可扩展**: 易于添加新的生成器或解析器

### 核心模块说明

#### 1. 配置管理 (`src/config/`)
- 管理默认配置和用户自定义配置
- 支持从文件加载配置
- 配置合并和验证逻辑

#### 2. Swagger 解析 (`src/swagger/`)
- 支持 YAML 和 JSON 格式
- 本地文件和远程 URL 解析
- 数据结构验证和错误处理

#### 3. 代码生成器 (`src/generators/`)
- **类型生成器**: 调用 openapi-typescript 生成类型定义
- **端点生成器**: 生成 API 端点常量
- **API 生成器**: 生成类型化的 API 调用函数

#### 4. 工具函数 (`src/utils/`)
- **文件工具**: 文件格式检测、YAML 转换、备份恢复
- **字符串工具**: 命名转换、格式化、转义

#### 5. 文件监听 (`src/watcher/`)
- 监听 Swagger 文档变化
- 自动触发重新生成

#### 6. 核心生成器 (`src/core/`)
- 统筹所有生成流程
- 错误处理和恢复机制
- 对外提供统一接口

## 🚀 主要特性

### ✅ 已实现功能

1. **多格式支持**: YAML 和 JSON 格式的 Swagger 文档
2. **多源支持**: 本地文件和远程 URL
3. **类型安全**: 完整的 TypeScript 类型定义生成
4. **API 常量**: 端点路径和方法常量生成
5. **API 函数**: 类型化的 API 调用函数生成
6. **文件监听**: 自动检测文档变化并重新生成
7. **多服务支持**: 可配置多个后端服务
8. **CLI 工具**: 完整的命令行界面
9. **配置管理**: 灵活的配置系统
10. **错误处理**: 完善的错误处理和恢复机制

### 🔧 技术栈

- **TypeScript**: 类型安全的 JavaScript
- **Node.js**: 运行时环境
- **Commander.js**: CLI 框架
- **js-yaml**: YAML 解析
- **chokidar**: 文件监听
- **openapi-typescript**: OpenAPI 类型生成

### 📋 使用场景

1. **前端团队**: 根据后端 API 文档自动生成类型定义
2. **全栈开发**: 保持前后端接口同步
3. **微服务架构**: 管理多个服务的 API 接口
4. **团队协作**: 标准化 API 调用方式

## 🔄 工作流程

1. **解析配置**: 加载用户配置和默认配置
2. **解析源**: 确定 Swagger 文档来源（本地/远程）
3. **格式转换**: YAML 转 JSON（如需要）
4. **备份文件**: 备份现有生成文件
5. **生成类型**: 调用 openapi-typescript 生成类型
6. **生成端点**: 提取并生成端点常量
7. **生成 API**: 生成类型化的 API 调用函数
8. **错误恢复**: 失败时从备份恢复

## 🧪 测试策略

- **单元测试**: 测试核心功能和工具函数
- **集成测试**: 测试完整的生成流程
- **CLI 测试**: 测试命令行工具功能

## 📈 扩展性

### 可扩展的地方

1. **新的生成器**: 可以添加新的代码生成器
2. **新的解析器**: 支持其他 API 文档格式
3. **新的输出格式**: 支持其他编程语言
4. **插件系统**: 支持用户自定义插件

### 优化建议

1. **缓存机制**: 避免重复解析相同文档
2. **增量生成**: 只生成变化的部分
3. **并行处理**: 多服务并行生成
4. **模板系统**: 可自定义生成模板

## 📦 发布准备

## 📦 发布信息

**包名**: `swagger-ts-toolkit`  
**CLI 命令**: `swagger-ts-toolkit` 或 `stt`  

项目已准备好发布到 npm：

- ✅ 完整的构建配置
- ✅ 类型定义文件  
- ✅ 双CLI命令支持（完整名称 + 简短别名）
- ✅ 文档和示例
- ✅ 测试覆盖
- ✅ ESLint 和 Prettier 配置