# NPM 自动发布快速开始 🚀

## 一次性配置（5 分钟）

### 1️⃣ 获取 NPM Token
```bash
1. 访问 https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. 点击 "Generate New Token" → "Classic Token"
3. 选择 "Automation" 类型
4. 设置有效期（推荐 90 天，或选择永不过期但需定期轮换）
5. 复制 token（只显示一次！）

⚠️ 重要: 记录 token 创建日期和过期日期，设置日历提醒！
```

### 2️⃣ 配置 GitHub Secret
```bash
1. 打开仓库 Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. Name: NPM_TOKEN
4. Value: 粘贴你的 npm token
5. 点击 "Add secret"
```

### 3️⃣ 完成！✅

---

## 日常使用

### 快速发布新版本

```bash
# 方法 1: 交互式（推荐）
npm run release

# 方法 2: 命令行
npm run version:patch  # 1.0.3 → 1.0.4 (bug 修复)
npm run version:minor  # 1.0.3 → 1.1.0 (新功能)
npm run version:major  # 1.0.3 → 2.0.0 (破坏性更新)

# 然后提交并推送
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.0.4"
git push origin main
```

### 就这么简单！

推送到 `main` 分支后，GitHub Actions 会自动：
1. ✅ 运行测试
2. ✅ 构建项目
3. ✅ 检查版本是否已存在
4. ✅ 发布到 npm
5. ✅ 创建 Git 标签
6. ✅ 创建 GitHub Release

---

## 查看发布状态

### GitHub Actions
```
https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions
```

### NPM 包页面
```
https://www.npmjs.com/package/swagger-ts-toolkit
```

### 本地验证
```bash
npm view swagger-ts-toolkit version
```

---

## 常见命令

```bash
# 开发
npm run dev          # 监听模式编译
npm run build        # 构建项目
npm test             # 运行测试
npm run lint         # 代码检查

# 版本管理
npm run release      # 交互式升级版本
npm run version:patch  # 升级 patch 版本
npm run version:minor  # 升级 minor 版本
npm run version:major  # 升级 major 版本

# 本地测试发布
npm run build
npm publish --dry-run  # 模拟发布（不会真正发布）
```

---

## 版本号规则

```
major.minor.patch

1.0.3 → 1.0.4  修复 bug
1.0.4 → 1.1.0  添加新功能
1.1.0 → 2.0.0  破坏性更新
```

---

## 故障排查

### 问题：推送后没有自动发布

**检查项：**
1. 是否推送到了 `main` 分支？
2. 版本号是否已升级？
3. 该版本是否已存在于 npm？
4. GitHub Actions 是否运行成功？

**解决方法：**
```bash
# 查看 GitHub Actions 日志
https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions

# 检查当前 npm 版本
npm view swagger-ts-toolkit version

# 检查本地版本
node -p "require('./package.json').version"
```

### 问题：NPM_TOKEN 过期

**解决方法：**
```bash
# 1. 生成新 token
https://www.npmjs.com/settings/YOUR_USERNAME/tokens

# 2. 更新 GitHub Secret
Settings → Secrets → Actions → NPM_TOKEN → Update

# 3. 测试发布
npm run version:patch
git push origin main
```

**详细说明：** 查看 [NPM_TOKEN_MANAGEMENT.md](./NPM_TOKEN_MANAGEMENT.md)

---

## 🎯 完整流程示例

```bash
# 1. 创建新功能分支
git checkout -b feature/awesome-feature

# 2. 开发并提交
git add .
git commit -m "feat: add awesome feature"
git push origin feature/awesome-feature

# 3. 创建 PR 并合并到 main

# 4. 切换到 main 分支
git checkout main
git pull

# 5. 升级版本
npm run release
# 选择版本类型，更新 CHANGELOG，确认推送

# 6. 完成！
# 访问 https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions
# 查看自动发布进度
```

---

## 📚 详细文档

查看 [NPM_AUTO_PUBLISH_GUIDE.md](./NPM_AUTO_PUBLISH_GUIDE.md) 了解更多细节。

---

**💡 提示：** 第一次配置后，以后只需要 `npm run release` 就能自动发布新版本！
