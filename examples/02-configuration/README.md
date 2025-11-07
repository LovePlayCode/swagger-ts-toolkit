# ⚙️ 配置示例

这里展示了如何配置 swagger-ts-toolkit 以适应不同的项目需求。

## 📁 文件说明

### `swagger-ts-toolkit.config.js`
完整的配置文件示例，包含：
- 基础配置选项
- 输出路径设置
- 服务映射配置

### `advanced-config.js`
高级配置示例，展示：
- 多环境配置
- 自定义生成选项
- 复杂项目结构配置
- 插件和中间件配置

## 🎯 配置类型

### 基础配置
```javascript
module.exports = {
  swagger: {
    localPaths: {
      userApi: './swagger/user-api.yaml'
    }
  },
  outputPath: './src/types/api.d.ts'
};
```

### 高级配置
```javascript
module.exports = {
  swagger: {
    localPaths: {
      userApi: './swagger/user-api.yaml',
      productApi: './swagger/product-api.json'
    },
    remotePaths: {
      paymentApi: 'https://api.example.com/swagger.json'
    }
  },
  outputPath: './src/types/api.d.ts',
  endpointsPath: './src/constants/endpoints.ts',
  backupPath: './backups/api-types.backup.d.ts',
  customClient: {
    enabled: true,
    middlewares: ['auth', 'logging']
  }
};
```

## 🔧 配置选项详解

### 必需配置
- `swagger`: Swagger文档路径配置
- `outputPath`: 类型文件输出路径

### 可选配置
- `endpointsPath`: API端点常量输出路径
- `backupPath`: 备份文件路径
- `customClient`: 自定义客户端配置
- `generateOptions`: 生成选项配置

## 🚀 使用方法

### 方式1: 配置文件
```bash
# 使用配置文件
npx swagger-ts-toolkit --config swagger-ts-toolkit.config.js
```

### 方式2: 环境变量
```bash
# 设置环境变量
export SWAGGER_CONFIG_PATH=./config/api-config.js
npx swagger-ts-toolkit
```

### 方式3: 程序化配置
```javascript
const { SwaggerTsGenerator } = require('swagger-ts-toolkit');

const generator = new SwaggerTsGenerator({
  // 配置选项
});
```

## 📚 下一步

- [API生成示例](../03-api-generation/) - 学习如何生成API
- [项目集成](../05-integration/) - 集成到实际项目中