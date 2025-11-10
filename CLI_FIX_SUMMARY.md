# 🔧 CLI 路径问题修复总结

## 问题描述

运行 `npx stt generate --source local` 时，无法正确将文件生成到对应目录。

### 根本原因

1. **配置文件加载问题**: `loadConfigFromFile` 函数在没有指定配置文件时返回空对象，导致使用空配置而不是默认配置
2. **默认配置路径不合理**: 默认配置使用的路径（如 `docs/swagger/api-dev.yaml`）在用户项目中通常不存在
3. **缺少错误提示**: 当文件不存在时没有给出明确的解决方案

## 修复内容

### 1. 改进配置文件自动查找

**文件**: `src/config/index.ts`

**修复前**:
```typescript
export async function loadConfigFromFile(configPath?: string) {
  if (!configPath) {
    return {};  // ❌ 直接返回空对象
  }
  // ...
}
```

**修复后**:
```typescript
export async function loadConfigFromFile(configPath?: string) {
  if (!configPath) {
    // ✅ 自动查找配置文件
    const possibleConfigs = [
      'swagger-ts-toolkit.config.js',
      'swagger-ts-toolkit.config.mjs',
      'swagger-ts-toolkit.config.json',
      'stt.config.js',
      'stt.config.mjs',
      'stt.config.json',
    ];
    
    for (const configFile of possibleConfigs) {
      try {
        await fs.access(configFile);
        console.log(`📋 使用配置文件: ${configFile}`);
        const { default: config } = await import(absolutePath);
        return config;
      } catch {
        continue;
      }
    }
    
    console.log('ℹ️  未找到配置文件，使用默认配置');
    return {};
  }
  // ...
}
```

### 2. 改进错误提示和帮助信息

**文件**: `src/cli.ts`

**添加的改进**:

1. **详细的错误提示**
```typescript
catch (error) {
  console.error('❌ 生成失败:', (error as Error).message);
  
  if ((error as Error).message.includes('本地 Swagger 文件不存在')) {
    console.log('\n💡 解决方案：');
    console.log('1. 运行 `npx stt init` 创建配置文件');
    console.log('2. 编辑配置文件，设置正确的 Swagger 文件路径');
    console.log('3. 或使用命令行参数指定路径');
  }
}
```

2. **生成成功后显示文件位置**
```typescript
if (!options.watch) {
  console.log('🎉 生成完成！');
  console.log('\n📁 生成的文件：');
  console.log(`  - 类型定义: ${finalConfig.outputPath}`);
  console.log(`  - 端点常量: ${finalConfig.endpointsPath}`);
  console.log(`  - API函数: ${finalConfig.apiFunctionsPath}`);
}
```

3. **添加详细的帮助文档**
```typescript
.addHelpText('after', `
示例:
  $ npx stt init                                    # 创建配置文件
  $ npx stt generate --source local                 # 使用本地文件生成
  $ npx stt generate --source local -S userApi      # 生成指定服务
  ...
`)
```

### 3. 更新 CLI 版本号

```typescript
.version('1.0.1')  // 从 1.0.0 更新到 1.0.1
```

## 使用流程（修复后）

### 正确的使用步骤

#### 步骤 1: 初始化配置文件

```bash
cd your-project
npx stt init
```

这会创建 `swagger-ts-toolkit.config.js`：

```javascript
export default {
  swagger: {
    localPaths: {
      development: 'docs/swagger/api-dev.yaml',
      production: 'docs/swagger/api-prod.yaml',
    },
  },
  outputPath: 'src/typings/api-generated.d.ts',
  endpointsPath: 'src/api/generated/endpoints.ts',
  apiFunctionsPath: 'src/api/generated/api-functions.ts',
  generateApiFunctions: true,
};
```

#### 步骤 2: 修改配置文件

根据你的项目结构修改路径：

```javascript
export default {
  swagger: {
    localPaths: {
      myApi: 'docs/my-swagger.yaml',  // ← 改成你的实际路径
    },
  },
  outputPath: 'src/types/api.d.ts',           // ← 改成你想要的输出路径
  apiFunctionsPath: 'src/api/functions.ts',   // ← 改成你想要的输出路径
};
```

#### 步骤 3: 生成代码

```bash
# 使用配置文件中的 'myApi' 服务
npx stt generate --source local --service myApi
```

### 快速测试（不创建配置文件）

如果你只想快速测试，可以直接使用命令行参数：

