# NPM Token 有效期说明 ⏰

## 📌 关键信息

### NPM Token 有两种类型：

#### 1. **Classic Token**（经典 Token）
- ✅ 可以设置为**永不过期**
- ✅ 也可以设置**自定义有效期**（30/60/90/自定义天数）
- ✅ 推荐选择：**90 天**

#### 2. **Granular Token**（细粒度 Token，Beta）
- ⚠️ **强制有效期**，最长 1 年
- ✅ 权限控制更精细

---

## 🎯 推荐配置

### 最佳实践

```
Token 类型: Classic Token
权限类型: Automation
有效期: 90 days

为什么选择 90 天？
✅ 足够长，不需要频繁更新
✅ 足够短，限制安全风险
✅ 符合大多数安全政策
```

### 设置步骤

1. **创建 Token**
   ```
   https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   → Generate New Token
   → Classic Token
   → Type: Automation
   → Expiration: 90 days ⭐
   → Generate Token
   ```

2. **记录关键信息**
   ```
   Token: npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   创建日期: 2024-01-15
   过期日期: 2024-04-15
   提醒日期: 2024-04-08 (提前 7 天)
   ```

3. **设置提醒**
   - 📅 在日历中设置提醒
   - ⏰ 到期前 7 天提醒
   - 📧 或使用邮件提醒

---

## 🔄 Token 更新流程

### 何时更新？

| 场景 | 更新时机 |
|------|---------|
| 有 90 天期限 | 到期前 7 天 |
| 永不过期 | 每 3-6 个月 |
| Token 泄露 | 立即更新 |
| 发布失败 | 检查后更新 |

### 更新步骤（5 分钟）

```bash
# 1. 生成新 Token (90 天有效期)
访问: https://www.npmjs.com/settings/YOUR_USERNAME/tokens

# 2. 更新 GitHub Secret
Settings → Secrets → Actions → NPM_TOKEN → Update

# 3. 测试发布
npm run version:patch
git add package.json package-lock.json
git commit -m "chore: test token update"
git push origin main

# 4. 删除旧 Token
在 npm 上删除旧 token

# 5. 更新记录
记录新 token 的过期日期，设置新提醒
```

---

## ⚠️ Token 过期的症状

### 发布失败错误信息

```bash
# 典型错误 1
npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in.

# 典型错误 2
npm ERR! code E401
npm ERR! 401 Unauthorized
npm ERR! This token has expired

# 典型错误 3
npm ERR! code E403
npm ERR! 403 Forbidden
```

### 检查 Token 状态

```bash
# 方法 1: 在 npm 网站检查
https://www.npmjs.com/settings/YOUR_USERNAME/tokens
查看 token 状态：
  ✅ Active (绿色) - 正常
  ⚠️ Expiring soon (黄色) - 即将过期
  ❌ Expired (红色) - 已过期

# 方法 2: 命令行测试
export NPM_TOKEN="npm_xxxxxxxxxxxxxxxxxxxx"
npm whoami --//registry.npmjs.org/:_authToken=$NPM_TOKEN

# 输出:
# ✅ 显示用户名 = Token 有效
# ❌ ENEEDAUTH 错误 = Token 无效/过期
```

---

## 📋 Token 管理检查清单

### 创建 Token 时
- [ ] 选择 Classic Token → Automation
- [ ] 设置有效期为 90 天
- [ ] 复制并安全保存 token
- [ ] 记录创建日期和过期日期
- [ ] 在日历中设置提醒（过期前 7 天）
- [ ] 配置到 GitHub Secrets

### 定期维护
- [ ] 每月检查一次 token 状态
- [ ] 查看 GitHub Actions 是否正常
- [ ] 到期前 7 天收到提醒
- [ ] 按时更新 token

### 更新 Token 时
- [ ] 生成新 token（90 天有效期）
- [ ] 更新 GitHub Secret (NPM_TOKEN)
- [ ] 测试发布是否成功
- [ ] 删除旧 token
- [ ] 更新记录和提醒

---

## 🛡️ 安全建议

### 有效期策略

| 安全级别 | 推荐设置 | 更新频率 |
|---------|---------|---------|
| 🟢 标准 | 90 天 | 每 90 天 |
| 🟡 中等 | 60 天 | 每 60 天 |
| 🔴 高安全 | 30 天 | 每 30 天 |
| ⚪ 自定义 | 永不过期 | 每 3-6 个月手动轮换 |

### 最佳实践

1. ✅ **使用有期限的 token**（推荐 90 天）
   - 自动强制轮换
   - 限制泄露风险

2. ✅ **设置自动提醒**
   - 日历提醒
   - GitHub Issues 提醒
   - 邮件通知

3. ✅ **保持记录**
   ```
   Token 创建日期: 2024-01-15
   Token 过期日期: 2024-04-15
   下次更新日期: 2024-04-08
   ```

4. ✅ **及时更新**
   - 提前 7 天更新
   - 避免发布中断
   - 测试后再删除旧 token

---

## 🚨 应急处理

### Token 突然过期怎么办？

```bash
# 紧急恢复步骤（10 分钟）

# 1. 立即生成新 token
https://www.npmjs.com/settings/YOUR_USERNAME/tokens
→ Generate New Token (90 days)

# 2. 更新 GitHub Secret
Settings → Secrets → Actions → NPM_TOKEN → Update

# 3. 重新运行失败的 workflow
Actions → 失败的 run → Re-run all jobs

# 4. 验证发布成功
npm view swagger-ts-toolkit version

# 5. 删除旧 token
回到 npm tokens 页面删除过期 token
```

---

## 📚 详细文档

想了解更多？查看：
- 🔐 [NPM_TOKEN_MANAGEMENT.md](./NPM_TOKEN_MANAGEMENT.md) - 完整 Token 管理指南
- 🚀 [NPM_AUTO_PUBLISH_QUICKSTART.md](./NPM_AUTO_PUBLISH_QUICKSTART.md) - 快速开始
- 📖 [NPM_AUTO_PUBLISH_GUIDE.md](./NPM_AUTO_PUBLISH_GUIDE.md) - 详细配置指南

---

## 💡 快速参考

```bash
# 检查 token 状态
npm whoami --//registry.npmjs.org/:_authToken=$NPM_TOKEN

# 更新 GitHub Secret (使用 gh CLI)
gh secret set NPM_TOKEN --body "npm_新的token"

# 查看 npm 上的 tokens
https://www.npmjs.com/settings/YOUR_USERNAME/tokens

# 测试发布
npm publish --dry-run
```

---

## ✅ 记住这三点

1. **90 天有效期** - 推荐配置，安全又方便
2. **提前 7 天更新** - 避免发布中断
3. **设置日历提醒** - 永远不会忘记

---

**⏰ Token 有有效期是好事！它强制我们定期更新，保持系统安全。**

**📅 现在就去设置日历提醒吧！**
