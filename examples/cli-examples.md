# 🖥️ CLI 命令示例

这个文件包含各种 CLI 使用场景的具体命令示例。

## 📋 基础命令

### 初始化配置
```bash
# 创建 JavaScript 配置文件（推荐）
npx stt init

# 创建 JSON 配置文件
npx stt init --format json

# 指定配置文件名
npx stt init --format js
```

### 基本生成
```bash
# 使用默认配置生成
npx stt generate

# 使用完整命令名
npx swagger-ts-toolkit generate

# 简写命令（推荐）
npx stt gen
```

## 🎯 指定数据源

### 本地文件
```bash
# 只使用本地文件
npx stt generate --source local

# 指定特定服务
npx stt generate --source local --service userService

# 使用本地文件并监听变化
npx stt generate --source local --watch
```

### 远程 URL
```bash
# 只使用远程 URL
npx stt generate --source remote

# 指定远程服务
npx stt generate --source remote --service production

# 远程 + 监听（不推荐，因为远程文件不会变化）
npx stt generate --source remote --service development
```

### 自动选择
```bash
# 自动选择（默认）：优先本地，本地不存在则使用远程
npx stt generate --source auto

# 等价于
npx stt generate
```

## 🏗️ 多服务场景

### 单个服务
```bash
# 生成用户服务类型
npx stt generate --service userService

# 生成订单服务类型
npx stt generate --service orderService

# 生成支付服务类型
npx stt generate --service paymentService
```

### 批量处理（使用脚本）
```bash
# 在 package.json 中配置脚本
{
  "scripts": {
    "api:generate:all": "npm run api:user && npm run api:order && npm run api:payment",
    "api:user": "stt generate --service userService",
    "api:order": "stt generate --service orderService", 
    "api:payment": "stt generate --service paymentService"
  }
}

# 然后运行
npm run api:generate:all
```

## 📁 自定义输出路径

### 指定输出文件
```bash
# 自定义类型定义输出路径
npx stt generate --output src/types/custom-api.d.ts

# 自定义端点常量输出路径
npx stt generate --endpoints src/api/custom-endpoints.ts

# 同时指定两个输出路径
npx stt generate \
  --output src/types/user-api.d.ts \
  --endpoints src/api/user-endpoints.ts \
  --service userService
```

### 按服务分离输出
```bash
# 为不同服务生成到不同文件
npx stt generate \
  --service userService \
  --output src/types/user-api.d.ts \
  --endpoints src/api/user-endpoints.ts

npx stt generate \
  --service orderService \
  --output src/types/order-api.d.ts \
  --endpoints src/api/order-endpoints.ts
```

## 🔄 开发工作流

### 开发环境
```bash
# 开发环境生成（通常使用监听模式）
npx stt generate --service development --watch

# 或者配置环境变量
NODE_ENV=development npx stt generate --watch
```

### 不同环境
```bash
# 测试环境
NODE_ENV=staging npx stt generate --service staging

# 生产环境  
NODE_ENV=production npx stt generate --service production

# 使用自定义配置文件
npx stt generate --config ./configs/swagger-prod.config.js
```

## 👀 监听模式

### 基本监听
```bash
# 监听默认服务
npx stt generate --watch

# 监听特定服务
npx stt generate --service userService --watch

# 监听并指定输出路径
npx stt generate --watch \
  --output src/types/api.d.ts \
  --endpoints src/api/endpoints.ts
```

### 高级监听配置
```bash
# 结合其他选项使用监听
npx stt generate \
  --source auto \
  --service development \
  --watch \
  --output src/types/dev-api.d.ts
```

## 🔍 验证命令

### 基本验证
```bash
# 验证默认配置
npx stt validate

# 验证特定服务
npx stt validate --service userService

# 验证远程文档
npx stt validate --source remote --service production
```

### 自定义配置验证
```bash
# 使用自定义配置文件
npx stt validate --config ./custom-config.js

# 验证特定数据源
npx stt validate --source local --service development
```

