# 发布到 npm - 三步搞定

## 🎯 超快速版（5分钟）

### 第一步：登录 npm
```bash
npm login
# 输入用户名、密码、邮箱
```

### 第二步：修改 package.json
```json
{
  "author": "你的名字 <your@email.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/你的用户名/swagger-ts-toolkit.git"
  }
}
```

### 第三步：发布
```bash
# 使用自动化脚本（推荐）
./scripts/publish.sh

# 或手动执行
npm run build
npm publish --access public
```

完成！🎉

---

## 📚 详细文档

- **快速参考**: 查看 `QUICK_PUBLISH.md`
- **完整指南**: 查看 `NPM_PUBLISH_GUIDE.md`
- **发布清单**: 查看 `RELEASE_CHECKLIST.md`

---

## ⚡ 常用命令

```bash
# 检查登录
npm whoami

# 预检查（不会真正发布）
npm publish --dry-run

# 发布
npm publish --access public

# 更新版本并发布
npm version patch  # bug 修复
npm version minor  # 新功能
npm version major  # 破坏性更新
```

---

## ✅ 发布检查清单

发布前确认：
- [ ] 已登录 npm (`npm whoami`)
- [ ] 更新了 author 和 repository
- [ ] 运行了 `npm run build`
- [ ] 预检查通过 (`npm publish --dry-run`)

发布后确认：
- [ ] 访问 https://www.npmjs.com/package/swagger-ts-toolkit
- [ ] 测试安装: `npm install swagger-ts-toolkit -g`
- [ ] 测试命令: `swagger-ts-toolkit --help`

---

## 🆘 遇到问题？

### 包名被占用
使用作用域包名：`@你的用户名/swagger-ts-toolkit`

### 登录失败
重新登录：`npm logout && npm login`

### 发布错误
检查网络，或稍后重试

---

## 📞 获取帮助

- npm 官方文档: https://docs.npmjs.com/
- 项目问题: 查看 `NPM_PUBLISH_GUIDE.md`
