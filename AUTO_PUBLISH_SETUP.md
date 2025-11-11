# GitHub Actions 自动发布配置完成 ✅

## 📦 配置内容

已为 `swagger-ts-toolkit` 项目配置完整的 NPM 自动发布流程。

---

## 🔧 修改的文件

### 1. `.github/workflows/ci.yml`
**改动：** 将 `publish` job 从 dry-run 改为真实发布

**新增功能：**
- ✅ 智能版本检测（自动跳过已发布的版本）
- ✅ 自动发布到 npm
- ✅ 自动创建 Git 标签
- ✅ 自动创建 GitHub Release
- ✅ 详细的日志输出

### 2. `package.json`
**新增 scripts：**
```json
"version:patch": "npm version patch --no-git-tag-version",
"version:minor": "npm version minor --no-git-tag-version",
"version:major": "npm version major --no-git-tag-version",
"release": "./scripts/bump-version.sh"
```

### 3. `scripts/bump-version.sh`
**新增文件：** 交互式版本升级脚本

**功能：**
- 显示当前版本和预览新版本
- 选择升级类型（patch/minor/major/自定义）
- 提示更新 CHANGELOG.md
- 自动提交并推送到 GitHub

### 4. 文档文件

- ✅ `NPM_AUTO_PUBLISH_GUIDE.md` - 完整配置指南
- ✅ `NPM_AUTO_PUBLISH_QUICKSTART.md` - 快速开始指南
- ✅ `README.md` - 添加发布流程说明

---

## 🚀 使用方法

### 第一步：配置 NPM Token（仅需一次）

1. **获取 NPM Token**
   ```
   访问：https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   点击：Generate New Token → Classic Token
   类型：Automation
   有效期：90 days (推荐) 或 No expiration
   复制：生成的 token
   
   ⚠️ 重要：
   - Token 只显示一次，请立即保存
   - 记录创建日期和过期日期
   - 设置日历提醒（到期前 7 天）
   ```

2. **配置 GitHub Secret**
   ```
   仓库 Settings → Secrets and variables → Actions
   New repository secret
   Name: NPM_TOKEN
   Value: 粘贴你的 npm token
   ```

3. **更新 package.json（如需要）**
   ```json
   {
     "repository": {
       "url": "git+https://github.com/你的用户名/swagger-ts-toolkit.git"
     },
     "author": "Your Name <your.email@example.com>"
   }
   ```

### 第二步：日常发布（每次需要发布时）

```bash
# 方法 1: 交互式（最简单）
npm run release

# 方法 2: 命令行
npm run version:patch  # 1.0.3 → 1.0.4
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.0.4"
git push origin main

# 方法 3: 手动修改
# 编辑 package.json 中的 version
npm install  # 更新 package-lock.json
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.0.4"
git push origin main
```

**就这么简单！** 推送到 `main` 分支后会自动发布。

---

## 🔄 自动化流程

```
推送到 main 分支
      ↓
GitHub Actions 触发
      ↓
运行测试（Node 16/18/20）
      ↓
检查版本是否已存在
      ↓
├─ 已存在 → 跳过发布 ⏭️
└─ 未发布 → 继续 ⬇️
      ↓
构建项目
      ↓
发布到 npm
      ↓
创建 Git 标签
      ↓
创建 GitHub Release
      ↓
✅ 完成
```

---

## 📊 工作流特性

### 智能版本检测
- 自动检查版本是否已存在于 npm
- 如果已存在，跳过发布并提示
- 避免重复发布错误

### 多环境测试
- Node.js 16.x, 18.x, 20.x
- 确保兼容性

### 构建验证
- 检查 `dist/index.js`
- 检查 `dist/index.d.ts`
- 检查 `dist/cli.js`

### 自动化操作
- 自动发布到 npm
- 自动创建 Git 标签（v1.0.3）
- 自动创建 GitHub Release
- 自动链接 CHANGELOG.md

---

## 🔍 监控和验证

### 查看发布状态

**GitHub Actions:**
```
https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions
```

**NPM 包页面:**
```
https://www.npmjs.com/package/swagger-ts-toolkit
```

**本地验证:**
```bash
# 查看最新版本
npm view swagger-ts-toolkit version

# 查看包信息
npm view swagger-ts-toolkit

# 测试安装
npm install swagger-ts-toolkit@latest
```

