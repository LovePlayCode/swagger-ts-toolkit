#!/bin/bash
# NPM 发布脚本

set -e  # 遇到错误立即退出

echo "🚀 Swagger-TS-Toolkit NPM 发布流程"
echo "=================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 检查 npm 登录状态
echo "📝 检查 npm 登录状态..."
if ! npm whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ 未登录 npm${NC}"
    echo "请先运行: npm login"
    exit 1
fi
echo -e "${GREEN}✅ 已登录为: $(npm whoami)${NC}"
echo ""

# 2. 检查 Git 状态
echo "🔍 检查 Git 状态..."
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  检测到未提交的更改:${NC}"
    git status -s
    read -p "是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ 已取消发布${NC}"
        exit 1
    fi
fi
echo ""

# 3. 确保在 main 分支
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" ]]; then
    echo -e "${YELLOW}⚠️  当前分支: $BRANCH${NC}"
    read -p "建议在 main 分支发布，是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ 已取消发布${NC}"
        exit 1
    fi
fi
echo ""

# 4. 清理旧文件
echo "🧹 清理旧构建文件..."
rm -rf dist
echo -e "${GREEN}✅ 清理完成${NC}"
echo ""

# 5. 安装依赖
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "安装依赖..."
    npm install
fi
echo -e "${GREEN}✅ 依赖检查完成${NC}"
echo ""

# 6. 构建项目
echo "🔨 构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 构建成功${NC}"
echo ""

# 7. 检查构建产物
echo "🔍 检查构建产物..."
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist 目录不存在${NC}"
    exit 1
fi
if [ ! -f "dist/index.js" ] || [ ! -f "dist/index.d.ts" ]; then
    echo -e "${RED}❌ 缺少必要文件${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 构建产物检查通过${NC}"
echo ""

# 8. 获取当前版本
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📌 当前版本: $CURRENT_VERSION"
echo ""

# 9. 干运行检查
echo "🔍 执行发布预检查 (dry-run)..."
npm publish --dry-run
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 预检查失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 预检查通过${NC}"
echo ""

# 10. 显示将要发布的文件
echo "📦 将要发布的文件:"
echo "-------------------"
npm pack --dry-run 2>&1 | grep -E '^\s+[0-9]' | head -20
echo ""

# 11. 最终确认
echo -e "${YELLOW}⚠️  准备发布版本: $CURRENT_VERSION${NC}"
echo ""
read -p "确认发布到 npm? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ 已取消发布${NC}"
    exit 1
fi
echo ""

# 12. 正式发布
echo "🚀 正式发布中..."
npm publish --access public
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 发布失败${NC}"
    exit 1
fi
echo ""

# 13. 创建 Git 标签
echo "🏷️  创建 Git 标签..."
git tag -a "v$CURRENT_VERSION" -m "Release v$CURRENT_VERSION" 2>/dev/null || echo "标签已存在"
echo ""

# 14. 推送标签
read -p "是否推送标签到远程仓库? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin "v$CURRENT_VERSION" 2>/dev/null || echo "标签已推送"
    echo -e "${GREEN}✅ 标签已推送${NC}"
fi
echo ""

# 15. 成功提示
echo -e "${GREEN}🎉 发布成功!${NC}"
echo ""
echo "📊 发布信息:"
echo "  • 包名: swagger-ts-toolkit"
echo "  • 版本: $CURRENT_VERSION"
echo "  • 查看: https://www.npmjs.com/package/swagger-ts-toolkit"
echo ""
echo "🔄 后续步骤:"
echo "  1. 访问 npm 确认发布: https://www.npmjs.com/package/swagger-ts-toolkit"
echo "  2. 测试安装: npm install swagger-ts-toolkit"
echo "  3. 创建 GitHub Release: https://github.com/yourusername/swagger-ts-toolkit/releases/new"
echo ""
