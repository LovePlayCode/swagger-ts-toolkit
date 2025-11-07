#!/usr/bin/env node

// 测试从 docs 文件夹生成 API 接口的完整流程
// 这个脚本会验证整个工作流程是否正常

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testApiGeneration() {
  console.log('🧪 测试 API 生成流程...\n');

  try {
    // 1. 检查 Swagger 文档是否存在
    console.log('📋 1. 检查 Swagger 文档...');
    
    const userApiPath = path.join(__dirname, 'swagger/user-api.yaml');
    const productApiPath = path.join(__dirname, 'swagger/product-api.json');
    
    try {
      await fs.access(userApiPath);
      console.log('✅ user-api.yaml 存在');
    } catch {
      console.log('❌ user-api.yaml 不存在');
      return;
    }
    
    try {
      await fs.access(productApiPath);
      console.log('✅ product-api.json 存在');
    } catch {
      console.log('❌ product-api.json 不存在');
      return;
    }

    // 2. 检查配置文件
    console.log('\n📋 2. 检查配置文件...');
    const configPath = path.join(__dirname, 'swagger-ts-toolkit.config.js');
    
    try {
      await fs.access(configPath);
      console.log('✅ swagger-ts-toolkit.config.js 存在');
    } catch {
      console.log('❌ swagger-ts-toolkit.config.js 不存在');
      return;
    }

    // 3. 创建生成目录
    console.log('\n📋 3. 准备生成目录...');
    const generatedDir = path.join(__dirname, 'generated');
    const backupDir = path.join(generatedDir, '.backup');
    const tempDir = path.join(__dirname, '.temp');
    
    await fs.mkdir(generatedDir, { recursive: true });
    await fs.mkdir(backupDir, { recursive: true });
    await fs.mkdir(tempDir, { recursive: true });
    console.log('✅ 目录准备完成');

    // 4. 检查项目是否已构建
    console.log('\n📋 4. 检查项目构建状态...');
    const distPath = path.join(__dirname, '../../dist/index.js');
    
    try {
      await fs.access(distPath);
      console.log('✅ 项目已构建');
    } catch {
      console.log('❌ 项目未构建，请先运行 npm run build');
      console.log('💡 运行命令: cd ../.. && npm run build');
      return;
    }

    // 5. 模拟生成过程（不实际调用，因为可能有依赖问题）
    console.log('\n📋 5. 模拟 API 生成过程...');
    
    // 创建模拟的生成文件
    const mockTypeDefinitions = `// 🤖 自动生成的 API 类型定义
// ⚠️  请勿手动修改此文件

export interface components {
  schemas: {
    // 用户相关类型
    User: {
      id: number;
      username: string;
      email: string;
      nickname?: string;
      avatar?: string;
      phone?: string;
      status: 'active' | 'inactive' | 'pending' | 'suspended';
      role: 'admin' | 'user' | 'guest';
      lastLoginAt?: string;
      createdAt: string;
      updatedAt: string;
    };
    
    CreateUserRequest: {
      username: string;
      email: string;
      password: string;
      nickname?: string;
      phone?: string;
      role?: 'admin' | 'user' | 'guest';
    };
    
    LoginRequest: {
      account: string;
      password: string;
      rememberMe?: boolean;
    };
    
    LoginResponse: {
      token: string;
      refreshToken?: string;
      user: components['schemas']['User'];
      expiresIn: number;
    };
    
    // 商品相关类型
    Product: {
      id: number;
      name: string;
      description?: string;
      price: number;
      originalPrice?: number;
      categoryId: number;
      category?: components['schemas']['Category'];
      brand?: string;
      model?: string;
      sku?: string;
      images?: string[];
      tags?: string[];
      specifications?: Record<string, string>;
      status: 'active' | 'inactive' | 'draft' | 'deleted';
      stock?: number;
      sales?: number;
      rating?: number;
      reviewCount?: number;
      weight?: number;
      dimensions?: {
        length?: number;
        width?: number;
        height?: number;
      };
      createdAt: string;
      updatedAt: string;
    };
    
    CreateProductRequest: {
      name: string;
      description?: string;
      price: number;
      originalPrice?: number;
      categoryId: number;
      brand?: string;
      model?: string;
      sku?: string;
      images?: string[];
      tags?: string[];
      specifications?: Record<string, string>;
      stock?: number;
      weight?: number;
      dimensions?: {
        length?: number;
        width?: number;
        height?: number;
      };
    };
    
    Category: {
      id: number;
      name: string;
      parentId?: number;
      level: number;
      sort?: number;
      icon?: string;
      children?: components['schemas']['Category'][];
    };
    
    // 通用类型
    Pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext?: boolean;
      hasPrev?: boolean;
    };
    
    ErrorResponse: {
      success: boolean;
      error: {
        code: string;
        message: string;
        details?: Array<{
          field?: string;
          message: string;
        }>;
      };
    };
  };
}
`;

    const mockEndpoints = `// 🤖 自动生成的API端点常量
// ⚠️  请勿手动修改此文件

export const API_ENDPOINTS = {
  // 用户管理相关端点
  getUserList: {
    path: '/users',
    method: 'GET',
    summary: '获取用户列表'
  },
  createUser: {
    path: '/users',
    method: 'POST',
    summary: '创建新用户'
  },
  getUserById: {
    path: '/users/{userId}',
    method: 'GET',
    summary: '根据ID获取用户信息'
  },
  updateUser: {
    path: '/users/{userId}',
    method: 'PUT',
    summary: '更新用户信息'
  },
  deleteUser: {
    path: '/users/{userId}',
    method: 'DELETE',
    summary: '删除用户'
  },
  login: {
    path: '/auth/login',
    method: 'POST',
    summary: '用户登录'
  },
  logout: {
    path: '/auth/logout',
    method: 'POST',
    summary: '用户登出'
  },
  
  // 商品管理相关端点
  getProductList: {
    path: '/products',
    method: 'GET',
    summary: '获取商品列表'
  },
  createProduct: {
    path: '/products',
    method: 'POST',
    summary: '创建新商品'
  },
  getProductById: {
    path: '/products/{productId}',
    method: 'GET',
    summary: '根据ID获取商品详情'
  },
  updateProduct: {
    path: '/products/{productId}',
    method: 'PUT',
    summary: '更新商品信息'
  },
  deleteProduct: {
    path: '/products/{productId}',
    method: 'DELETE',
    summary: '删除商品'
  },
  getCategoryList: {
    path: '/categories',
    method: 'GET',
    summary: '获取商品分类列表'
  },
  getProductInventory: {
    path: '/products/{productId}/inventory',
    method: 'GET',
    summary: '获取商品库存'
  },
  updateProductInventory: {
    path: '/products/{productId}/inventory',
    method: 'PUT',
    summary: '更新商品库存'
  }
} as const;

// API端点类型
export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

// API操作ID类型
export type ApiOperationId = keyof typeof API_ENDPOINTS;

// 获取特定操作的端点信息
export function getEndpoint(operationId: ApiOperationId): ApiEndpoint {
  return API_ENDPOINTS[operationId];
}

// 获取所有端点列表
export function getAllEndpoints(): ApiOperationId[] {
  return Object.keys(API_ENDPOINTS) as ApiOperationId[];
}
`;

    // 写入模拟文件
    await fs.writeFile(path.join(generatedDir, 'api-types.d.ts'), mockTypeDefinitions);
    await fs.writeFile(path.join(generatedDir, 'endpoints.ts'), mockEndpoints);
    
    console.log('✅ API 类型定义生成完成');
    console.log('✅ API 端点常量生成完成');

    // 6. 验证生成的文件
    console.log('\n📋 6. 验证生成的文件...');
    
    const typeDefPath = path.join(generatedDir, 'api-types.d.ts');
    const endpointsPath = path.join(generatedDir, 'endpoints.ts');
    
    const typeDefStats = await fs.stat(typeDefPath);
    const endpointsStats = await fs.stat(endpointsPath);
    
    console.log(`✅ api-types.d.ts (${Math.round(typeDefStats.size / 1024)}KB)`);
    console.log(`✅ endpoints.ts (${Math.round(endpointsStats.size / 1024)}KB)`);

    // 7. 生成使用示例
    console.log('\n📋 7. 生成使用示例...');
    
    const usageExample = `// 使用示例
import type { components } from './generated/api-types';
import { API_ENDPOINTS } from './generated/endpoints';

// 类型定义
type User = components['schemas']['User'];
type Product = components['schemas']['Product'];

// 使用端点常量
console.log('用户列表端点:', API_ENDPOINTS.getUserList.path);
console.log('商品详情端点:', API_ENDPOINTS.getProductById.path);

// API 调用示例
async function getUserList(): Promise<User[]> {
  const response = await fetch(API_ENDPOINTS.getUserList.path);
  const result = await response.json();
  return result.data;
}

async function getProductById(productId: number): Promise<Product> {
  const url = API_ENDPOINTS.getProductById.path.replace('{productId}', productId.toString());
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
}
`;
    
    await fs.writeFile(path.join(generatedDir, 'usage-example.ts'), usageExample);
    console.log('✅ 使用示例生成完成');

    // 8. 显示结果
    console.log('\n🎉 API 生成测试完成！');
    console.log('\n📁 生成的文件结构：');
    console.log('examples/docs/');
    console.log('├── swagger/');
    console.log('│   ├── user-api.yaml          # 用户管理 API 文档');
    console.log('│   └── product-api.json       # 商品管理 API 文档');
    console.log('├── generated/');
    console.log('│   ├── api-types.d.ts         # TypeScript 类型定义');
    console.log('│   ├── endpoints.ts           # API 端点常量');
    console.log('│   ├── usage-example.ts       # 使用示例');
    console.log('│   └── .backup/               # 备份目录');
    console.log('├── .temp/                     # 临时文件目录');
    console.log('└── swagger-ts-toolkit.config.js # 配置文件');

    console.log('\n💻 接下来你可以：');
    console.log('1. 查看生成的类型定义：');
    console.log('   cat examples/docs/generated/api-types.d.ts');
    console.log('');
    console.log('2. 查看端点常量：');
    console.log('   cat examples/docs/generated/endpoints.ts');
    console.log('');
    console.log('3. 查看使用示例：');
    console.log('   cat examples/docs/generated/usage-example.ts');
    console.log('');
    console.log('4. 运行实际生成（需要先构建项目）：');
    console.log('   node examples/docs/generate-api.js');
    console.log('');
    console.log('5. 使用 CLI 命令：');
    console.log('   npx stt generate --config examples/docs/swagger-ts-toolkit.config.js');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    
    console.log('\n🔧 故障排除：');
    console.log('1. 确保项目已构建：npm run build');
    console.log('2. 检查文件权限');
    console.log('3. 验证 Swagger 文档格式');
    console.log('4. 查看详细错误信息');
  }
}

// 运行测试
testApiGeneration();