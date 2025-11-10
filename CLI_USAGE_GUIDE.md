# 📚 CLI 使用指南

## 快速开始

### 1. 初始化配置文件

```bash
# 在你的项目根目录运行
npx stt init
```

这会创建 `swagger-ts-toolkit.config.js` 配置文件。

### 2. 编辑配置文件

```javascript
// swagger-ts-toolkit.config.js
export default {
  swagger: {
    localPaths: {
      // 配置你的 Swagger 文件路径
      userApi: 'docs/swagger/user-api.yaml',
      productApi: 'docs/swagger/product-api.json',
    },
    remoteUrls: {
      development: 'https://api-test.example.com/swagger/doc.json',
      production: 'https://api.example.com/swagger/doc.json',
    },
  },
  // 生成文件的输出路径
  outputPath: 'src/types/api.d.ts',
  endpointsPath: 'src/api/endpoints.ts',
  apiFunctionsPath: 'src/api/functions.ts',
  generateApiFunctions: true,
};
```

### 3. 生成代码

```bash
# 使用本地文件生成（默认服务）
npx stt generate --source local

# 生成指定服务
npx stt generate --source local --service userApi
npx stt generate --source local --service productApi

# 使用远程 URL 生成
npx stt generate --source remote --service production
```

## 命令详解

### `stt init` - 初始化配置文件

创建配置文件 `swagger-ts-toolkit.config.js`。

```bash
# 默认创建 JS 格式
npx stt init

# 创建 JSON 格式
npx stt init --format json
```

**生成的文件**:
- `swagger-ts-toolkit.config.js` (默认)
- `swagger-ts-toolkit.config.json` (JSON 格式)

### `stt generate` - 生成代码

从 Swagger/OpenAPI 文档生成 TypeScript 类型和 API 函数。

**别名**: `stt gen`

#### 选项

| 选项 | 简写 | 说明 | 默认值 |
|------|------|------|--------|
| `--source <type>` | `-s` | 数据源类型 (auto\|local\|remote) | `auto` |
| `--service <name>` | `-S` | 服务名称（配置文件中的 key） | `default` |
| `--config <path>` | `-c` | 配置文件路径 | 自动查找 |
| `--watch` | `-w` | 监听文件变化 | `false` |
| `--output <path>` | `-o` | 类型定义输出路径 | 配置文件中的值 |
| `--endpoints <path>` | `-e` | 端点常量输出路径 | 配置文件中的值 |
| `--functions <path>` | `-f` | API 函数输出路径 | 配置文件中的值 |
| `--api-functions` | - | 启用 API 函数生成 | `true` |
| `--no-api-functions` | - | 禁用 API 函数生成 | - |

#### 示例

```bash
# 基础用法：使用本地文件生成
npx stt generate --source local

# 生成指定服务
npx stt gen --source local --service userApi

# 使用远程 URL
npx stt gen --source remote --service production

# 监听文件变化（开发模式）
npx stt gen --watch

# 自定义输出路径
npx stt gen -o ./types/api.d.ts -e ./api/endpoints.ts

# 指定配置文件
npx stt gen -c ./my-config.js

# 禁用 API 函数生成
npx stt gen --no-api-functions
```

### `stt validate` - 验证 Swagger 文档

验证 Swagger 文档的正确性。

```bash
# 验证默认服务
npx stt validate

# 验证指定服务
npx stt validate --service userApi
```

## 配置文件

### 自动查找

CLI 会自动查找以下配置文件（按优先级）：

1. `swagger-ts-toolkit.config.js`
2. `swagger-ts-toolkit.config.mjs`
3. `swagger-ts-toolkit.config.json`
4. `stt.config.js`
5. `stt.config.mjs`
6. `stt.config.json`

### 配置项说明

```javascript
export default {
  // Swagger 文档配置
  swagger: {
    // 本地文件路径（key 就是服务名称）
    localPaths: {
      default: 'docs/swagger/api.yaml',
      userApi: 'docs/swagger/user.yaml',
      productApi: 'docs/swagger/product.json',
    },
    // 远程 URL
    remoteUrls: {
      development: 'https://api-test.example.com/swagger',
      production: 'https://api.example.com/swagger',
    },
  },
  
  // 输出路径
  outputPath: 'src/types/api.d.ts',           // 类型定义
  endpointsPath: 'src/api/endpoints.ts',      // 端点常量
  apiModulePath: 'src/api/module.ts',         // API 模块（兼容版）
  apiFunctionsPath: 'src/api/functions.ts',   // API 函数（推荐）
  
  // 其他配置
  backupPath: 'src/types/api.backup.d.ts',    // 备份文件
  tempJsonPath: 'temp/swagger.json',          // 临时文件
  generateApiFunctions: true,                 // 是否生成 API 函数
};
```

## 使用场景

### 场景 1: 单个 Swagger 文件

```bash
# 1. 创建配置
npx stt init

# 2. 编辑 swagger-ts-toolkit.config.js
export default {
  swagger: {
    localPaths: {
      default: 'docs/swagger.yaml',
    },
  },
  outputPath: 'src/types/api.d.ts',
  apiFunctionsPath: 'src/api/functions.ts',
};

# 3. 生成
npx stt generate --source local
```

