# 🚀 Swagger TypeScript Toolkit - 新功能总结

## 🆕 新增功能：自动生成可直接调用的API方法

### ✨ 功能概述

现在 `swagger-ts-toolkit` 能够自动生成可直接调用的API方法，每个接口都会生成对应的调用函数，格式如下：

```typescript
// 自动生成的API函数
async function getUserById(pathParams: { userId: number }): Promise<User> {
  const url = buildPath('/users/{userId}', pathParams);
  return apiClient.get(url);
}

// 使用示例
const user = await userApi.getUserById({ pathParams: { userId: 123 } });
```

### 🔧 核心特性

#### 1. **完整的HTTP客户端支持**
- ✅ 自动处理路径参数替换 (`/users/{id}` → `/users/123`)
- ✅ 统一的请求/响应拦截器
- ✅ 完整的错误处理机制
- ✅ 自动token认证管理
- ✅ 支持所有HTTP方法 (GET, POST, PUT, DELETE, PATCH)

#### 2. **智能参数处理**
- ✅ 路径参数自动替换
- ✅ 查询参数自动序列化
- ✅ 请求体自动JSON编码
- ✅ 响应数据自动解析

#### 3. **完整的类型安全**
- ✅ 请求参数类型检查
- ✅ 响应数据类型推断
- ✅ 路径参数自动验证
- ✅ IDE智能提示支持

#### 4. **灵活的配置选项**
- ✅ 可选择启用/禁用API函数生成
- ✅ 自定义输出路径
- ✅ 服务级别的独立生成
- ✅ 兼容现有功能

### 📁 生成的文件结构

```
generated/
├── api-types.d.ts                    # TypeScript 类型定义
├── endpoints.ts                      # API 端点常量
├── api-functions-userApi.ts          # 🆕 用户API函数（新功能）
├── api-functions-productApi.ts       # 🆕 商品API函数（新功能）
├── userApi.ts                        # 用户服务 API 模块（兼容版本）
└── productApi.ts                     # 商品服务 API 模块（兼容版本）
```

### 🎯 使用方式

#### 1. **配置启用**

```javascript
// swagger-ts-toolkit.config.js
export default {
  swagger: {
    localPaths: {
      userApi: 'docs/swagger/user-api.yaml',
      productApi: 'docs/swagger/product-api.json',
    },
  },
  generateApiFunctions: true, // 🆕 启用API函数生成
  apiFunctionsPath: 'src/api/generated/api-functions.ts',
};
```

#### 2. **CLI命令**

```bash
# 生成所有内容（包括API函数）
npx stt generate --api-functions

# 只生成类型定义和端点常量
npx stt generate --no-api-functions

# 为特定服务生成API函数
npx stt generate --service userApi --api-functions

# 自定义API函数输出路径
npx stt generate --functions src/api/custom-functions.ts
```

#### 3. **代码使用**

```typescript
import { userApiApi } from './generated/api-functions-userApi';
import type { components } from './generated/api-types';

// 类型定义
type User = components['schemas']['User'];

// API调用示例
// GET请求 - 查询参数
const users = await userApiApi.getUserList({
  queryParams: { page: 1, limit: 20, status: 'active' }
});

// GET请求 - 路径参数
const user = await userApiApi.getUserById({
  pathParams: { userId: 123 }
});

// POST请求 - 请求体
const newUser = await userApiApi.createUser({
  data: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});

// PUT请求 - 路径参数 + 请求体
const updatedUser = await userApiApi.updateUser({
  pathParams: { userId: 123 },
  data: { name: 'Jane Doe' }
});

// DELETE请求
await userApiApi.deleteUser({
  pathParams: { userId: 123 }
});
```

### 🏗️ 技术实现

#### 1. **核心模块**

- **`api-function-generator.ts`** - API函数生成器
- **`http-client.ts`** - HTTP客户端工具类（可选）
- **增强的核心生成器** - 集成新功能

#### 2. **生成流程**

1. 解析Swagger文档
2. 提取API操作信息
3. 分析参数类型（路径、查询、请求体）
4. 生成类型安全的函数签名
5. 生成完整的HTTP客户端代码
6. 输出可直接使用的API函数

#### 3. **错误处理**

```typescript
// 自动生成的错误处理
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 自动清除token并跳转登录
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 📈 实际应用场景

#### 1. **React Applications**

```typescript
// Hook示例
function useUsers() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userApiApi.getUserList({
        queryParams: { page: 1, limit: 20 }
      });
      setUsers(data);
    };
    fetchUsers();
  }, []);
  
  return users;
}
```

#### 2. **Vue Applications**

```typescript
// Composition API示例
export function useProducts() {
  const products = ref([]);
  
  const fetchProducts = async () => {
    const data = await productApiApi.getProductList({
      queryParams: { category: 'electronics' }
    });
    products.value = data;
  };
  
  return { products, fetchProducts };
}
```

#### 3. **服务层封装**

```typescript
// 业务逻辑封装
export class UserService {
  async getActiveUsers(page: number = 1) {
    return userApiApi.getUserList({
      queryParams: { 
        page, 
        status: 'active',
        limit: 20 
      }
    });
  }
  
  async createUserWithValidation(userData: CreateUserRequest) {
    // 业务逻辑验证
    if (!userData.email) {
      throw new Error('邮箱不能为空');
    }
    
    return userApiApi.createUser({ data: userData });
  }
}
```

### 🎉 优势总结

1. **开发效率提升** - 无需手写API调用代码
2. **类型安全保障** - 完整的TypeScript类型支持
3. **错误处理统一** - 自动处理常见错误场景
4. **代码维护简化** - API变更时自动同步
5. **团队协作优化** - 统一的API调用规范
6. **向后兼容** - 不影响现有功能使用

### 🔧 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `generateApiFunctions` | `boolean` | `true` | 是否生成API函数 |
| `apiFunctionsPath` | `string` | `'src/api/generated/api-functions.ts'` | API函数输出路径 |

### 📚 完整示例

查看 `examples/docs/` 目录获取完整的使用示例：

- **`api-functions-example.ts`** - 详细的API函数使用示例
- **`generated/api-functions-userApi.ts`** - 生成的用户API函数
- **`generated/api-functions-productApi.ts`** - 生成的商品API函数

---

🎉 **现在你的前端开发效率将大幅提升！无需手写API调用代码，享受完整的类型安全和自动错误处理！**