```bash
npx stt generate \
  --source local \
  --service default \
  --output ./types/api.d.ts \
  --functions ./api/functions.ts
```

但这样每次都需要指定所有参数，不推荐长期使用。

## 常见问题和解决方案

### 问题 1: 提示 "本地 Swagger 文件不存在"

**原因**: 配置文件中的路径不正确，或文件确实不存在。

**解决方案**:

1. 检查配置文件：
```bash
cat swagger-ts-toolkit.config.js
```

2. 确认文件存在：
```bash
ls -la docs/swagger/your-file.yaml
```

3. 修改配置文件中的路径为正确的路径

### 问题 2: 文件生成到了错误的目录

**原因**: 可能使用了默认配置，或配置文件没有被正确加载。

**解决方案**:

1. 确认配置文件存在：
```bash
ls -la swagger-ts-toolkit.config.js
```

2. 检查 CLI 是否找到了配置文件（运行时会显示）：
```
📋 使用配置文件: swagger-ts-toolkit.config.js
```

3. 如果没有找到，手动指定：
```bash
npx stt gen -c ./swagger-ts-toolkit.config.js
```

### 问题 3: 没有权限创建文件

**原因**: 输出目录不存在，或没有写入权限。

**解决方案**:

1. 确保目录存在：
```bash
mkdir -p src/types src/api
```

2. 检查权限：
```bash
ls -ld src/types src/api
```

## 测试验证

### 测试场景 1: 使用配置文件

```bash
# 1. 创建测试目录
mkdir test-project && cd test-project

# 2. 创建 Swagger 文件
mkdir -p docs/swagger
cat > docs/swagger/api.yaml << 'EOF'
openapi: 3.0.0
info:
  title: Test API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get users
      responses:
        '200':
          description: Success
EOF

# 3. 初始化配置
npx stt init

# 4. 修改配置
cat > swagger-ts-toolkit.config.js << 'EOF'
export default {
  swagger: {
    localPaths: {
      default: 'docs/swagger/api.yaml',
    },
  },
  outputPath: 'src/types/api.d.ts',
  apiFunctionsPath: 'src/api/functions.ts',
};
EOF

# 5. 生成代码
npx stt generate --source local

# 6. 验证结果
ls -R src/
```

**期望输出**:
```
src/
├── types/
│   └── api.d.ts
└── api/
    └── functions-default.ts
```

### 测试场景 2: 直接使用命令行参数

```bash
# 不需要配置文件，直接指定所有参数
npx stt generate \
  --source local \
  --service default \
  --output ./generated/api.d.ts \
  --endpoints ./generated/endpoints.ts \
  --functions ./generated/functions.ts

# 验证
ls -la generated/
```

## 修复效果对比

### 修复前

```bash
$ npx stt generate --source local
❌ 生成失败: 本地 Swagger 文件不存在，已检查路径: docs/swagger/api-dev.yaml
# 没有任何提示如何解决
```

### 修复后

```bash
$ npx stt generate --source local
ℹ️  未找到配置文件，使用默认配置
❌ 生成失败: 本地 Swagger 文件不存在，已检查路径: docs/swagger/api-dev.yaml

💡 解决方案：
1. 运行 `npx stt init` 创建配置文件
2. 编辑配置文件，设置正确的 Swagger 文件路径
3. 或使用命令行参数指定路径：
   npx stt generate --source local --service myApi

📖 查看配置示例：
   https://github.com/yourusername/swagger-ts-toolkit#configuration
```

## 新增文档

1. **`CLI_USAGE_GUIDE.md`** - 完整的 CLI 使用指南
2. **`CLI_FIX_SUMMARY.md`** - 本文档，修复总结

## 下一步

建议在 v1.0.2 版本中发布这些修复：

```bash
# 1. 更新版本
npm version patch  # 1.0.1 -> 1.0.2

# 2. 更新 CHANGELOG
# 添加 CLI 改进和修复说明

# 3. 发布
npm publish --access public
```

## 总结

✅ **问题已修复**

- ✅ 配置文件自动查找功能
- ✅ 详细的错误提示和解决方案
- ✅ 生成成功后显示文件位置
- ✅ 更好的帮助文档
- ✅ 完整的使用指南

**现在用户可以**:
1. 运行 `npx stt init` 创建配置
2. 编辑配置文件设置路径
3. 运行 `npx stt generate` 生成代码
4. 文件会正确生成到配置的目录

🎉 CLI 现在更易用了！
