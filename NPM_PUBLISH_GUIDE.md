# 📦 NPM 发布完整指南

## 前提条件

### 1. 注册 npm 账号
如果还没有 npm 账号，需要先注册：
```bash
# 访问 https://www.npmjs.com/signup 注册账号
# 或使用命令行注册
npm adduser
```

### 2. 登录 npm
```bash
# 登录到 npm
npm login

# 验证登录状态
npm whoami
```

### 3. 检查包名是否可用
```bash
# 检查包名是否已被占用
npm view swagger-ts-toolkit

# 如果显示 404，说明包名可用
# 如果显示包信息，需要更换包名
```

## 📋 发布前检查清单

### 步骤 1: 代码质量检查
```bash
# 1. 确保在主分支
git checkout main
git pull origin main

# 2. 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 3. 运行 TypeScript 编译
npm run build

# 4. 检查是否有编译错误
# 应该看到 dist 目录被创建，包含所有 .js 和 .d.ts 文件
```

### 步骤 2: 验证 package.json 配置

检查以下字段是否正确：

```json
{
  "name": "swagger-ts-toolkit",          // ✅ 包名
  "version": "1.0.0",                     // ✅ 版本号（首次发布）
  "description": "...",                   // ✅ 描述
  "main": "./dist/index.js",              // ✅ 入口文件
  "types": "./dist/index.d.ts",           // ✅ 类型定义
  "bin": {                                // ✅ CLI 命令
    "swagger-ts-toolkit": "./dist/cli.js",
    "stt": "./dist/cli.js"
  },
  "files": [                              // ✅ 要发布的文件
    "dist",
    "README.md",
    "LICENSE"
  ],
  "keywords": [...],                      // ✅ 关键词（帮助用户搜索）
  "author": "Your Name <your.email@example.com>",  // ⚠️ 需要填写
  "license": "MIT",                       // ✅ 许可证
  "repository": {                         // ⚠️ 建议添加
    "type": "git",
    "url": "https://github.com/yourusername/swagger-ts-toolkit.git"
  },
  "bugs": {                               // ⚠️ 建议添加
    "url": "https://github.com/yourusername/swagger-ts-toolkit/issues"
  },
  "homepage": "https://github.com/yourusername/swagger-ts-toolkit#readme"
}
```

### 步骤 3: 创建 .npmignore 文件（可选）

如果需要更精细的控制要发布的文件，创建 `.npmignore`：

```bash
# 开发文件
src/
examples/
*.ts
!*.d.ts

# 测试文件
test/
tests/
*.test.js
*.spec.js

# 配置文件
.vscode/
.idea/
.codebuddy/
tsconfig.json
.eslintrc.json
.prettierrc

# 文档
docs/
*.md
!README.md

# 其他
.git/
.gitignore
.DS_Store
node_modules/
coverage/
temp/
.temp/
```

### 步骤 4: 测试包内容

```bash
# 预览将要发布的文件
npm pack --dry-run

# 或者实际打包（会生成 .tgz 文件）
npm pack

# 查看打包内容
tar -tzf swagger-ts-toolkit-1.0.0.tgz

# 本地测试安装
npm install ./swagger-ts-toolkit-1.0.0.tgz -g

# 测试 CLI 命令
swagger-ts-toolkit --help
stt --help
stt init

# 测试完成后卸载
npm uninstall -g swagger-ts-toolkit
rm swagger-ts-toolkit-1.0.0.tgz
```

## 🚀 正式发布流程

### 方式一：手动发布（推荐首次发布）

```bash
# 1. 确保代码已提交
git status
git add .
git commit -m "chore: prepare for v1.0.0 release"

# 2. 构建项目
npm run build

# 3. 干运行检查（不会真正发布）
npm publish --dry-run

# 检查输出信息：
# - 包名和版本号是否正确
# - 文件列表是否包含必要文件
# - 文件大小是否合理

# 4. 正式发布
npm publish

# 首次发布公开包，使用：
npm publish --access public

# 5. 打标签并推送
git tag v1.0.0
git push origin main --tags
```

### 方式二：使用 npm version 自动化（后续版本）

```bash
# 1. 确保所有改动已提交
git status

# 2. 更新版本号（自动创建 commit 和 tag）
npm version patch   # 1.0.0 -> 1.0.1 (bug 修复)
npm version minor   # 1.0.0 -> 1.1.0 (新功能)
npm version major   # 1.0.0 -> 2.0.0 (破坏性更新)

# 3. 推送代码和标签
git push origin main --tags

# 4. 发布到 npm
npm publish
```

## ✅ 发布后验证

### 1. 检查 npm 包页面
```bash
# 在浏览器访问
https://www.npmjs.com/package/swagger-ts-toolkit

# 检查以下内容：
# - 版本号是否正确
# - README 显示是否正常
# - 文件列表是否完整
# - 下载统计是否开始计数
```

### 2. 测试安装
```bash
# 在新目录测试安装
mkdir test-install
cd test-install
npm init -y

# 安装你的包
npm install swagger-ts-toolkit

# 测试 API 导入
node -e "const { SwaggerTsGenerator } = require('swagger-ts-toolkit'); console.log(SwaggerTsGenerator)"

# 全局安装测试
npm install -g swagger-ts-toolkit

# 测试 CLI
swagger-ts-toolkit --version
swagger-ts-toolkit --help
stt init

# 清理
cd ..
rm -rf test-install
npm uninstall -g swagger-ts-toolkit
```

