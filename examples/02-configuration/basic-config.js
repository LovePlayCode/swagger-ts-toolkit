#!/usr/bin/env node

// 🔧 基础配置示例
// 这是最简单的配置方式，适合快速开始

const { SwaggerTsGenerator } = require('../../dist/index.js');
const path = require('path');

console.log('📋 基础配置示例\n');

// 最简单的配置
const basicConfig = {
  // Swagger文档路径
  swagger: {
    localPaths: {
      // 服务名: 文档路径
      userApi: path.resolve(__dirname, '../08-swagger-files/user-service.json')
    }
  },
  
  // 输出文件路径
  outputPath: path.resolve(__dirname, './output/basic-api-types.d.ts')
};

async function runBasicExample() {
  console.log('🚀 使用基础配置生成API类型...\n');
  
  try {
    // 创建生成器实例
    const generator = new SwaggerTsGenerator(basicConfig);
    
    // 生成类型文件
    await generator.generate({
      source: 'local',
      service: 'userApi'
    });
    
    console.log('✅ 基础配置示例完成！');
    console.log('\n📁 生成的文件:');
    console.log('├── basic-api-types.d.ts    # TypeScript类型定义');
    
    console.log('\n💡 使用方法:');
    console.log('```typescript');
    console.log('import type { components } from "./basic-api-types";');
    console.log('');
    console.log('type User = components["schemas"]["User"];');
    console.log('```');
    
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  runBasicExample();
}

module.exports = {
  basicConfig,
  runBasicExample
};