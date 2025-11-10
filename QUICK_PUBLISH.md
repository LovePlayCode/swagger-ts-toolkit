# 🚀 快速发布指南

## 首次发布（10分钟快速版）

### 1. 准备工作（一次性）

```bash
# 注册 npm 账号（如果没有）
# 访问: https://www.npmjs.com/signup

# 登录 npm
npm login

# 验证登录
npm whoami
```

### 2. 更新 package.json

在发布前，**必须**更新以下字段：

```json
{
  "author": "你的名字 <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/你的用户名/swagger-ts-toolkit.git"
  }
}
```

### 3. 一键发布

```bash
# 使用发布脚本（推荐）
./scripts/publish.sh

# 或手动执行
npm run build
npm publish --dry-run  # 预检查
npm publish --access public  # 正式发布
```

## 常用命令速查

### 发布相关
```bash
# 登录 npm
npm login

# 检查登录状态
npm whoami

# 检查包名是否可用
npm view swagger-ts-toolkit

# 预览发布内容（不会真正发布）
npm publish --dry-run

# 查看将要打包的文件
npm pack --dry-run

# 正式发布
npm publish --access public

# 发布带 OTP（如果启用了2FA）
npm publish --otp=123456
```

### 版本管理
```bash
# 查看当前版本
npm version

# 更新补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 更新次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 更新主要版本 (1.0.0 -> 2.0.0)
npm version major

# 自定义版本
npm version 1.2.3
```

### Git 操作
```bash
# 创建标签
git tag v1.0.0

# 推送标签
git push origin v1.0.0

# 推送所有标签
git push --tags
```

## 完整流程（首次发布）

```bash
# 1. 确保在 main 分支
git checkout main

# 2. 更新 package.json 的 author 和 repository 字段
# （编辑器中手动修改）

# 3. 构建项目
npm run build

# 4. 预检查
npm publish --dry-run

# 5. 发布
npm publish --access public

# 6. 创建并推送标签
git tag v1.0.0
git push origin v1.0.0
```

## 发布后验证（3步检查）

```bash
# 1. 检查 npm 包页面
# 访问: https://www.npmjs.com/package/swagger-ts-toolkit

# 2. 测试安装
npm install swagger-ts-toolkit -g
swagger-ts-toolkit --version

# 3. 测试使用
mkdir test && cd test
npm init -y
npm install swagger-ts-toolkit
node -e "console.log(require('swagger-ts-toolkit'))"
```

## 版本更新发布（后续）

```bash
# 修复 bug 后发布补丁版本
npm version patch
npm publish
git push --tags

# 添加新功能后发布次要版本
npm version minor
npm publish
git push --tags

# 破坏性更新后发布主要版本
npm version major
npm publish
git push --tags
```

## 常见问题 FAQ

### Q: 包名已被占用怎么办？
A: 使用作用域包名
```bash
# 修改 package.json
"name": "@你的用户名/swagger-ts-toolkit"

# 发布
npm publish --access public
```

### Q: 发布失败显示 401 错误？
A: 需要重新登录
```bash
npm logout
npm login
```

### Q: 需要撤销已发布的版本？
A: 24小时内可以撤销
```bash
npm unpublish swagger-ts-toolkit@1.0.0
```

### Q: 如何发布 beta 版本？
A:
```bash
npm version 1.1.0-beta.1
npm publish --tag beta
```

### Q: 忘记构建就发布了怎么办？
A: 快速发布修复版本
```bash
npm run build
npm version patch
npm publish
```

## 发布检查清单（打印版）

### 发布前 ✓
- [ ] 已登录 npm
- [ ] 更新了 author 字段
- [ ] 更新了 repository 字段
- [ ] 运行了 `npm run build`
- [ ] dist 目录存在且完整
- [ ] 运行了 `npm publish --dry-run`
- [ ] 代码已提交到 Git

### 发布后 ✓
- [ ] npm 包页面正常
- [ ] 安装测试成功
- [ ] CLI 命令可用
- [ ] Git 标签已创建
- [ ] 标签已推送到远程

## 紧急回滚

如果发布后发现严重问题：

```bash
# 方案1: 撤销发布（仅24小时内）
npm unpublish swagger-ts-toolkit@1.0.0

# 方案2: 快速发布修复版本
npm version patch
npm publish
```

## 自动化发布（可选）

添加到 package.json：
```json
{
  "scripts": {
    "release:patch": "npm version patch && npm publish && git push --tags",
    "release:minor": "npm version minor && npm publish && git push --tags",
    "release:major": "npm version major && npm publish && git push --tags"
  }
}
```

使用：
```bash
npm run release:patch  # 发布补丁版本
```

## 下一步

1. ⭐ 发布成功后，在 GitHub 创建 Release
2. 📢 添加 npm 徽章到 README
3. 🎯 设置 GitHub Actions 自动化发布

```markdown
<!-- 徽章示例 -->
[![npm version](https://badge.fury.io/js/swagger-ts-toolkit.svg)](https://www.npmjs.com/package/swagger-ts-toolkit)
[![npm downloads](https://img.shields.io/npm/dm/swagger-ts-toolkit.svg)](https://www.npmjs.com/package/swagger-ts-toolkit)
```

---

💡 **提示**: 使用 `./scripts/publish.sh` 可以自动执行大部分步骤！
