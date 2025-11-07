# 贡献指南

感谢你对 swagger-ts-toolkit 的关注！我们欢迎各种形式的贡献。

## 🚀 快速开始

### 开发环境设置

1. **Fork 并克隆仓库**
```bash
git clone https://github.com/your-username/swagger-ts-toolkit.git
cd swagger-ts-toolkit
```

2. **安装依赖**
```bash
npm install
```

3. **构建项目**
```bash
npm run build
```

4. **运行测试**
```bash
npm test
```

5. **启动开发模式**
```bash
npm run dev
```

## 📋 开发流程

### 分支策略
- `main` - 稳定版本
- `develop` - 开发分支
- `feature/*` - 新功能分支
- `bugfix/*` - 错误修复分支

### 提交规范
我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**类型 (type):**
- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例:**
```
feat(generator): add support for OpenAPI 3.1
fix(parser): handle empty responses correctly
docs(readme): update installation instructions
```

## 🧪 测试

### 运行测试
```bash
# 运行所有测试
npm test

# 运行 linter
npm run lint

# 格式化代码
npm run format
```

### 添加测试
- 为新功能添加单元测试
- 确保测试覆盖率不降低
- 测试文件放在 `src/test/` 目录下

## 📝 代码规范

### TypeScript 规范
- 使用严格的 TypeScript 配置
- 导出的函数和类必须有类型注解
- 使用 JSDoc 注释重要函数

### 代码风格
- 使用 ESLint 和 Prettier
- 2 空格缩进
- 使用单引号
- 行尾分号

### 文件结构
```
src/
├── config/          # 配置管理
├── core/            # 核心逻辑
├── generators/      # 代码生成器
├── swagger/         # Swagger 解析
├── types/           # 类型定义
├── utils/           # 工具函数
├── watcher/         # 文件监听
└── test/            # 测试文件
```

## 🐛 报告问题

使用 GitHub Issues 报告问题：

1. 搜索现有 issues，避免重复
2. 使用合适的 issue 模板
3. 提供详细的重现步骤
4. 包含环境信息

## 💡 提出功能建议

1. 先在 Discussions 中讨论想法
2. 创建 Feature Request issue
3. 详细描述用例和预期行为

## 🔄 提交 Pull Request

1. **创建分支**
```bash
git checkout -b feature/your-feature-name
```

2. **开发和测试**
- 编写代码
- 添加测试
- 确保所有测试通过
- 更新文档

3. **提交更改**
```bash
git add .
git commit -m "feat: add your feature description"
```

4. **推送分支**
```bash
git push origin feature/your-feature-name
```

5. **创建 Pull Request**
- 使用 PR 模板
- 详细描述更改
- 关联相关 issues

## 📚 文档

### 更新文档
- README.md - 主要文档
- QUICK_START.md - 快速开始指南
- examples/ - 示例代码
- JSDoc 注释 - API 文档

### 文档规范
- 使用清晰的标题结构
- 提供代码示例
- 保持文档与代码同步

## 🏷️ 发版流程

维护者负责发版：

1. 更新版本号
2. 更新 CHANGELOG
3. 创建 release tag
4. 发布到 npm

## 📞 联系方式

- GitHub Issues - 问题报告和功能请求
- GitHub Discussions - 讨论和问题

## 📄 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下授权。

---

再次感谢你的贡献！🎉