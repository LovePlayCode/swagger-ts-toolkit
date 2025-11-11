# 快速修复 GitHub Actions 403 错误

## 🚨 错误信息

```
remote: Permission to LovePlayCode/swagger-ts-toolkit.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/.../': The requested URL returned error: 403
Error: Process completed with exit code 128.
```

---

## ⚡ 快速修复（2 分钟）

### 步骤 1: 修改 workflow 文件

在 `.github/workflows/ci.yml` 文件顶部添加：

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# 👇 添加这个
permissions:
  contents: write  # 允许创建 tag 和 release
  packages: write

jobs:
  # ... 其他内容
```

### 步骤 2: 提交并推送

```bash
git add .github/workflows/ci.yml
git commit -m "fix: add GitHub Actions permissions"
git push origin main
```

### 步骤 3: 验证

访问 Actions 页面，查看新的运行结果：
```
https://github.com/LovePlayCode/swagger-ts-toolkit/actions
```

---

## ✅ 完成！

现在 GitHub Actions 可以：
- ✅ 推送 Git Tag
- ✅ 创建 GitHub Release
- ✅ 自动发布到 npm

---

## 📚 详细说明

查看完整的问题分析和解决方案：
- [GITHUB_ACTIONS_PERMISSION_FIX.md](./GITHUB_ACTIONS_PERMISSION_FIX.md)

---

## 🔧 替代方案

如果你有仓库管理员权限，也可以：

```
GitHub 仓库 → Settings → Actions → General
→ Workflow permissions
→ 选择 "Read and write permissions"
→ Save
```

**⚠️ 注意：** 推荐使用 workflow 文件中的权限声明（更安全）。
