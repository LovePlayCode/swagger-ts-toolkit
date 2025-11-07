# 📄 示例 Swagger 文件

这个目录包含了用于测试和演示 `swagger-ts-toolkit` 的示例 Swagger/OpenAPI 文档。

## 📁 文件说明

### `petstore-api.yaml`
- **格式**: YAML
- **描述**: 经典的宠物商店 API 示例，包含完整的 CRUD 操作
- **特性**:
  - ✅ 完整的 OpenAPI 3.0 规范
  - ✅ 多种 HTTP 方法 (GET, POST, PUT, DELETE)
  - ✅ 路径参数和查询参数
  - ✅ 请求体和响应体定义
  - ✅ 错误处理和验证
  - ✅ 分页和筛选
  - ✅ 复杂的数据模型关系

### `user-service.json`
- **格式**: JSON
- **描述**: 微服务架构中的用户服务 API
- **特性**:
  - ✅ JWT 认证机制
  - ✅ 用户管理 CRUD 操作
  - ✅ 用户档案管理
  - ✅ 登录登出功能
  - ✅ 详细的错误处理
  - ✅ 数据验证规则
  - ✅ UUID 作为主键

## 🚀 使用方法

### 1. 快速测试
```bash
# 使用 petstore API 测试
npx stt generate \
  --source local \
  --service petstore \
  --output src/types/petstore-api.d.ts \
  --endpoints src/api/petstore-endpoints.ts

# 配置文件方式
cat > swagger-ts-toolkit.config.js << 'EOF'
export default {
  swagger: {
    localPaths: {
      petstore: 'examples/sample-swagger-files/petstore-api.yaml',
      userService: 'examples/sample-swagger-files/user-service.json'
    }
  },
  outputPath: 'src/types/api.d.ts',
  endpointsPath: 'src/api/endpoints.ts'
};
EOF

npx stt generate --service petstore
```

### 2. 复制到你的项目
```bash
# 创建文档目录
mkdir -p docs/swagger

# 复制示例文件作为模板
cp examples/sample-swagger-files/petstore-api.yaml docs/swagger/my-api.yaml

# 编辑文件以匹配你的 API
# 然后生成类型
npx stt generate
```

### 3. 作为学习材料
这些文件展示了：
- 如何定义 API 路径和操作
- 如何使用组件和引用
- 如何处理认证和授权
- 如何定义复杂的数据模型
- 如何处理错误和验证

## 📋 生成结果预览

使用这些示例文件，你将得到：

### TypeScript 类型定义
```typescript
// 从 petstore-api.yaml 生成
export interface components {
  schemas: {
    Pet: {
      id: number;
      name: string;
      category: components['schemas']['Category'];
      status: 'available' | 'pending' | 'sold';
      // ... 更多属性
    };
    User: {
      id: number;
      username: string;
      email: string;
      // ... 更多属性
    };
    // ... 更多类型
  };
}
```

### API 端点常量
```typescript
// 生成的端点常量
export const API_ENDPOINTS = {
  getPets: {
    path: '/pets',
    method: 'GET',
    summary: '获取宠物列表'
  },
  createPet: {
    path: '/pets',
    method: 'POST',
    summary: '创建新宠物'
  },
  getPetById: {
    path: '/pets/{petId}',
    method: 'GET',
    summary: '根据ID获取宠物信息'
  },
  // ... 更多端点
} as const;
```

### API 调用函数
```typescript
// 生成的 API 模块
export const petstoreApi = {
  /**
   * 获取宠物列表
   */
  async getPets(data: {
    limit?: number;
    offset?: number;
    status?: 'available' | 'pending' | 'sold';
  }): Promise<components['schemas']['Pet'][]> {
    return typedHttp.get(API_ENDPOINTS.getPets.path, data);
  },

  /**
   * 创建新宠物
   */
  async createPet(data: components['schemas']['CreatePetRequest']): Promise<components['schemas']['Pet']> {
    return typedHttp.post(API_ENDPOINTS.createPet.path, data);
  },
  
  // ... 更多方法
};
```

## 🔧 自定义和扩展

### 修改示例文件
1. **添加新的端点**：在 `paths` 对象中添加新路径
2. **定义新的模型**：在 `components.schemas` 中添加新类型
3. **修改认证方式**：更新 `securitySchemes` 配置
4. **添加服务器配置**：在 `servers` 数组中添加环境

### 创建自己的 Swagger 文件
```yaml
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
  description: 我的 API 文档

servers:
  - url: https://api.mycompany.com/v1
    description: 生产环境

paths:
  /my-endpoint:
    get:
      operationId: getMyData
      summary: 获取我的数据
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MyData'

components:
  schemas:
    MyData:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
      required:
        - id
        - name
```

## 📚 学习资源

### OpenAPI/Swagger 规范
- [OpenAPI 3.0 规范](https://spec.openapis.org/oas/v3.0.3)
- [Swagger 官方文档](https://swagger.io/docs/)
- [OpenAPI 最佳实践](https://swagger.io/resources/articles/best-practices-in-api-documentation/)

### 在线工具
- [Swagger Editor](https://editor.swagger.io/) - 在线编辑和验证
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - API 文档展示
- [OpenAPI Generator](https://openapi-generator.tech/) - 多语言代码生成

## 🤝 贡献示例

欢迎提交更多有用的示例文件！请确保：

1. **完整性**: 包含完整的 OpenAPI 规范
2. **实用性**: 展示实际项目中的常见场景
3. **文档**: 添加清晰的注释和说明
4. **验证**: 确保文件格式正确且可以成功生成类型

### 提交新示例的步骤
1. 在此目录创建新的 `.yaml` 或 `.json` 文件
2. 更新此 README 文件
3. 在 `../` 目录创建对应的使用示例
4. 提交 Pull Request

---

💡 **提示**: 这些示例文件是学习 OpenAPI 规范和测试 swagger-ts-toolkit 功能的绝佳起点！