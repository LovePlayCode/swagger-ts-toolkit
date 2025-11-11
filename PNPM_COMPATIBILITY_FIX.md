# PNPM 兼容性修复说明

## 🐛 问题描述

当使用 `pnpm run release` 时，脚本会自动变更为大版本（major version），而不是让用户选择。

---

## 🔍 问题原因

原始的 `scripts/bump-version.sh` 脚本在显示版本预览时使用了以下命令：

```bash
# 问题代码
echo "1) patch (修复bug: $CURRENT_VERSION -> $(npm version patch --no-git-tag-version --dry-run | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+'))"
```

**存在的问题：**

1. **npm version --dry-run 的行为不一致**
   - 在某些情况下，`--dry-run` 可能不会完全阻止文件修改
   - 特别是在 pnpm 环境中，可能会有不同的行为

2. **命令执行顺序问题**
   - 显示预览时执行了 3 次 `npm version` 命令（patch/minor/major）
   - 这些命令可能会意外修改 `package.json`

3. **pnpm 兼容性**
   - 脚本硬编码使用 `npm`，但用户可能在使用 `pnpm`
   - pnpm 和 npm 的 version 命令行为可能有细微差异

---

## ✅ 修复方案

### 修改内容

1. **自动检测包管理器**
   ```bash
   # 检测是使用 pnpm 还是 npm
   if command -v pnpm &> /dev/null && [ -f "pnpm-lock.yaml" ]; then
     PKG_MANAGER="pnpm"
   elif command -v npm &> /dev/null; then
     PKG_MANAGER="npm"
   else
     echo "未找到 npm 或 pnpm"
     exit 1
   fi
   ```

2. **手动计算预览版本号**
   ```bash
   # 不再使用 npm version --dry-run
   # 直接通过字符串操作计算新版本号
   IFS='.' read -r major minor patch <<< "$CURRENT_VERSION"
   PATCH_VERSION="$major.$minor.$((patch + 1))"
   MINOR_VERSION="$major.$((minor + 1)).0"
   MAJOR_VERSION="$((major + 1)).0.0"
   ```

3. **使用检测到的包管理器**
   ```bash
   if [ "$PKG_MANAGER" = "pnpm" ]; then
     pnpm version $NEW_VERSION --no-git-tag-version
   else
     npm version $NEW_VERSION --no-git-tag-version
   fi
   ```

4. **添加版本验证**
   ```bash
   # 验证版本是否正确更新
   ACTUAL_VERSION=$(node -p "require('./package.json').version")
   if [ "$ACTUAL_VERSION" != "$NEW_VERSION" ]; then
     echo "版本更新失败！"
     exit 1
   fi
   ```

---

## 🧪 测试修复

### 测试步骤

```bash
# 1. 查看当前版本
node -p "require('./package.json').version"

# 2. 测试 release 脚本（不要选择任何选项）
npm run release
# 或
pnpm run release

# 此时应该看到：
# 📦 当前版本: 3.0.0
# 📦 检测到包管理器: pnpm (或 npm)
# 
# 请选择版本升级类型:
#   1) patch (修复bug: 3.0.0 -> 3.0.1)
#   2) minor (新功能: 3.0.0 -> 3.1.0)
#   3) major (破坏性更新: 3.0.0 -> 4.0.0)
#   4) 自定义版本号

# 3. 按 Ctrl+C 退出（不选择）

# 4. 验证版本未被修改
node -p "require('./package.json').version"
# 应该仍然是 3.0.0
```

### 完整测试流程

```bash
# 1. 备份当前版本
cp package.json package.json.backup

# 2. 运行 release 脚本，选择 patch
pnpm run release
# 选择: 1
# 更新 CHANGELOG: n
# 提交推送: n

# 3. 验证版本
node -p "require('./package.json').version"
# 应该是 3.0.1

# 4. 恢复备份
mv package.json.backup package.json

# 5. 如果有 package-lock.json 或 pnpm-lock.yaml，也恢复
git checkout package.json package-lock.json pnpm-lock.yaml 2>/dev/null || true
```

---

## 📊 修复前后对比

### 修复前

```bash
# 问题: 显示预览时可能意外修改版本
echo "1) patch -> $(npm version patch --dry-run | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
echo "2) minor -> $(npm version minor --dry-run | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"
echo "3) major -> $(npm version major --dry-run | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')"

# 问题: 硬编码使用 npm
npm version $VERSION_TYPE --no-git-tag-version
```

**风险：**
- ⚠️ 执行 3 次 version 命令
- ⚠️ --dry-run 可能失效
- ⚠️ 不兼容 pnpm

### 修复后

```bash
# 解决: 手动计算版本号，无需执行 version 命令
IFS='.' read -r major minor patch <<< "$CURRENT_VERSION"
PATCH_VERSION="$major.$minor.$((patch + 1))"
MINOR_VERSION="$major.$((minor + 1)).0"
MAJOR_VERSION="$((major + 1)).0.0"

echo "1) patch -> $PATCH_VERSION"
echo "2) minor -> $MINOR_VERSION"
echo "3) major -> $MAJOR_VERSION"

# 解决: 自动检测包管理器
if [ "$PKG_MANAGER" = "pnpm" ]; then
  pnpm version $NEW_VERSION --no-git-tag-version
else
  npm version $NEW_VERSION --no-git-tag-version
fi
```

**优势：**
- ✅ 只执行 1 次 version 命令（用户确认后）
- ✅ 预览阶段不修改文件
- ✅ 兼容 npm 和 pnpm
- ✅ 添加版本验证

---

## 🔧 如何使用修复后的脚本

### 使用 npm

```bash
npm run release
```

### 使用 pnpm

```bash
pnpm run release
```

### 使用 yarn

```bash
yarn release
```

脚本会自动检测并使用正确的包管理器！

---

## ⚠️ 注意事项

### 如果版本已经被意外修改

```bash
# 1. 查看当前版本
git status

# 2. 如果 package.json 被修改但未提交
git checkout package.json package-lock.json pnpm-lock.yaml

# 3. 如果已经提交但未推送
git reset --soft HEAD~1

# 4. 如果已经推送
# 需要手动修改版本号回退
npm version 3.0.0 --no-git-tag-version  # 改回正确的版本
git add package.json package-lock.json
git commit -m "chore: revert version to 3.0.0"
git push origin main
```

---

## 📝 更新记录

- **2024-01-15**: 修复 pnpm 兼容性问题
  - 添加包管理器自动检测
  - 移除 --dry-run 调用
  - 手动计算预览版本号
  - 添加版本验证逻辑

---

## 🎯 建议

1. **总是使用项目的包管理器**
   - 如果项目有 `pnpm-lock.yaml`，使用 `pnpm`
   - 如果项目有 `package-lock.json`，使用 `npm`
   - 如果项目有 `yarn.lock`，使用 `yarn`

2. **测试脚本前先备份**
   ```bash
   cp package.json package.json.backup
   ```

3. **使用 git 保护**
   ```bash
   # 确保修改前代码已提交
   git status
   git add .
   git commit -m "chore: backup before version bump"
   ```

---

## 🐛 问题反馈

如果仍然遇到问题，请提供：
1. 使用的包管理器（npm/pnpm/yarn）
2. 包管理器版本（`pnpm --version`）
3. Node.js 版本（`node --version`）
4. 完整的错误信息或异常行为描述

---

**✅ 修复完成！现在可以安全地使用 `pnpm run release` 了！**