---

## 🛠️ 常用命令

```bash
# 开发
npm run dev          # 监听模式
npm run build        # 构建
npm test             # 测试
npm run lint         # 检查

# 版本管理
npm run release      # 交互式升级
npm run version:patch  # patch 版本
npm run version:minor  # minor 版本
npm run version:major  # major 版本

# 验证
npm run build
npm publish --dry-run  # 模拟发布
```

---

## ❓ 常见问题

### Q: 推送后没有自动发布？

**检查项：**
1. 是否推送到 `main` 分支？
2. 版本号是否已升级？
3. 该版本是否已存在于 npm？
4. NPM_TOKEN 是否配置正确？
5. 测试是否全部通过？

**解决方法：**
```bash
# 查看 Actions 日志
# https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions

# 检查本地版本
node -p "require('./package.json').version"

# 检查 npm 版本
npm view swagger-ts-toolkit version
```

### Q: 如何禁用自动发布？

临时禁用：在 `.github/workflows/ci.yml` 中设置
```yaml
publish:
  if: false  # 临时禁用
```

永久禁用：删除 `publish` job

### Q: 发布失败了怎么办？

1. 查看 GitHub Actions 错误日志
2. 常见错误：
   - `ENEEDAUTH`: NPM_TOKEN 无效 → 重新生成
   - `EPUBLISHCONFLICT`: 版本已存在 → 升级版本号
   - `E403`: 权限不足 → 检查包所有者
3. 本地测试：`npm publish --dry-run`

---

## 📝 版本号规范

遵循 [语义化版本](https://semver.org/lang/zh-CN/)：

```
major.minor.patch
  │     │     │
  │     │     └─ 修订号: bug 修复
  │     └─────── 次版本号: 新功能
  └───────────── 主版本号: 破坏性更新

示例：
1.0.3 → 1.0.4  修复 bug
1.0.4 → 1.1.0  新功能
1.1.0 → 2.0.0  API 变更
```

---

## 🎯 最佳实践

### 发布前检查清单
- [ ] 所有测试通过
- [ ] Lint 检查通过
- [ ] 构建成功
- [ ] 更新 CHANGELOG.md
- [ ] 升级版本号
- [ ] 提交信息清晰

### 推荐工作流
```bash
# 开发
git checkout -b feature/new-feature
# ... 编写代码 ...
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 创建 PR → 审查 → 合并到 main

# 发布
git checkout main
git pull
npm run release  # 交互式升级版本
# 自动发布！
```

---

## 🔐 安全建议

### Token 管理
1. ✅ **设置合理的 Token 有效期**
   - 推荐：90 天（更安全）
   - 或永不过期，但需每 3-6 个月手动轮换

2. ✅ **定期轮换 NPM_TOKEN**
   - 有期限 token：到期前 7 天更新
   - 永不过期 token：每 3-6 个月轮换
   - 使用日历提醒避免遗忘

3. ✅ **监控 Token 状态**
   - 定期检查 https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - 如果发布失败，首先检查 token 是否过期
   - 查看 [Token 管理指南](./NPM_TOKEN_MANAGEMENT.md)

### 其他安全建议
4. ✅ 使用 Automation 类型的 token（权限最小化）
5. ✅ 不要在代码中硬编码 token
6. ✅ 启用 npm 双因素认证
7. ✅ 定期检查 Actions 日志

---

## 📚 相关文档

- [完整配置指南](./NPM_AUTO_PUBLISH_GUIDE.md)
- [快速开始](./NPM_AUTO_PUBLISH_QUICKSTART.md)
- [Token 管理指南](./NPM_TOKEN_MANAGEMENT.md) 🆕
- [贡献指南](./CONTRIBUTING.md)
- [更新日志](./CHANGELOG.md)

---

## ✅ 配置完成检查

- [x] 修改 `.github/workflows/ci.yml`
- [x] 添加版本管理脚本
- [x] 更新 `package.json`
- [x] 创建完整文档
- [x] 更新 README.md
- [ ] 配置 NPM_TOKEN（需要手动完成）
- [ ] 测试首次发布

---

**🎉 配置完成！下一步：配置 NPM_TOKEN 并测试首次发布。**

查看 [NPM_AUTO_PUBLISH_QUICKSTART.md](./NPM_AUTO_PUBLISH_QUICKSTART.md) 快速上手。
