// 🌍 真实项目使用示例
// 展示在实际 React/Vue 项目中如何集成和使用

import { SwaggerTsGenerator } from 'swagger-ts-toolkit';

// 模拟的项目配置
interface ProjectConfig {
  apiBaseUrl: string;
  swaggerUrl: string;
  environment: 'development' | 'staging' | 'production';
}

async function realWorldUsageExample() {
  console.log('🌍 真实项目使用示例');
  
  // 1. 项目初始化配置
  const projectConfig: ProjectConfig = {
    apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    swaggerUrl: process.env.REACT_APP_SWAGGER_URL || 'http://localhost:3000/api/swagger/doc.json',
    environment: (process.env.NODE_ENV as any) || 'development'
  };

  console.log('📋 项目配置:', projectConfig);

  // 2. 创建适合项目的生成器配置
  const generator = new SwaggerTsGenerator({
    swagger: {
      localPaths: {
        // 本地开发时的 Swagger 文件
        development: 'api-docs/swagger-dev.yaml',
        staging: 'api-docs/swagger-staging.yaml',
        production: 'api-docs/swagger-prod.yaml'
      },
      remoteUrls: {
        // 各环境的远程 API 文档
        development: 'http://localhost:8080/api/swagger/doc.json',
        staging: 'https://api-staging.yourcompany.com/swagger/doc.json',
        production: 'https://api.yourcompany.com/swagger/doc.json'
      }
    },
    // 生成到 src 目录，便于 IDE 识别
    outputPath: 'src/types/api.d.ts',
    endpointsPath: 'src/api/endpoints.ts',
    backupPath: 'src/types/.backup/api.backup.d.ts',
    tempJsonPath: '.temp/swagger.json'
  });

  try {
    // 3. 根据环境生成对应的类型
    console.log(`\n🔄 为 ${projectConfig.environment} 环境生成 API 类型...`);
    
    await generator.generate({
      source: 'auto', // 优先本地，本地不存在则使用远程
      service: projectConfig.environment
    });

    console.log('✅ API 类型生成完成！');

    // 4. 展示生成的文件如何在项目中使用
    console.log('\n📝 在你的项目中这样使用：');
    
    console.log('\n// 1. 导入生成的类型和端点');
    console.log("import type { components } from '@/types/api';");
    console.log("import { API_ENDPOINTS } from '@/api/endpoints';");
    console.log("import { httpClient } from '@/utils/http';");

    console.log('\n// 2. 定义类型别名（可选，但推荐）');
    console.log("type User = components['schemas']['User'];");
    console.log("type CreateUserRequest = components['schemas']['CreateUserRequest'];");
    console.log("type ApiResponse<T> = components['schemas']['ApiResponse'] & { data: T };");

    console.log('\n// 3. 创建类型安全的 API 服务');
    console.log(`
class UserService {
  // 获取用户列表
  static async getUsers(): Promise<ApiResponse<User[]>> {
    const endpoint = API_ENDPOINTS.getUsers;
    return httpClient.get<ApiResponse<User[]>>(endpoint.path);
  }

  // 根据 ID 获取用户
  static async getUserById(id: number): Promise<ApiResponse<User>> {
    const endpoint = API_ENDPOINTS.getUserById;
    const url = endpoint.path.replace('{id}', id.toString());
    return httpClient.get<ApiResponse<User>>(url);
  }

  // 创建用户
  static async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    const endpoint = API_ENDPOINTS.createUser;
    return httpClient.post<ApiResponse<User>>(endpoint.path, userData);
  }
}
    `);

    console.log('\n// 4. 在 React 组件中使用');
    console.log(`
import React, { useEffect, useState } from 'react';
import type { components } from '@/types/api';

type User = components['schemas']['User'];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('获取用户列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <h2>用户列表</h2>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};
    `);

    console.log('\n// 5. 在 Vue 组件中使用');
    console.log(`
<template>
  <div>
    <h2>用户列表</h2>
    <div v-if="loading">加载中...</div>
    <div v-else>
      <div v-for="user in users" :key="user.id">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { components } from '@/types/api';

type User = components['schemas']['User'];

const users = ref<User[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await UserService.getUsers();
    users.value = response.data;
  } catch (error) {
    console.error('获取用户列表失败:', error);
  } finally {
    loading.value = false;
  }
});
</script>
    `);

    // 5. CI/CD 集成建议
    console.log('\n🚀 CI/CD 集成建议：');
    
    console.log('\n// package.json 脚本配置');
    console.log(JSON.stringify({
      "scripts": {
        "api:generate": "stt generate",
        "api:generate:dev": "cross-env NODE_ENV=development stt generate",
        "api:generate:staging": "cross-env NODE_ENV=staging stt generate", 
        "api:generate:prod": "cross-env NODE_ENV=production stt generate",
        "api:validate": "stt validate",
        "prebuild": "npm run api:generate",
        "dev": "npm run api:generate:dev && vite",
        "build": "npm run api:generate:prod && vite build"
      }
    }, null, 2));

    console.log('\n// GitHub Actions 工作流示例');
    console.log(`
name: Generate API Types
on:
  push:
    paths:
      - 'api-docs/**'
  pull_request:
    paths:
      - 'api-docs/**'

jobs:
  generate-types:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run api:generate
      - run: npm run api:validate
    `);

    console.log('\n💡 最佳实践总结：');
    console.log('1. 🔄 在构建前自动生成类型');
    console.log('2. 📝 将生成的文件加入版本控制');
    console.log('3. 🧪 在 CI 中验证 API 文档');
    console.log('4. 🏷️  使用类型别名提高可读性');
    console.log('5. 🛡️ 统一错误处理机制');
    console.log('6. 📊 监控 API 变化对前端的影响');

  } catch (error) {
    console.error('❌ 示例执行失败:', error.message);
    
    console.log('\n🔧 故障排除：');
    console.log('1. 检查网络连接和 API 服务状态');
    console.log('2. 验证 Swagger 文档格式');
    console.log('3. 确认文件路径和权限');
    console.log('4. 查看详细错误日志');
  }
}

// 运行示例
realWorldUsageExample();