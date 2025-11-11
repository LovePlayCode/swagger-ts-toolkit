# NPM 自动发布配置指南

本项目已配置 GitHub Actions 自动发布到 npm，每次推送到 `main` 分支时自动检查版本并发布。

---

## 📋 目录

1. [首次配置](#首次配置)
2. [工作流程](#工作流程)
3. [版本发布](#版本发布)
4. [常见问题](#常见问题)

---

## 🔧 首次配置

### 1. 获取 NPM Token

1. 登录 [npmjs.com](https://www.npmjs.com/)
2. 点击头像 → **Access Tokens**
3. 点击 **Generate New Token** → **Classic Token**
4. 选择 **Automation** 类型
5. **设置有效期**（推荐选项）：
   - **无期限**（No expiration）- 永不过期，但需定期轮换
   - **自定义期限** - 建议设置 90 天或更短
6. 复制生成的 token（只显示一次！请妥善保存）

**⚠️ Token 有效期说明：**
- **Classic Tokens**: 可以设置为永不过期或自定义期限
- **Granular Tokens** (Beta): 最长 1 年有效期
- **建议**: 即使设置为永不过期，也应该每 6-12 个月轮换一次以提高安全性

### 2. 配置 GitHub Secret

1. 打开你的 GitHub 仓库
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加密钥：
   - **Name**: `NPM_TOKEN`
   - **Value**: 粘贴刚才复制的 npm token
5. 点击 **Add secret**

### 3. 更新 package.json

确保 `package.json` 中的以下字段正确配置：

```json
{
  "name": "swagger-ts-toolkit",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/你的用户名/swagger-ts-toolkit.git"
  },
  "author": "Your Name <your.email@example.com>",
  "license": "MIT"
}
```

---

## 🔄 工作流程

### 自动发布流程

```
开发者推送代码到 main 分支
          ↓
GitHub Actions 触发 CI/CD
          ↓
运行测试 (Node 16.x, 18.x, 20.x)
          ↓
检查 package.json 中的版本号
          ↓
[版本已存在于 npm?]
   ├─ 是 → 跳过发布 ⏭️
   └─ 否 → 继续发布 ⬇️
          ↓
构建项目 (npm run build)
          ↓
发布到 npm (npm publish)
          ↓
创建 Git Tag (v1.0.3)
          ↓
创建 GitHub Release
          ↓
✅ 完成！
```

### 智能检测机制

- ✅ **自动跳过重复发布**：如果当前版本已存在于 npm，自动跳过
- ✅ **多环境测试**：在 Node.js 16/18/20 三个版本上测试
- ✅ **构建验证**：检查 `dist/` 目录中的关键文件
- ✅ **自动标签**：成功发布后自动创建 Git 标签和 GitHub Release

---

## 🚀 版本发布

### 方法 1: 使用交互式脚本（推荐）

```bash
npm run release
```

这个脚本会：
1. 显示当前版本
2. 让你选择升级类型（patch/minor/major）或自定义版本号
3. 自动更新 `package.json` 和 `package-lock.json`
4. 提示你更新 `CHANGELOG.md`
5. 询问是否提交并推送到 GitHub

### 方法 2: 使用 npm 命令

#### Patch 版本（修复 bug）
```bash
npm run version:patch  # 1.0.3 → 1.0.4
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.0.4"
git push origin main
```

#### Minor 版本（新功能）
```bash
npm run version:minor  # 1.0.3 → 1.1.0
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.1.0"
git push origin main
```

#### Major 版本（破坏性更新）
```bash
npm run version:major  # 1.0.3 → 2.0.0
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v2.0.0"
git push origin main
```

### 方法 3: 手动修改

1. 编辑 `package.json` 中的 `version` 字段
2. 运行 `npm install` 更新 `package-lock.json`
3. 更新 `CHANGELOG.md`
4. 提交并推送：
   ```bash
   git add package.json package-lock.json CHANGELOG.md
   git commit -m "chore: bump version to v1.0.4"
   git push origin main
   ```

---

## 📊 监控发布状态

### 查看 GitHub Actions 日志

1. 进入仓库的 **Actions** 标签页
2. 找到最近的 workflow run
3. 查看 `publish` job 的执行日志

### 验证发布成功

```bash
# 检查 npm 上的最新版本
npm view swagger-ts-toolkit version

# 查看包的详细信息
npm view swagger-ts-toolkit

# 测试安装
npm install swagger-ts-toolkit@latest
```

---

## ❓ 常见问题

### Q1: 为什么推送后没有自动发布？

**可能原因：**
- ✅ 当前版本已存在于 npm（会自动跳过）
- ✅ 推送到了非 `main` 分支
- ✅ 测试失败导致发布被跳过
- ✅ NPM_TOKEN 未配置或已过期

**解决方法：**
1. 检查 GitHub Actions 日志
2. 确认推送到 `main` 分支
3. 检查 `package.json` 中的版本号是否已升级
4. 验证 NPM_TOKEN 是否有效

### Q2: 如何撤回已发布的版本？

```bash
# 不推荐！npm 不允许删除已发布超过 72 小时的包
npm unpublish swagger-ts-toolkit@1.0.3

# 推荐：发布一个新的修复版本
npm run version:patch
git add package.json package-lock.json
git commit -m "fix: 修复 v1.0.3 的问题"
git push origin main
```

### Q3: 如何发布 beta 版本？

修改 `package.json`:
```json
{
  "version": "1.1.0-beta.1"
}
```

然后在 `.github/workflows/ci.yml` 的发布步骤中添加 `--tag beta`:
```yaml
- name: Publish to npm
  run: npm publish --tag beta
```

### Q4: 发布失败了怎么办？

1. **检查错误日志**：
   ```bash
   # 查看 GitHub Actions 日志中的错误信息
   ```

2. **常见错误**：
   - `ENEEDAUTH`: NPM_TOKEN 无效或过期 → 重新生成 token
   - `EPUBLISHCONFLICT`: 版本已存在 → 升级版本号
   - `E403`: 权限不足 → 检查 npm 包的所有者

3. **本地测试**：
   ```bash
   npm run build
   npm publish --dry-run  # 模拟发布
   ```

### Q5: 如何临时禁用自动发布？

在 `.github/workflows/ci.yml` 中修改：

```yaml
publish:
  if: false  # 临时禁用
```

或者删除整个 `publish` job。

---

## 🔐 安全建议

### Token 管理
1. ✅ **设置 Token 有效期**
   - 新建 token 时选择合适的有效期（推荐 90 天）
   - 或者设置为永不过期，但需定期手动轮换

2. ✅ **定期轮换 NPM_TOKEN**
   - 推荐频率：每 3-6 个月
   - 如果 token 设置了有效期，到期前记得更新
   - 使用日历提醒避免 token 过期导致发布失败

3. ✅ **监控 Token 状态**
   - 定期登录 npm 检查 token 是否仍然有效
   - 如果发布突然失败，首先检查 token 是否过期

### 如何更新过期的 Token

```bash
# 1. 生成新的 npm token（按照上面的步骤）

# 2. 更新 GitHub Secret
#    - 进入仓库 Settings → Secrets and variables → Actions
#    - 找到 NPM_TOKEN
#    - 点击 "Update" 按钮
#    - 粘贴新的 token
#    - 保存

# 3. 测试发布
#    - 推送一个版本升级到 main 分支
#    - 检查 GitHub Actions 是否成功发布
```

### 其他安全建议
4. ✅ **使用 Automation 类型的 token**（更安全，权限更少）
5. ✅ **不要在代码中硬编码 token**
6. ✅ **启用 npm 双因素认证 (2FA)**
7. ✅ **定期检查 GitHub Actions 日志**，发现异常及时处理
8. ✅ **限制 token 权限**（Automation token 只能发布，无法删除包）

---

## 📚 相关文档

- [npm 发布指南](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [语义化版本规范](https://semver.org/lang/zh-CN/)

---

## 📝 版本号规范

遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)：

```
主版本号.次版本号.修订号 (major.minor.patch)

1.0.3
│ │ │
│ │ └─ 修订号: bug 修复（向下兼容）
│ └─── 次版本号: 新功能（向下兼容）
└───── 主版本号: 破坏性更新（不向下兼容）
```

**示例：**
- `1.0.3 → 1.0.4`: 修复了一个 bug
- `1.0.4 → 1.1.0`: 添加了新功能
- `1.1.0 → 2.0.0`: 改变了 API，不兼容旧版本

---

## 🎯 最佳实践

### 发布前检查清单

- [ ] 所有测试通过 (`npm test`)
- [ ] Lint 检查通过 (`npm run lint`)
- [ ] 构建成功 (`npm run build`)
- [ ] 更新了 `CHANGELOG.md`
- [ ] 更新了版本号 (`package.json`)
- [ ] 提交信息清晰明确

### 推荐工作流

```bash
# 1. 开发功能
git checkout -b feature/new-feature
# ... 编写代码 ...

# 2. 提交到开发分支
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 3. 创建 Pull Request
# 通过 GitHub UI 创建 PR 到 main 分支

# 4. 代码审查通过后合并
# 合并后自动运行测试

# 5. 升级版本并推送
git checkout main
git pull
npm run release  # 交互式升级版本
# 或
npm run version:minor
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.1.0"
git push origin main

# 6. 自动发布！
# GitHub Actions 会自动发布到 npm
```

---

**🎉 配置完成！现在每次推送到 main 分支都会自动检查并发布新版本。**
