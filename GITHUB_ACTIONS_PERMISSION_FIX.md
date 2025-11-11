# GitHub Actions 权限问题修复

## 🐛 问题描述

GitHub Actions 在尝试推送 Git Tag 时失败，错误信息：

```
remote: Permission to LovePlayCode/swagger-ts-toolkit.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/LovePlayCode/swagger-ts-toolkit/': The requested URL returned error: 403
Error: Process completed with exit code 128.
```

---

## 🔍 问题原因

GitHub Actions 默认的 `GITHUB_TOKEN` 权限从 2023 年开始变得更加严格：

### 默认权限设置

**旧版（2023 年前）：**
- `GITHUB_TOKEN` 拥有仓库的**读写权限**
- 可以直接推送 commits、tags、创建 releases

**新版（2023 年后）：**
- `GITHUB_TOKEN` 默认只有**读取权限**
- 需要显式声明 `permissions` 才能进行写操作

### 为什么会出现 403 错误？

1. **GitHub 仓库设置**
   - Settings → Actions → General → Workflow permissions
   - 默认设置为 "Read repository contents and packages permissions"

2. **缺少权限声明**
   - workflow 文件中没有声明 `permissions: contents: write`
   - `github-actions[bot]` 无法推送 tag 到仓库

---

## ✅ 解决方案

### 方案 1：修改 Workflow 文件（推荐）

在 `.github/workflows/ci.yml` 中添加权限声明：

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# 👇 添加全局权限
permissions:
  contents: write  # 允许创建 tag 和 release
  packages: write

jobs:
  test:
    # ... 测试 job
  
  publish:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    # 👇 或者在具体的 job 中添加权限
    permissions:
      contents: write  # 创建 tag 和 release
      packages: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}
      
      # ... 其他步骤
```

### 方案 2：修改 GitHub 仓库设置

如果你有仓库管理员权限：

1. **进入仓库设置**
   ```
   GitHub 仓库 → Settings → Actions → General
   ```

2. **修改 Workflow permissions**
   ```
   找到 "Workflow permissions" 部分
   
   选择：
   ☑ Read and write permissions
   ☐ Read repository contents and packages permissions (默认)
   ```

3. **保存设置**
   ```
   点击 "Save" 按钮
   ```

**⚠️ 注意：** 方案 2 会影响所有的 workflows，安全性较低，推荐使用方案 1。

---

## 🔐 权限说明

### 常用权限类型

| 权限 | 说明 | 用途 |
|------|------|------|
| `contents: read` | 读取仓库内容（默认） | 克隆代码、读取文件 |
| `contents: write` | 写入仓库内容 | 推送 commits、创建 tags |
| `packages: read` | 读取包 | 下载依赖 |
| `packages: write` | 写入包 | 发布包 |
| `pull-requests: write` | 写入 PR | 创建/更新 PR、添加评论 |
| `issues: write` | 写入 Issues | 创建/更新 Issues |

### 本项目需要的权限

```yaml
permissions:
  contents: write   # ✅ 推送 Git Tag
  packages: write   # ✅ 发布 npm 包（如果发布到 GitHub Packages）
```

---

## 🧪 验证修复

### 1. 本地测试配置

```bash
# 1. 确保修改已提交
git add .github/workflows/ci.yml
git commit -m "fix: add GitHub Actions permissions"
git push origin main
```

### 2. 观察 GitHub Actions

```
# 访问 Actions 页面
https://github.com/LovePlayCode/swagger-ts-toolkit/actions

# 查看最新的 workflow run
# 应该能看到 "Create Git Tag" 步骤成功
```

### 3. 验证 Tag 创建

```bash
# 本地拉取 tags
git fetch --tags

# 查看最新的 tag
git tag -l

# 应该能看到新创建的 tag，例如：
# v2.0.1
```

### 4. 验证 GitHub Release

```
# 访问 Releases 页面
https://github.com/LovePlayCode/swagger-ts-toolkit/releases

# 应该能看到自动创建的 Release
```

---

## 🔧 完整的修复后配置

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# 全局权限设置
permissions:
  contents: write
  packages: write

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    steps:
      # ... 测试步骤

  publish:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    # Job 级别的权限（可选，如果设置了全局权限）
    permissions:
      contents: write
      packages: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}  # 使用有权限的 token
      
      - name: Configure Git
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
      
      # ... 其他步骤
      
      - name: Create Git Tag
        if: steps.version_check.outputs.version_exists == 'false'
        run: |
          VERSION=${{ steps.version_check.outputs.current_version }}
          git tag -a "v$VERSION" -m "Release v$VERSION"
          git push origin "v$VERSION"  # ✅ 现在有权限了
      
      - name: Create GitHub Release
        if: steps.version_check.outputs.version_exists == 'false'
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # ✅ 现在有权限了
        with:
          tag_name: v${{ steps.version_check.outputs.current_version }}
          release_name: Release v${{ steps.version_check.outputs.current_version }}
          body: |
            🚀 自动发布版本 v${{ steps.version_check.outputs.current_version }}
          draft: false
          prerelease: false
```

