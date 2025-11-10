# 🔧 配置路径问题修复总结

## 问题描述

在之前的版本中，即使用户在配置文件中提供了 `outputPath`、`endpointsPath`、`apiFunctionsPath`、`backupPath`、`tempJsonPath` 等配置项，这些配置在实际运行时**部分或全部无效**。

### 具体问题

1. **硬编码的 API 模块路径**：`apiModulePath` 被硬编码为 `src/api/generated/${service}.ts`，无法通过配置修改
2. **部分路径未使用配置**：生成器内部直接使用了硬编码路径而不是配置的路径

## 修复内容

### 1. 添加 `apiModulePath` 配置项

**文件**: `src/types/index.ts`

```typescript
export interface GeneratorConfig {
  // ... 其他配置
  /** API模块输出路径（兼容旧版本） */
  apiModulePath?: string;  // ← 新增配置项
  // ...
}
```

### 2. 修复生成器逻辑

**文件**: `src/core/generator.ts`

**修复前**（硬编码路径）:
```typescript
// 生成API模块（兼容旧版本）
const apiModulePath = `src/api/generated/${service}.ts`;  // ❌ 硬编码
await generateApiModule(swaggerData, apiModulePath, service);
```

**修复后**（使用配置）:
```typescript
// 生成API模块（兼容旧版本，使用配置的路径）
const apiModulePath = this.config.apiModulePath 
  ? (service !== 'default' 
    ? this.config.apiModulePath.replace('.ts', `-${service}.ts`)
    : this.config.apiModulePath)
  : `src/api/generated/${service}.ts`;  // 向后兼容
await generateApiModule(swaggerData, apiModulePath, service);
```

### 3. 支持多服务独立文件

现在所有生成的文件都支持按服务名称分离：

- `api-types.d.ts` - 类型定义（共享）
- `endpoints-{service}.ts` - 每个服务独立的端点文件
- `api-module-{service}.ts` - 每个服务独立的 API 模块
- `api-functions-{service}.ts` - 每个服务独立的 API 函数

## 使用示例

### 完整配置示例

```javascript
import { SwaggerTsGenerator } from 'swagger-ts-toolkit';
import path from 'path';

const generator = new SwaggerTsGenerator({
  swagger: {
    localPaths: {
      userApi: path.resolve(__dirname, 'swagger/user-api.yaml'),
      productApi: path.resolve(__dirname, 'swagger/product-api.json'),
    }
  },
  
  // ✅ 所有路径配置现在都生效
  outputPath: path.resolve(__dirname, 'generated/api-types.d.ts'),
  endpointsPath: path.resolve(__dirname, 'generated/endpoints.ts'),
  apiModulePath: path.resolve(__dirname, 'generated/api-module.ts'),  // 🆕
  apiFunctionsPath: path.resolve(__dirname, 'generated/api-functions.ts'),
  backupPath: path.resolve(__dirname, 'generated/.backup/api-types.backup.d.ts'),
  tempJsonPath: path.resolve(__dirname, '.temp/swagger-converted.json'),
  generateApiFunctions: true,
});

// 生成 userApi
await generator.generate({
  source: 'local',
  service: 'userApi'
});

// 生成 productApi
await generator.generate({
  source: 'local', 
  service: 'productApi'
});
```

### 生成的文件结构

```
generated/
├── api-types.d.ts                      # ✅ 使用 outputPath
├── endpoints-userApi.ts                # ✅ 使用 endpointsPath + service
├── endpoints-productApi.ts             # ✅ 使用 endpointsPath + service
├── api-module-userApi.ts               # ✅ 使用 apiModulePath + service
├── api-module-productApi.ts            # ✅ 使用 apiModulePath + service
├── api-functions-userApi.ts            # ✅ 使用 apiFunctionsPath + service
├── api-functions-productApi.ts         # ✅ 使用 apiFunctionsPath + service
└── .backup/
    └── api-types.backup.d.ts           # ✅ 使用 backupPath

.temp/
└── swagger-converted.json              # ✅ 使用 tempJsonPath
```

## 验证修复

### 测试方法

1. 清理旧文件
```bash
rm -rf src/api examples/docs/generated/*.ts
```

2. 运行生成脚本
```bash
node examples/docs/generate-api.js
```

3. 验证结果
```bash
# ✅ 所有文件都应该在配置的 generated 目录下
ls -lh examples/docs/generated/

# ✅ src/api 目录不应该被创建
ls src/api  # 应该显示 "No such file or directory"
```

## 向后兼容性

- ✅ 如果不提供 `apiModulePath`，仍使用默认路径 `src/api/generated/${service}.ts`
- ✅ 所有现有配置继续有效
- ✅ 没有破坏性更改

## 影响的文件

- ✅ `src/types/index.ts` - 添加 `apiModulePath` 类型定义
- ✅ `src/core/generator.ts` - 修复路径使用逻辑
- ✅ `examples/docs/generate-api.js` - 更新示例配置

## 测试结果

**修复前**:
```bash
# ❌ 文件生成到硬编码路径
src/api/generated/userApi.ts
src/api/generated/productApi.ts
```

**修复后**:
```bash
# ✅ 文件生成到配置路径
examples/docs/generated/api-module-userApi.ts
examples/docs/generated/api-module-productApi.ts
examples/docs/generated/api-functions-userApi.ts
examples/docs/generated/api-functions-productApi.ts
examples/docs/generated/endpoints-userApi.ts
examples/docs/generated/endpoints-productApi.ts
examples/docs/generated/api-types.d.ts
```

## 总结

✅ **问题已完全修复**

所有配置路径现在都能正确生效：
- ✅ `outputPath` - 类型定义文件路径
- ✅ `endpointsPath` - 端点常量文件路径
- ✅ `apiModulePath` - API 模块文件路径（新增）
- ✅ `apiFunctionsPath` - API 函数文件路径
- ✅ `backupPath` - 备份文件路径
- ✅ `tempJsonPath` - 临时文件路径

用户现在可以完全自定义所有生成文件的输出位置！🎉