### 场景 2: 多个后端服务

```bash
# 配置文件
export default {
  swagger: {
    localPaths: {
      userApi: 'docs/swagger/user-service.yaml',
      productApi: 'docs/swagger/product-service.yaml',
      orderApi: 'docs/swagger/order-service.yaml',
    },
  },
  outputPath: 'src/types/api.d.ts',
  endpointsPath: 'src/api/endpoints.ts',
  apiFunctionsPath: 'src/api/functions.ts',
};

# 生成所有服务
npx stt gen -S userApi
npx stt gen -S productApi
npx stt gen -S orderApi
```

### 场景 3: 开发和生产环境

```bash
# 配置文件
export default {
  swagger: {
    remoteUrls: {
      development: 'https://dev-api.example.com/swagger',
      production: 'https://api.example.com/swagger',
    },
  },
  outputPath: 'src/types/api.d.ts',
};

# 使用开发环境
npx stt gen --source remote --service development

# 使用生产环境
npx stt gen --source remote --service production
```

### 场景 4: 监听模式（开发中）

```bash
# 监听文件变化，自动重新生成
npx stt gen --watch

# 或在 package.json 中配置
{
  "scripts": {
    "api:watch": "stt gen -w",
    "api:gen": "stt gen --source local"
  }
}
```

## 生成的文件

运行 `npx stt generate` 后会生成以下文件：

```
src/
├── types/
│   └── api.d.ts                 # TypeScript 类型定义
└── api/
    ├── endpoints-userApi.ts     # 端点常量（多服务时）
    ├── endpoints-productApi.ts  
    ├── functions-userApi.ts     # API 函数（推荐使用）
    └── functions-productApi.ts
```

### 使用生成的代码

```typescript
// 导入类型
import type { components } from './types/api';

// 导入 API 函数
import { userApi } from './api/functions-userApi';

// 使用类型
type User = components['schemas']['User'];

// 调用 API
const user = await userApi.getUserById({ 
  pathParams: { id: 123 } 
});

const users = await userApi.getUserList({ 
  queryParams: { page: 1, pageSize: 20 } 
});
```

## 常见问题

### Q: 运行 `npx stt generate` 后文件没有生成到正确的目录？

**A**: 检查以下几点：

1. **是否有配置文件**？
   ```bash
   # 查看当前目录
   ls -la swagger-ts-toolkit.config.js
   
   # 如果没有，先创建
   npx stt init
   ```

2. **配置文件中的路径是否正确**？
   ```javascript
   // 确保路径相对于当前工作目录
   outputPath: 'src/types/api.d.ts',  // ✅ 正确
   outputPath: '/absolute/path/api.d.ts',  // ⚠️ 使用绝对路径
   ```

3. **是否指定了服务名称**？
   ```bash
   # 如果配置了多个服务，需要指定
   npx stt gen --service userApi
   ```

4. **手动指定输出路径**：
   ```bash
   npx stt gen -o ./my-types/api.d.ts -f ./my-api/functions.ts
   ```

### Q: 提示 "本地 Swagger 文件不存在"？

**A**: 

1. 检查配置文件中的路径是否正确：
   ```javascript
   localPaths: {
     default: 'docs/swagger.yaml',  // 确保文件存在
   }
   ```

2. 确认文件确实存在：
   ```bash
   ls -la docs/swagger.yaml
   ```

3. 使用远程 URL 代替：
   ```bash
   npx stt gen --source remote --service production
   ```

### Q: 如何查看详细的错误信息？

**A**: CLI 会自动显示详细错误和解决方案。如果需要更多信息，查看生成过程的日志输出。

### Q: 生成的文件覆盖了我的修改怎么办？

**A**: 工具会自动备份旧文件到 `backupPath` 指定的位置。不要直接修改生成的文件，而是：

1. 创建自己的包装文件
2. 使用继承或组合方式扩展生成的代码
3. 在单独的文件中添加自定义逻辑

## 在 package.json 中添加脚本

```json
{
  "scripts": {
    "api:init": "stt init",
    "api:gen": "stt generate --source local",
    "api:gen:user": "stt gen -S userApi",
    "api:gen:product": "stt gen -S productApi",
    "api:watch": "stt gen -w",
    "api:validate": "stt validate"
  }
}
```

然后使用：

```bash
npm run api:gen
npm run api:watch
```

## 与 CI/CD 集成

```yaml
# .github/workflows/api-gen.yml
name: Generate API Types

on:
  push:
    paths:
      - 'docs/swagger/**'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g swagger-ts-toolkit
      - run: stt generate --source local
      - run: git add src/types src/api
      - run: git commit -m "chore: update generated API types"
      - run: git push
```

## 获取帮助

```bash
# 查看命令帮助
npx stt --help
npx stt generate --help
npx stt init --help

# 查看版本
npx stt --version
```

---

如有问题或建议，请访问：https://github.com/yourusername/swagger-ts-toolkit
