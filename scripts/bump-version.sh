#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取当前版本
CURRENT_VERSION=$(node -p "require('./package.json').version")

echo -e "${YELLOW}📦 当前版本: $CURRENT_VERSION${NC}\n"

# 版本类型选择
echo "请选择版本升级类型:"
echo "  1) patch (修复bug:      $CURRENT_VERSION -> $(npm version patch --no-git-tag-version --dry-run | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+'))"
echo "  2) minor (新功能:       $CURRENT_VERSION -> $(npm version minor --no-git-tag-version --dry-run | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+'))"
echo "  3) major (破坏性更新:   $CURRENT_VERSION -> $(npm version major --no-git-tag-version --dry-run | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+'))"
echo "  4) 自定义版本号"
echo ""
read -p "请输入选择 (1-4): " choice

case $choice in
  1)
    VERSION_TYPE="patch"
    ;;
  2)
    VERSION_TYPE="minor"
    ;;
  3)
    VERSION_TYPE="major"
    ;;
  4)
    read -p "请输入新版本号 (例如: 1.2.3): " CUSTOM_VERSION
    if [[ ! $CUSTOM_VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
      echo -e "${RED}❌ 无效的版本号格式${NC}"
      exit 1
    fi
    npm version $CUSTOM_VERSION --no-git-tag-version
    NEW_VERSION=$CUSTOM_VERSION
    ;;
  *)
    echo -e "${RED}❌ 无效的选择${NC}"
    exit 1
    ;;
esac

# 升级版本
if [ ! -z "$VERSION_TYPE" ]; then
  npm version $VERSION_TYPE --no-git-tag-version
  NEW_VERSION=$(node -p "require('./package.json').version")
fi

echo -e "\n${GREEN}✅ 版本已更新: $CURRENT_VERSION -> $NEW_VERSION${NC}\n"

# 询问是否更新 CHANGELOG
read -p "是否要更新 CHANGELOG.md? (y/n): " update_changelog

if [[ $update_changelog == "y" || $update_changelog == "Y" ]]; then
  echo -e "\n请在 CHANGELOG.md 中添加版本 $NEW_VERSION 的更新说明"
  echo -e "${YELLOW}编辑完成后按回车继续...${NC}"
  ${EDITOR:-nano} CHANGELOG.md
fi

# 询问是否提交
echo ""
read -p "是否提交并推送到 GitHub? (y/n): " confirm

if [[ $confirm == "y" || $confirm == "Y" ]]; then
  git add package.json package-lock.json CHANGELOG.md
  git commit -m "chore: bump version to v$NEW_VERSION"
  
  echo -e "\n${YELLOW}准备推送到 GitHub...${NC}"
  git push origin main
  
  echo -e "\n${GREEN}✅ 完成！版本 v$NEW_VERSION 将会自动发布到 npm${NC}"
  echo -e "${YELLOW}📊 查看发布进度: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions${NC}"
else
  echo -e "\n${YELLOW}⚠️  版本已更新但未提交${NC}"
  echo -e "手动提交命令:"
  echo -e "  git add package.json package-lock.json CHANGELOG.md"
  echo -e "  git commit -m \"chore: bump version to v$NEW_VERSION\""
  echo -e "  git push origin main"
fi
