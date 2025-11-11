# 测试自动发布功能

本文档说明如何测试自动发布功能（不会真正发布到 npm）。

---

## 🧪 本地测试发布脚本

### 1. 测试版本升级脚本（安全）

```bash
# 查看当前版本
node -p "require('./package.json').version"

# 测试 patch 版本升级（不会真正修改）
npm version patch --dry-run

# 测试 minor 版本升级（不会真正修改）
npm version minor --dry-run

# 测试 major 版本升级（不会真正修改）
npm version major --dry-run
```

### 2. 测试构建流程

```bash
# 清理
npm run clean

# 构建
npm run build

# 检查构建产物
ls -la dist/
test -f dist/index.js && echo "✅ index.js 存在"
test -f dist/index.d.ts && echo "✅ index.d.ts 存在"
test -f dist/cli.js && echo "✅ cli.js 存在"
```

### 3. 测试发布（模拟，不会真正发布）

```bash
# 确保已构建
npm run build

# 模拟发布
npm publish --dry-run
```

**预期输出：**
```
npm notice 📦  swagger-ts-toolkit@1.0.3
npm notice === Tarball Contents ===
npm notice 1.2kB  LICENSE
npm notice 5.4kB  README.md
npm notice 234B   package.json
npm notice 15.3kB dist/index.js
npm notice 2.1kB  dist/index.d.ts
npm notice 8.9kB  dist/cli.js
...
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access (dry-run)
+ swagger-ts-toolkit@1.0.3
```

### 4. 测试 bump-version.sh 脚本

**注意：** 这个测试需要手动中断，避免真正提交。

```bash
# 查看脚本内容
cat scripts/bump-version.sh

# 检查语法
bash -n scripts/bump-version.sh

# 如果想测试交互流程（小心！），运行后选择 'n' 不要提交
npm run release
```

---

## 🔍 验证 GitHub Actions 配置

### 1. 检查工作流文件

```bash
# 查看 CI 配置
cat .github/workflows/ci.yml

# 验证 YAML 语法（需要安装 yamllint）
# yamllint .github/workflows/ci.yml
```

### 2. 本地模拟 CI 步骤

```bash
# 1. 安装依赖
npm ci

# 2. 运行 linter
npm run lint

# 3. 构建项目
npm run build

# 4. 运行测试
npm test

# 5. 检查构建产物
test -f dist/index.js && echo "✅ index.js"
test -f dist/index.d.ts && echo "✅ index.d.ts"
test -f dist/cli.js && echo "✅ cli.js"

# 6. 检查版本
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "当前版本: $CURRENT_VERSION"

# 7. 检查该版本是否已发布
if npm view swagger-ts-toolkit@$CURRENT_VERSION version 2>/dev/null; then
  echo "⚠️  版本 $CURRENT_VERSION 已存在于 npm"
else
  echo "✅ 版本 $CURRENT_VERSION 未发布"
fi

# 8. 模拟发布
npm publish --dry-run
```

---

## 📝 测试场景

### 场景 1: 首次发布新版本

```bash
# 1. 升级版本（例如从 1.0.3 到 1.0.4）
npm run version:patch

# 2. 查看变化
git status
git diff package.json

# 3. 模拟发布
npm run build
npm publish --dry-run

# 4. 回滚（如果不想提交）
git checkout package.json package-lock.json
```

### 场景 2: 重复发布已存在版本

```bash
# 查看当前版本
CURRENT_VERSION=$(node -p "require('./package.json').version")

# 检查是否已发布
if npm view swagger-ts-toolkit@$CURRENT_VERSION version 2>/dev/null; then
  echo "✅ 测试通过: 版本已存在，GitHub Actions 会跳过发布"
else
  echo "ℹ️  版本未发布，可以正常发布"
fi
```

### 场景 3: 测试自动标签创建

```bash
# 查看当前标签
git tag -l

# 模拟创建标签
VERSION=$(node -p "require('./package.json').version")
echo "将创建标签: v$VERSION"

# 实际创建（测试用，可以删除）
git tag -a "test-v$VERSION" -m "Test release v$VERSION"
git tag -l | grep test

# 删除测试标签
git tag -d "test-v$VERSION"
```

---

## ✅ 完整测试检查清单

在配置 NPM_TOKEN 之前，确保以下测试都通过：

- [ ] `npm run build` 构建成功
- [ ] `npm test` 测试通过
- [ ] `npm run lint` 检查通过
- [ ] `npm publish --dry-run` 模拟发布成功
- [ ] `bash -n scripts/bump-version.sh` 脚本语法正确
- [ ] `.github/workflows/ci.yml` YAML 语法正确
- [ ] `dist/` 目录包含所有必需文件
- [ ] `package.json` 的 `files` 字段正确配置

---

## 🚀 准备真正发布

当所有测试通过后：

### 1. 配置 NPM Token

```bash
# 获取 NPM token
# 1. 访问 https://www.npmjs.com/settings/YOUR_USERNAME/tokens
# 2. Generate New Token → Classic Token → Automation
# 3. 复制 token

# 配置 GitHub Secret
# 1. GitHub 仓库 Settings → Secrets and variables → Actions
# 2. New repository secret
# 3. Name: NPM_TOKEN
# 4. Value: 粘贴 token
```

### 2. 升级版本并推送

```bash
# 方法 1: 使用交互式脚本
npm run release

# 方法 2: 手动升级
npm run version:patch
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v1.0.4"
git push origin main
```

### 3. 监控发布

```bash
# 查看 GitHub Actions
# https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions

# 等待几分钟后验证
npm view swagger-ts-toolkit version
```

---

## 🐛 故障排查

### 问题：npm publish --dry-run 失败

**错误：** `npm ERR! need auth`

**解决：** 这是正常的，dry-run 不需要认证。真正发布时 GitHub Actions 会使用 NPM_TOKEN。

---

### 问题：构建失败

**错误：** `Cannot find module ...`

**解决：**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### 问题：测试失败

**错误：** `ERR_MODULE_NOT_FOUND`

**解决：**
```bash
npm run build  # 确保 dist/ 目录存在
npm test
```

---

## 📊 预期的 GitHub Actions 输出

当推送到 main 分支后，你应该看到类似的输出：

```
✅ test (Node 16.x) - 通过
✅ test (Node 18.x) - 通过
✅ test (Node 20.x) - 通过
✅ publish - 开始

检查版本...
✅ 版本 1.0.4 未发布，准备发布

发布到 npm...
📦 发布版本: 1.0.4
+ swagger-ts-toolkit@1.0.4

创建 Git 标签...
✅ 标签 v1.0.4 已创建

创建 GitHub Release...
✅ Release v1.0.4 已创建

✅ publish - 完成
```

---

## 🎯 下一步

1. ✅ 完成所有本地测试
2. ⬜ 配置 NPM_TOKEN
3. ⬜ 升级版本号
4. ⬜ 推送到 main 分支
5. ⬜ 验证自动发布
6. ⬜ 检查 npm 包页面

---

**💡 提示：** 建议先在测试分支上验证 GitHub Actions 配置，确保 CI 通过后再配置 NPM_TOKEN。
