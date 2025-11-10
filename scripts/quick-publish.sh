#!/bin/bash

# 快速发布脚本 - v1.0.1
# 用法: ./scripts/quick-publish.sh

set -e  # 遇到错误立即退出

echo "🚀 开始发布 swagger-ts-toolkit v1.0.1"
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
  echo "❌ 错误: 请在项目根目录执行此脚本"
  exit 1
fi

# 检查 npm 登录状态
echo "📋 1. 检查 npm 登录状态..."
if ! npm whoami &> /dev/null; then
  echo "❌ 错误: 未登录 npm，请先执行 'npm login'"
  exit 1
fi
NPM_USER=$(npm whoami)
echo "✅ 已登录为: $NPM_USER"
echo ""

# 检查 Git 状态
echo "📋 2. 检查 Git 状态..."
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  警告: 有未提交的更改"
  echo ""
  git status --short
  echo ""
  read -p "是否继续发布？(y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 发布已取消"
    exit 1
  fi
fi
echo ""

# 清理并构建
echo "📋 3. 清理并构建项目..."
npm run build
echo "✅ 构建完成"
echo ""

# 验证打包
echo "📋 4. 验证打包内容..."
npm pack --dry-run | tail -5
echo "✅ 打包验证通过"
echo ""

# 提交代码（如果有更改）
if ! git diff-index --quiet HEAD --; then
  echo "📋 5. 提交代码更改..."
  git add package.json CHANGELOG.md CONFIGURATION_FIX.md VERSION_UPDATE_GUIDE.md
  git add src/core/generator.ts src/types/index.ts
  git add examples/docs/generate-api.js
  
  git commit -m "fix: 修复配置路径无效问题，发布 v1.0.1

- 修复用户配置的路径被硬编码忽略的问题
- 新增 apiModulePath 配置项
- 支持多服务独立文件生成
- 修复生成代码的 TypeScript 错误
"
  
  git tag v1.0.1
  echo "✅ 代码已提交并创建标签"
else
  echo "📋 5. 创建版本标签..."
  if ! git tag | grep -q "^v1.0.1$"; then
    git tag v1.0.1
    echo "✅ 标签已创建"
  else
    echo "ℹ️  标签 v1.0.1 已存在"
  fi
fi
echo ""

# 发布到 npm
echo "📋 6. 发布到 npm..."
echo "⚠️  即将执行: npm publish --access public"
read -p "确认发布到 npm？(y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ 发布已取消"
  exit 1
fi

npm publish --access public
echo "✅ 发布成功！"
echo ""

# 推送到 Git
echo "📋 7. 推送到 Git 仓库..."
read -p "是否推送到 Git 仓库？(y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git push origin main --tags
  echo "✅ 已推送到 Git 仓库"
else
  echo "⚠️  跳过 Git 推送，请稍后手动执行:"
  echo "   git push origin main --tags"
fi
echo ""

# 验证发布
echo "📋 8. 验证发布..."
sleep 2  # 等待 npm 更新
PUBLISHED_VERSION=$(npm view swagger-ts-toolkit version 2>/dev/null || echo "unknown")
echo "✅ npm 上的最新版本: $PUBLISHED_VERSION"
echo ""

# 完成
echo "🎉 发布完成！"
echo ""
echo "📦 包名: swagger-ts-toolkit"
echo "🔖 版本: 1.0.1"
echo "👤 发布者: $NPM_USER"
echo ""
echo "🔗 查看包信息:"
echo "   https://www.npmjs.com/package/swagger-ts-toolkit"
echo ""
echo "📥 安装命令:"
echo "   npm install -g swagger-ts-toolkit@1.0.1"
echo ""
echo "✨ 下一步："
echo "   1. 在测试项目中验证新版本"
echo "   2. 更新文档（如果需要）"
echo "   3. 发布 Release Notes（如果有 GitHub）"
