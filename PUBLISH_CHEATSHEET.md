# NPM 发布速查表 🚀

## 🔧 一次性配置（5 分钟）

```bash
# 1. 获取 NPM Token
https://www.npmjs.com/settings/YOUR_USERNAME/tokens
→ Generate New Token → Classic Token → Automation
→ 有效期: 90 days (推荐) ⚠️
→ 复制 token (只显示一次！)

# 2. 配置 GitHub Secret
仓库 Settings → Secrets and variables → Actions
→ New repository secret
→ Name: NPM_TOKEN
→ Value: 粘贴 token

# 3. 设置提醒 📅
日历提醒: Token 过期前 7 天更新
(如果设置了有效期)

# ✅ 完成！
```

---

## 📦 快速发布

```bash
# 🎯 推荐方法（交互式）
npm run release

# 📝 手动方法
npm run version:patch  # 或 minor/major
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.0.4"
git push origin main
```

---

## 🔢 版本号规则

```
major.minor.patch

1.0.3 → 1.0.4  🐛 修复 bug (patch)
1.0.4 → 1.1.0  ✨ 新功能 (minor)
1.1.0 → 2.0.0  💥 破坏性更新 (major)
```

---

## 📋 常用命令

```bash
# 开发
npm run dev         # 监听编译
npm run build       # 构建
npm test            # 测试
npm run lint        # 检查

# 发布
npm run release     # 交互式发布
npm run version:patch  # patch
npm run version:minor  # minor
npm run version:major  # major

# 验证
npm publish --dry-run  # 模拟发布
npm view swagger-ts-toolkit version  # 查看版本
```

---

## 🔍 检查发布状态

```bash
# GitHub Actions
https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions

# NPM 包
https://www.npmjs.com/package/swagger-ts-toolkit

# 本地验证
npm view swagger-ts-toolkit version
```

---

## ⚡ 快速故障排查

```bash
# 推送后没发布？
1. 检查是否推送到 main 分支
2. 检查版本号是否已升级
3. 检查 GitHub Actions 日志
4. 验证 NPM_TOKEN 是否配置

# Token 过期？⚠️
1. 生成新 token (90 天有效期)
2. 更新 GitHub Secret: NPM_TOKEN
3. 测试: npm run version:patch && git push

# 版本冲突？
npm view swagger-ts-toolkit version  # 查看已发布版本
npm run version:patch  # 升级版本号

# 构建失败？
rm -rf node_modules dist
npm install
npm run build
```

---

## 🎯 完整发布流程

```bash
# 1. 开发功能
git checkout -b feature/new-feature
# ... 编码 ...

# 2. 提交代码
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 3. 创建 PR → 合并到 main

# 4. 切换到 main
git checkout main
git pull

# 5. 发布
npm run release

# 6. 等待自动发布
# 查看: https://github.com/.../actions

# 7. 验证
npm view swagger-ts-toolkit version
```

---

## 📚 详细文档

- **快速开始**: [NPM_AUTO_PUBLISH_QUICKSTART.md](./NPM_AUTO_PUBLISH_QUICKSTART.md)
- **完整指南**: [NPM_AUTO_PUBLISH_GUIDE.md](./NPM_AUTO_PUBLISH_GUIDE.md)
- **Token 管理**: [NPM_TOKEN_MANAGEMENT.md](./NPM_TOKEN_MANAGEMENT.md) 🔐
- **配置总结**: [AUTO_PUBLISH_SETUP.md](./AUTO_PUBLISH_SETUP.md)
- **测试指南**: [TEST_AUTO_PUBLISH.md](./TEST_AUTO_PUBLISH.md)

---

**💡 记住：只需 `npm run release` 然后推送，其他自动完成！**

**⚠️ 重要：Token 有效期到期前记得更新！设置日历提醒！**