## 🛠️ 实用脚本配置

### package.json 脚本示例
```json
{
  "scripts": {
    "// 基础命令": "",
    "api:init": "stt init",
    "api:generate": "stt generate",
    "api:validate": "stt validate",
    
    "// 环境相关": "",
    "api:dev": "stt generate --service development --watch",
    "api:staging": "stt generate --service staging", 
    "api:prod": "stt generate --service production",
    
    "// 服务相关": "",
    "api:user": "stt generate --service userService",
    "api:order": "stt generate --service orderService",
    "api:payment": "stt generate --service paymentService",
    
    "// 批量操作": "",
    "api:generate:all": "npm run api:user && npm run api:order && npm run api:payment",
    "api:validate:all": "stt validate --service userService && stt validate --service orderService",
    
    "// 构建集成": "",
    "prebuild": "npm run api:generate",
    "predev": "npm run api:dev",
    "pretest": "npm run api:validate"
  }
}
```

### Makefile 示例
```makefile
# API 类型生成
.PHONY: api-init api-generate api-validate api-watch

api-init:
	npx stt init

api-generate:
	npx stt generate

api-validate:
	npx stt validate

api-watch:
	npx stt generate --watch

# 环境相关
api-dev:
	NODE_ENV=development npx stt generate --watch

api-staging:
	NODE_ENV=staging npx stt generate

api-prod:
	NODE_ENV=production npx stt generate

# 服务相关
api-user:
	npx stt generate --service userService

api-order:
	npx stt generate --service orderService

# 批量操作
api-all: api-user api-order api-payment
	@echo "所有服务类型生成完成"
```

## 🚀 CI/CD 集成

### GitHub Actions
```yaml
name: Generate API Types
on:
  push:
    paths: ['docs/swagger/**']
  pull_request:
    paths: ['docs/swagger/**']

jobs:
  api-types:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      # 安装依赖
      - run: npm ci
      
      # 生成 API 类型
      - run: npx stt generate --service production
      
      # 验证生成结果  
      - run: npx stt validate --service production
      
      # 检查是否有变化
      - run: git diff --exit-code || echo "API types updated"
```

### GitLab CI
```yaml
stages:
  - generate-api-types
  - validate

generate-api-types:
  stage: generate-api-types
  image: node:18
  script:
    - npm ci
    - npx stt generate --service $CI_ENVIRONMENT_NAME
  artifacts:
    paths:
      - src/types/
      - src/api/
  only:
    changes:
      - docs/swagger/**/*

validate-api:
  stage: validate
  image: node:18
  script:
    - npm ci
    - npx stt validate
  dependencies:
    - generate-api-types
```

## 🐛 调试和故障排除

### 详细输出
```bash
# 启用详细日志（如果工具支持）
DEBUG=swagger-ts-toolkit npx stt generate

# 或使用 verbose 模式（需要工具支持）
npx stt generate --verbose
```

### 常见问题排查
```bash
# 检查配置文件
npx stt validate --config swagger-ts-toolkit.config.js

# 测试网络连接
curl -I https://your-api.com/swagger/doc.json

# 检查文件权限
ls -la src/types/
ls -la docs/swagger/

# 验证 Swagger 文档格式
# 可以使用在线工具或其他验证器
```

## 💡 最佳实践

### 开发环境
```bash
# 推荐的开发命令
npm run api:dev  # 启动监听模式

# 或者
npx stt generate --service development --watch
```

### 生产部署
```bash
# 构建前生成最新类型
npm run prebuild  # 自动调用 api:generate

# 显式生成生产类型
npx stt generate --service production
```

### 团队协作
```bash
# 每个开发者在开始工作前运行
npm run api:generate

# 或添加到 git hooks
# .git/hooks/post-merge
#!/bin/sh
npm run api:generate
```

---

💡 **提示**: 建议将常用命令配置为 npm scripts，这样团队成员使用更方便，也便于 CI/CD 集成。