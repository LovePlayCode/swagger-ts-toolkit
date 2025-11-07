// 🌐 远程 Swagger 文档示例
// 展示如何从远程 URL 获取 Swagger 文档并生成类型

import { SwaggerTsGenerator } from 'swagger-ts-toolkit';

async function remoteSwaggerExample() {
  console.log('🌐 远程 Swagger 文档示例');
  
  const generator = new SwaggerTsGenerator({
    swagger: {
      remoteUrls: {
        // 一些公开的 Swagger API 示例
        petstore: 'https://petstore.swagger.io/v2/swagger.json',
        jsonplaceholder: 'https://jsonplaceholder.typicode.com/swagger.json',
        // 你的实际 API 文档 URL
        development: 'https://api-dev.yourcompany.com/swagger/doc.json',
        production: 'https://api.yourcompany.com/swagger/doc.json'
      }
    },
    outputPath: 'src/types/api-generated.d.ts',
    endpointsPath: 'src/api/endpoints.ts'
  });

  try {
    console.log('📡 从远程 URL 获取 Swagger 文档...');
    
    // 使用 petstore API 作为示例
    await generator.generate({
      source: 'remote',
      service: 'petstore'  // 对应配置中的 key
    });
    
    console.log('✅ 远程 Swagger 文档处理完成！');
    console.log('📊 生成的内容包括：');
    console.log('   - Pet, User, Order 等模型的 TypeScript 类型');
    console.log('   - 所有 API 端点的常量定义');
    console.log('   - 类型安全的 API 调用函数');
    
  } catch (error) {
    console.error('❌ 远程文档处理失败:', error.message);
    
    if (error.message.includes('fetch')) {
      console.log('💡 网络问题解决建议：');
      console.log('1. 检查网络连接');
      console.log('2. 确认 URL 是否可访问');
      console.log('3. 检查是否需要认证或代理');
    }
  }
}

// 运行示例
remoteSwaggerExample();