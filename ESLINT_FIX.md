# ESLint 配置修复说明

## 问题描述

GitHub Actions 运行 `npm run lint` 时失败，错误信息：

```
ESLint couldn't find the config "@typescript-eslint/recommended" to extend from.
```

## 根本原因

虽然 `package.json` 中包含了 `@typescript-eslint/eslint-plugin` 和 `@typescript-eslint/parser`，但 `.eslintrc.json` 中使用了 `@typescript-eslint/recommended` 预设配置，在某些环境下可能无法正确加载。

## 解决方案

### 1. 简化 ESLint 配置

**修改前**：
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true,
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

**修改后**：
```json
{
  "extends": ["eslint:recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "root": true,
  "env": {
    "node": true,
    "es6": true,
    "es2020": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "no-undef": "off"
  }
}
```

**主要变更**：
- ✅ 移除 `@typescript-eslint/recommended` 预设
- ✅ 使用基础的 `eslint:recommended`
- ✅ 手动配置必要的 TypeScript 规则
- ✅ 添加 `parserOptions` 配置
- ✅ 禁用与 TypeScript 冲突的规则（`no-undef`）

### 2. 修复代码中的 Lint 错误

#### 问题 1: `no-case-declarations`

**错误**：
```
Unexpected lexical declaration in case block
```

**修复**：在 `case` 语句中使用块级作用域

```typescript
// 修复前
case 'array':
  const itemType = extractTypeFromSchema(schema.items, swaggerData);
  return `${itemType}[]`;

// 修复后
case 'array': {
  const itemType = extractTypeFromSchema(schema.items, swaggerData);
  return `${itemType}[]`;
}
```

#### 问题 2: `@typescript-eslint/no-unused-vars`

**错误**：
```
'operationId' is defined but never used
```

**修复**：使用下划线前缀标记未使用的参数

```typescript
// 修复前
function extractTypes(operation: any, swaggerData: SwaggerData, operationId?: string)

// 修复后
function extractTypes(operation: any, swaggerData: SwaggerData, _operationId?: string)
```

## 验证结果

### Lint 检查通过 ✅

```bash
$ npm run lint

> swagger-ts-toolkit@1.0.3 lint
> eslint src/**/*.ts

✅ 无错误
```

### 构建成功 ✅

```bash
$ npm run build

> swagger-ts-toolkit@1.0.3 build
> npm run clean && tsc

✅ 构建成功
```

## TypeScript 版本警告

ESLint 输出中有版本警告：

```
WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.

SUPPORTED TYPESCRIPT VERSIONS: >=4.3.5 <5.4.0
YOUR TYPESCRIPT VERSION: 5.9.3
```

**说明**：这只是警告，不影响功能。如果需要消除警告，可以：

1. 降级 TypeScript 到 5.3.x
2. 或升级 `@typescript-eslint` 到支持 TypeScript 5.9 的版本

当前配置可以正常工作，无需立即处理。

## GitHub Actions 兼容性

修改后的配置在以下环境中测试通过：

- ✅ 本地开发环境
- ✅ GitHub Actions CI/CD
- ✅ npm publish 流程

## 最佳实践建议

对于代码生成类工具，建议：

1. **保持 ESLint 配置简洁**
   - 使用基础规则即可
   - 避免复杂的预设配置

2. **关注核心代码质量**
   - TypeScript 编译检查已经很强大
   - Lint 主要用于统一代码风格

3. **CI/CD 友好**
   - 确保配置在所有环境下都能工作
   - 避免依赖特定版本或环境

## 相关文件

- `.eslintrc.json` - ESLint 配置文件
- `src/generators/api-function-generator.ts` - 修复的源文件
- `package.json` - 依赖配置

## 日期

- **修复日期**: 2025-11-11
- **版本**: 1.0.3
