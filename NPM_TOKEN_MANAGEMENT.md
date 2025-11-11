# NPM Token 管理指南 🔐

本指南详细说明如何管理 npm token，包括创建、更新、轮换和故障排查。

---

## 📋 目录

1. [Token 类型和有效期](#token-类型和有效期)
2. [创建 Token](#创建-token)
3. [Token 过期处理](#token-过期处理)
4. [定期轮换 Token](#定期轮换-token)
5. [监控和告警](#监控和告警)
6. [故障排查](#故障排查)

---

## 🏷️ Token 类型和有效期

### NPM Token 类型

npm 提供两种类型的 token：

#### 1. **Classic Tokens**（传统 Token）

**特点：**
- ✅ 可以设置为**永不过期**或**自定义有效期**
- ✅ 支持三种权限类型：
  - **Read-only**: 只读权限
  - **Automation**: 适合 CI/CD（推荐）
  - **Publish**: 完整发布权限

**有效期选项：**
```
□ No expiration (永不过期)
□ 30 days
□ 60 days
□ 90 days (推荐)
□ Custom (自定义)
```

#### 2. **Granular Access Tokens**（细粒度 Token，Beta）

**特点：**
- ⚠️ **最长有效期 1 年**（强制过期）
- ✅ 可以精确控制权限范围
- ✅ 支持 IP 白名单限制

**有效期：**
```
最长: 365 天
推荐: 90 天
```

---

## 🔑 创建 Token

### 方法 1: Classic Token（推荐用于 CI/CD）

1. **登录 npm**
   ```
   https://www.npmjs.com/
   ```

2. **进入 Token 管理**
   ```
   头像 → Access Tokens → Generate New Token → Classic Token
   ```

3. **配置 Token**
   ```
   Token Type: Automation
   
   Expiration (有效期):
   ☑ 90 days (推荐)
   ☐ No expiration (需定期手动轮换)
   ☐ Custom
   ```

4. **复制 Token**
   ```
   ⚠️ Token 只显示一次！请立即复制并保存到安全的地方
   
   示例格式: npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

5. **记录重要信息**
   ```
   Token Name: swagger-ts-toolkit-ci
   Created: 2024-01-15
   Expires: 2024-04-15 (如果设置了有效期)
   Type: Automation
   ```

### 方法 2: Granular Token（更安全但需频繁更新）

1. **创建步骤**
   ```
   Access Tokens → Generate New Token → Granular Access Token
   ```

2. **配置**
   ```
   Token Name: swagger-ts-toolkit-publish
   Expiration: 90 days
   
   Packages and scopes:
   ☑ Read and write
   ☑ swagger-ts-toolkit
   
   Organizations: (可选)
   IP ranges: (可选，例如 GitHub Actions IP)
   ```

---

## ⏰ Token 过期处理

### 识别 Token 过期

#### 症状：
- ❌ GitHub Actions 发布失败
- ❌ 错误信息：`ENEEDAUTH` 或 `E401 Unauthorized`
- ❌ npm 显示：`This token has expired`

#### 检查方法：

**1. 登录 npm 检查**
```
https://www.npmjs.com/settings/YOUR_USERNAME/tokens

查看 Token 列表，检查状态：
✅ Active (绿色) - 正常
⚠️ Expiring soon (黄色) - 即将过期
❌ Expired (红色) - 已过期
```

**2. 通过 CLI 测试**
```bash
# 设置测试用的 token
export NPM_TOKEN="npm_xxxxxxxxxxxxxxxxxxxx"

# 测试 token 是否有效
npm whoami --registry=https://registry.npmjs.org/ \
  --//registry.npmjs.org/:_authToken=$NPM_TOKEN

# 输出示例：
# ✅ 有效: 显示你的用户名
# ❌ 无效: npm ERR! code ENEEDAUTH
```

### 更新过期的 Token

#### 步骤 1: 生成新 Token

```bash
# 访问 npm
https://www.npmjs.com/settings/YOUR_USERNAME/tokens

# 点击 "Generate New Token"
# 选择类型: Classic Token → Automation
# 设置有效期: 90 days (推荐)
# 复制新 token
```

#### 步骤 2: 更新 GitHub Secret

**方法 A: 通过 Web 界面**
```
1. 打开仓库: https://github.com/YOUR_USERNAME/swagger-ts-toolkit
2. Settings → Secrets and variables → Actions
3. 找到 NPM_TOKEN
4. 点击 "Update" (铅笔图标)
5. 粘贴新 token
6. 点击 "Update secret"
```

**方法 B: 通过 GitHub CLI**
```bash
# 安装 GitHub CLI (如果未安装)
brew install gh

# 登录
gh auth login

# 更新 secret
gh secret set NPM_TOKEN --body "npm_新的token值"

# 验证
gh secret list
```

#### 步骤 3: 删除旧 Token

```bash
# 登录 npm
https://www.npmjs.com/settings/YOUR_USERNAME/tokens

# 找到旧 token
# 点击 "Delete" 按钮
# 确认删除
```

#### 步骤 4: 测试发布

```bash
# 升级版本
npm run version:patch

# 提交并推送
git add package.json package-lock.json
git commit -m "chore: test token update"
git push origin main

# 查看 GitHub Actions
https://github.com/YOUR_USERNAME/swagger-ts-toolkit/actions

# 验证发布成功
npm view swagger-ts-toolkit version
```

---

## 🔄 定期轮换 Token

### 为什么需要轮换？

1. ✅ **安全最佳实践** - 即使 token 泄露，影响时间有限
2. ✅ **符合安全政策** - 许多组织要求定期轮换凭证
3. ✅ **降低风险** - 限制潜在的安全影响

### 推荐轮换频率

| Token 类型 | 有效期设置 | 轮换频率 |
|-----------|----------|---------|
| Classic (永不过期) | No expiration | 每 3-6 个月 |
| Classic (有期限) | 90 days | 到期前 7 天 |
| Granular | 90 days | 到期前 7 天 |
| Granular | 365 days | 每 6 个月 |

### 自动化轮换提醒

#### 方法 1: 日历提醒

```bash
# 在 Google Calendar / Outlook 中设置定期提醒

提醒标题: 轮换 NPM Token
重复频率: 每 90 天
提前提醒: 7 天前
描述: 
  1. 生成新 npm token
  2. 更新 GitHub Secret NPM_TOKEN
  3. 删除旧 token
  4. 测试发布
```

#### 方法 2: GitHub Issues 自动提醒

创建 `.github/workflows/token-reminder.yml`：

```yaml
name: NPM Token Renewal Reminder

on:
  schedule:
    # 每 85 天运行一次（90 天有效期前 5 天）
    - cron: '0 9 * */85 *'
  workflow_dispatch:

jobs:
  remind:
    runs-on: ubuntu-latest
    steps:
      - name: Create reminder issue
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🔐 提醒: 需要更新 NPM_TOKEN',
              body: `## NPM Token 即将过期

请按照以下步骤更新 token：

### 1. 生成新 Token
- 访问: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
- Generate New Token → Classic Token → Automation
- 有效期: 90 days
- 复制 token

### 2. 更新 GitHub Secret
- Settings → Secrets → Actions
- 更新 NPM_TOKEN

### 3. 测试
\`\`\`bash
npm run version:patch
git add package.json package-lock.json
git commit -m "chore: test token"
git push origin main
\`\`\`

### 4. 删除旧 Token
- 删除 npm 上的旧 token

查看详细指南: [NPM_TOKEN_MANAGEMENT.md](./NPM_TOKEN_MANAGEMENT.md)
`,
              labels: ['security', 'reminder']
            })
```

#### 方法 3: Token 过期监控脚本

创建 `scripts/check-npm-token.sh`：

```bash
#!/bin/bash

# 检查 npm token 是否有效

TOKEN="${NPM_TOKEN:-}"

if [ -z "$TOKEN" ]; then
  echo "❌ NPM_TOKEN 未设置"
  exit 1
fi

# 测试 token
if npm whoami --registry=https://registry.npmjs.org/ \
     --//registry.npmjs.org/:_authToken=$TOKEN >/dev/null 2>&1; then
  echo "✅ NPM_TOKEN 有效"
  exit 0
else
  echo "❌ NPM_TOKEN 无效或已过期"
  echo "请访问: https://www.npmjs.com/settings/YOUR_USERNAME/tokens"
  exit 1
fi
```

---

## 📊 监控和告警

### GitHub Actions 失败通知

在 `.github/workflows/ci.yml` 中添加失败通知：

```yaml
- name: Notify on publish failure
  if: failure() && steps.publish.outcome == 'failure'
  uses: actions/github-script@v7
  with:
    script: |
      const message = `
      ## ⚠️ NPM 发布失败
      
      可能原因：
      1. NPM_TOKEN 已过期
      2. 版本号冲突
      3. 网络问题
      
      请检查 [Action 日志](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})
      
      如果是 token 过期，请参考: [NPM_TOKEN_MANAGEMENT.md](./NPM_TOKEN_MANAGEMENT.md)
      `;
      
      github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: 'NPM 发布失败 - 需要检查',
        body: message,
        labels: ['bug', 'ci/cd']
      });
```

### Token 健康检查

添加到 `package.json`：

```json
{
  "scripts": {
    "check-token": "./scripts/check-npm-token.sh"
  }
}
```

定期运行：
```bash
npm run check-token
```

---

## 🐛 故障排查

### 问题 1: Token 无效

**错误信息：**
```
npm ERR! code ENEEDAUTH
npm ERR! need auth This command requires you to be logged in.
```

**解决方法：**
```bash
# 1. 检查 GitHub Secret 是否正确配置
#    Settings → Secrets → NPM_TOKEN

# 2. 生成新 token 并更新

# 3. 测试 token
export NPM_TOKEN="你的token"
npm whoami --//registry.npmjs.org/:_authToken=$NPM_TOKEN
```

### 问题 2: Token 过期

**错误信息：**
```
npm ERR! code E401
npm ERR! 401 Unauthorized - PUT https://registry.npmjs.org/swagger-ts-toolkit
npm ERR! This token has expired
```

**解决方法：**
```bash
# 按照 "Token 过期处理" 章节的步骤更新 token
```

### 问题 3: Token 权限不足

**错误信息：**
```
npm ERR! code E403
npm ERR! 403 Forbidden - PUT https://registry.npmjs.org/swagger-ts-toolkit
npm ERR! You do not have permission to publish
```

**解决方法：**
```bash
# 1. 确保使用的是 Automation 或 Publish 类型的 token
# 2. 检查 npm 账号是否有包的发布权限
npm owner ls swagger-ts-toolkit

# 3. 如果不是 owner，请让 owner 添加你
npm owner add YOUR_USERNAME swagger-ts-toolkit
```

### 问题 4: Token 在 GitHub 中未生效

**症状：** 更新了 token 但 Actions 仍然失败

**解决方法：**
```bash
# 1. 确认 Secret 名称完全匹配
#    必须是 NPM_TOKEN（区分大小写）

# 2. 重新运行 workflow
#    Actions → 选择失败的 run → Re-run all jobs

# 3. 检查 workflow 文件中的引用
#    确保是 ${{ secrets.NPM_TOKEN }}
```

---

## ✅ Token 管理检查清单

### 创建 Token 时
- [ ] 选择正确的类型（Automation）
- [ ] 设置合适的有效期（90 天）
- [ ] 记录 token 创建日期和过期日期
- [ ] 复制 token 并安全保存
- [ ] 立即配置到 GitHub Secrets

### 定期维护
- [ ] 设置日历提醒（每 85 天）
- [ ] 定期检查 token 状态（每月）
- [ ] 查看 GitHub Actions 日志
- [ ] 验证发布功能正常

### Token 轮换时
- [ ] 生成新 token
- [ ] 更新 GitHub Secret
- [ ] 测试发布功能
- [ ] 删除旧 token
- [ ] 更新文档中的过期日期

### 安全检查
- [ ] 启用 npm 双因素认证
- [ ] 不要在代码中硬编码 token
- [ ] 不要在日志中打印 token
- [ ] 定期审查有权限访问 Secrets 的人员

---

## 📚 相关资源

### npm 官方文档
- [Creating and viewing access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)
- [About access tokens](https://docs.npmjs.com/about-access-tokens)
- [Token best practices](https://docs.npmjs.com/creating-and-viewing-access-tokens#token-best-practices)

### GitHub 文档
- [Encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

### 本项目文档
- [NPM_AUTO_PUBLISH_GUIDE.md](./NPM_AUTO_PUBLISH_GUIDE.md) - 完整发布指南
- [NPM_AUTO_PUBLISH_QUICKSTART.md](./NPM_AUTO_PUBLISH_QUICKSTART.md) - 快速开始
- [AUTO_PUBLISH_SETUP.md](./AUTO_PUBLISH_SETUP.md) - 配置总结

---

## 🎯 快速参考

```bash
# 检查 token 有效性
npm whoami --//registry.npmjs.org/:_authToken=$NPM_TOKEN

# 更新 GitHub Secret (使用 gh CLI)
gh secret set NPM_TOKEN --body "npm_新的token"

# 测试发布
npm publish --dry-run

# 查看包的 owners
npm owner ls swagger-ts-toolkit
```

---

**💡 最佳实践：**
- ✅ 使用有期限的 token（90 天）
- ✅ 设置自动提醒
- ✅ 在过期前 7 天更新
- ✅ 每次更新后测试发布
- ✅ 删除旧的 token

**🔐 记住：Token 安全是 CI/CD 安全的关键！**