### 3. 检查类型定义
```bash
# 创建 TypeScript 项目测试
mkdir test-types
cd test-types
npm init -y
npm install swagger-ts-toolkit typescript @types/node

# 创建测试文件
cat > test.ts << 'EOF'
import { SwaggerTsGenerator } from 'swagger-ts-toolkit';

const generator = new SwaggerTsGenerator({
  outputPath: './types.d.ts'
});
EOF

# 编译检查
npx tsc --noEmit test.ts

# 清理
cd ..
rm -rf test-types
```

## 🔄 更新已发布的包

### 发布补丁版本（Bug 修复）
```bash
# 1. 修复 bug 并测试
npm run build
npm test

# 2. 更新版本
npm version patch  # 1.0.0 -> 1.0.1

# 3. 发布
npm publish
git push origin main --tags
```

### 发布次要版本（新功能）
```bash
# 1. 开发新功能
npm run build
npm test

# 2. 更新版本
npm version minor  # 1.0.1 -> 1.1.0

# 3. 发布
npm publish
git push origin main --tags
```

### 发布主要版本（破坏性更新）
```bash
# 1. 重大更新
npm run build
npm test

# 2. 更新 README 和迁移指南
# 3. 更新版本
npm version major  # 1.1.0 -> 2.0.0

# 4. 发布
npm publish
git push origin main --tags

# 5. 创建 GitHub Release 说明破坏性变更
```

## 🚨 常见问题和解决方案

### 问题 1: 包名已被占用
```bash
# 解决方案 1: 使用作用域包名
# 在 package.json 中修改：
"name": "@yourusername/swagger-ts-toolkit"

# 发布作用域包
npm publish --access public
```

### 问题 2: 需要双因素认证
```bash
# npm 可能要求启用 2FA
# 访问 https://www.npmjs.com/settings/yourusername/tfa
# 启用后，发布时输入验证码
npm publish --otp=123456
```

### 问题 3: 发布后发现问题
```bash
# 24 小时内可以撤销发布
npm unpublish swagger-ts-toolkit@1.0.0

# 或者快速发布修复版本
npm version patch
npm publish
```

### 问题 4: 文件包含不正确
```bash
# 检查实际打包内容
npm pack
tar -tzf swagger-ts-toolkit-*.tgz

# 调整 package.json 的 files 字段
# 或创建 .npmignore 文件
```

## 📊 发布检查清单

发布前确认：

- [ ] ✅ 已登录 npm (`npm whoami`)
- [ ] ✅ 包名可用或已确认
- [ ] ✅ package.json 所有字段正确
- [ ] ✅ 代码已构建 (`npm run build`)
- [ ] ✅ dist 目录包含所有必要文件
- [ ] ✅ LICENSE 文件存在
- [ ] ✅ README.md 完整且准确
- [ ] ✅ 本地测试通过
- [ ] ✅ Git 代码已提交
- [ ] ✅ 干运行检查通过 (`npm publish --dry-run`)

发布后确认：

- [ ] ✅ npm 包页面正常显示
- [ ] ✅ 安装测试成功
- [ ] ✅ CLI 命令可用
- [ ] ✅ TypeScript 类型正确
- [ ] ✅ Git 标签已推送
- [ ] ✅ GitHub Release 已创建（可选）

## 🎯 快速发布命令（首次）

```bash
# 一键发布脚本
cat > publish.sh << 'EOF'
#!/bin/bash
set -e

echo "🚀 开始发布流程..."

# 1. 检查登录状态
echo "📝 检查 npm 登录状态..."
npm whoami || { echo "❌ 请先登录: npm login"; exit 1; }

# 2. 清理并构建
echo "🧹 清理旧文件..."
rm -rf dist

echo "🔨 构建项目..."
npm run build

# 3. 干运行检查
echo "🔍 预检查..."
npm publish --dry-run

# 4. 确认发布
read -p "是否继续发布? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 发布中..."
    npm publish --access public
    
    echo "✅ 发布成功!"
    echo "🔗 查看: https://www.npmjs.com/package/swagger-ts-toolkit"
else
    echo "❌ 已取消发布"
    exit 1
fi
EOF

chmod +x publish.sh
./publish.sh
```

## 📚 相关资源

- [npm 官方文档](https://docs.npmjs.com/)
- [语义化版本](https://semver.org/lang/zh-CN/)
- [npm package.json 字段说明](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [npm 发布最佳实践](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## 🎉 发布成功后

1. ⭐ 在 GitHub 创建 Release
2. 📢 在社区分享（Twitter、Reddit、掘金等）
3. 📊 添加 npm 徽章到 README
4. 🔄 设置 GitHub Actions 自动发布（可选）

```markdown
<!-- 添加到 README.md -->
[![npm version](https://badge.fury.io/js/swagger-ts-toolkit.svg)](https://www.npmjs.com/package/swagger-ts-toolkit)
[![npm downloads](https://img.shields.io/npm/dm/swagger-ts-toolkit.svg)](https://www.npmjs.com/package/swagger-ts-toolkit)
```