---

## ⚠️ 常见问题

### Q1: 为什么只修改 workflow 文件还不够？

**A:** 如果仓库设置中明确禁用了写权限，即使 workflow 中声明了权限也无效。需要：
1. 确保仓库设置允许 workflows 有写权限
2. 在 workflow 中声明需要的权限

### Q2: 我不是仓库管理员，无法修改设置怎么办？

**A:** 联系仓库管理员（Owner）：
1. 让他们进入 Settings → Actions → General
2. 修改 "Workflow permissions" 为 "Read and write permissions"
3. 或者让他们添加你为仓库管理员

### Q3: 修改后仍然失败怎么办？

**A:** 检查以下几点：
```bash
# 1. 确认 workflow 文件中有 permissions 声明
grep -A 2 "permissions:" .github/workflows/ci.yml

# 2. 确认仓库设置
Settings → Actions → General → Workflow permissions
应该是 "Read and write permissions"

# 3. 确认 GITHUB_TOKEN 正确传递
在 workflow 中打印（脱敏）验证：
echo "Token length: ${#GITHUB_TOKEN}"
```

### Q4: 使用 Personal Access Token (PAT) 会更好吗？

**A:** 不推荐！原因：
- ❌ PAT 有更高的权限，安全风险更大
- ❌ PAT 会过期，需要定期更新
- ❌ PAT 绑定到个人账号，团队协作不便
- ✅ `GITHUB_TOKEN` 是最佳实践，权限刚好够用

### Q5: 如何限制权限只在特定 job 中生效？

**A:** 在 job 级别设置权限：
```yaml
jobs:
  test:
    # 测试 job 只需要读权限
    permissions:
      contents: read
    # ...
  
  publish:
    # 发布 job 需要写权限
    permissions:
      contents: write
      packages: write
    # ...
```

---

## 📊 权限级别对比

| 设置位置 | 优先级 | 适用场景 |
|---------|--------|---------|
| 仓库设置 | 最高 | 全局控制所有 workflows |
| Workflow 全局 | 中 | 控制单个 workflow 的所有 jobs |
| Job 级别 | 最低 | 精确控制特定 job 的权限 |

**推荐做法：**
- 仓库设置：保持默认（Read-only）
- Workflow 全局：不设置或设置最小权限
- Job 级别：按需设置权限（最佳实践）✅

---

## 🔒 安全建议

### 1. 最小权限原则

```yaml
# ✅ 好的做法：按需分配权限
jobs:
  test:
    permissions:
      contents: read  # 只读
  
  publish:
    permissions:
      contents: write  # 只在需要时才给写权限
```

```yaml
# ❌ 不好的做法：给所有 job 写权限
permissions:
  contents: write
  packages: write
  pull-requests: write
  issues: write
```

### 2. 定期审查权限

```bash
# 检查所有 workflows 的权限
find .github/workflows -name "*.yml" -exec grep -l "permissions:" {} \;

# 查看具体权限
grep -A 5 "permissions:" .github/workflows/*.yml
```

### 3. 监控异常行为

- 定期查看 Actions 日志
- 关注意外的 tag 创建
- 设置 GitHub 通知

---

## 📝 修复总结

### 修改文件
- ✅ `.github/workflows/ci.yml` - 添加 `permissions: contents: write`

### 修改内容
```yaml
# 在 workflow 顶层添加
permissions:
  contents: write
  packages: write

# 或在 publish job 中添加
publish:
  permissions:
    contents: write
    packages: write
```

### 预期效果
- ✅ GitHub Actions 可以推送 Git Tag
- ✅ GitHub Actions 可以创建 GitHub Release
- ✅ 自动发布流程完全正常

---

## 🎯 下一步

1. **提交修改**
   ```bash
   git add .github/workflows/ci.yml
   git commit -m "fix: add GitHub Actions permissions for tag creation"
   git push origin main
   ```

2. **测试发布**
   ```bash
   # 升级版本
   pnpm run release
   # 选择版本类型，提交并推送
   ```

3. **验证成功**
   ```
   查看 GitHub Actions: 
   https://github.com/LovePlayCode/swagger-ts-toolkit/actions
   
   查看 Releases:
   https://github.com/LovePlayCode/swagger-ts-toolkit/releases
   
   查看 Tags:
   https://github.com/LovePlayCode/swagger-ts-toolkit/tags
   ```

---

**✅ 修复完成！现在 GitHub Actions 有权限创建 Tag 和 Release 了！**
