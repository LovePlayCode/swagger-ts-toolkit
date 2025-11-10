#!/usr/bin/env node

// 从 docs 文件夹下的 Swagger 文档生成前端可调用的 API 接口
// 使用方法：node examples/docs/generate-api.js

import { SwaggerTsGenerator } from '../../dist/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateApiFromDocs() {
  console.log('🚀 开始从 docs 文件夹生成 API 接口...\n');

  // 配置生成器
  const generator = new SwaggerTsGenerator({
    swagger: {
      localPaths: {
        // 用户管理 API
        userApi: path.resolve(__dirname, 'swagger/user-api.yaml'),
        
        // 商品管理 API  
        productApi: path.resolve(__dirname, 'swagger/product-api.json'),
      }
    },
    
    // 生成文件的输出路径
    outputPath: path.resolve(__dirname, 'generated/api-types.d.ts'),
    endpointsPath: path.resolve(__dirname, 'generated/endpoints.ts'),
    apiFunctionsPath: path.resolve(__dirname, 'generated/api-functions.ts'),
    backupPath: path.resolve(__dirname, 'generated/.backup/api-types.backup.d.ts'),
    tempJsonPath: path.resolve(__dirname, '.temp/swagger-converted.json'),
    generateApiFunctions: true,
  });

  try {
    // 1. 生成用户 API
    console.log('📋 1. 生成用户管理 API...');
    await generator.generate({
      source: 'local',
      service: 'userApi'
    });
    console.log('✅ 用户 API 生成完成\n');

    // 2. 生成商品 API
    console.log('📋 2. 生成商品管理 API...');
    await generator.generate({
      source: 'local', 
      service: 'productApi'
    });
    console.log('✅ 商品 API 生成完成\n');

    // 3. 显示生成的文件
    console.log('📁 生成的文件：');
    console.log('├── generated/');
    console.log('│   ├── api-types.d.ts                    # TypeScript 类型定义');
    console.log('│   ├── endpoints.ts                      # API 端点常量');
    console.log('│   ├── userApi.ts                        # 用户服务 API 模块（兼容版本）');
    console.log('│   ├── productApi.ts                     # 商品服务 API 模块（兼容版本）');
    console.log('│   ├── api-functions-userApi.ts          # 🆕 用户API函数（推荐）');
    console.log('│   ├── api-functions-productApi.ts       # 🆕 商品API函数（推荐）');
    console.log('│   └── .backup/                          # 备份文件');

    console.log('\n🎉 所有 API 接口生成完成！');
    
    console.log('\n💻 新版API函数使用示例（推荐）：');
    console.log('```typescript');
    console.log('// 导入生成的API函数');
    console.log('import { userApi } from "./generated/api-functions-userApi";');
    console.log('import { productApi } from "./generated/api-functions-productApi";');
    console.log('import type { components } from "./generated/api-types";');
    console.log('');
    console.log('// 使用类型');
    console.log('type User = components["schemas"]["User"];');
    console.log('');
    console.log('// 调用 API - 自动处理路径参数和查询参数');
    console.log('const user = await userApi.getUserById({ pathParams: { id: 123 } });');
    console.log('const users = await userApi.getUserList({ queryParams: { page: 1, pageSize: 20 } });');
    console.log('const newUser = await userApi.createUser({ data: { name: "John", email: "john@example.com" } });');
    console.log('```');
    
    console.log('\n📚 更多示例：');
    console.log('• 查看 api-functions-example.ts 了解详细使用方法');
    console.log('• 查看 frontend-usage-example.ts 了解传统使用方法');

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    
    console.log('\n🔧 故障排除：');
    console.log('1. 检查 Swagger 文件是否存在：');
    console.log('   - examples/docs/swagger/user-api.yaml');
    console.log('   - examples/docs/swagger/product-api.json');
    console.log('2. 验证 Swagger 文档格式是否正确');
    console.log('3. 确保有文件写入权限');
    console.log('4. 检查 swagger-ts-toolkit 是否已正确构建');
    
    process.exit(1);
  }
}

// 运行生成脚本
generateApiFromDocs();