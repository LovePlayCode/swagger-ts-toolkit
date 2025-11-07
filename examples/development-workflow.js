// 🔄 开发工作流示例
// 展示在开发过程中如何高效使用这个工具

import { SwaggerTsGenerator } from 'swagger-ts-toolkit';
import { startWatchMode } from 'swagger-ts-toolkit';

async function developmentWorkflow() {
  console.log('🔄 开发工作流示例');
  
  const generator = new SwaggerTsGenerator({
    swagger: {
      localPaths: {
        // 开发环境通常使用本地文件
        development: 'docs/swagger/api-dev.yaml',
        staging: 'docs/swagger/api-staging.yaml',
        production: 'docs/swagger/api-prod.yaml'
      },
      remoteUrls: {
        // 也可以配置远程 URL 作为备选
        development: 'http://localhost:8080/swagger/doc.json',
        staging: 'https://api-staging.yourcompany.com/swagger/doc.json',
        production: 'https://api.yourcompany.com/swagger/doc.json'
      }
    },
    outputPath: 'src/types/api.d.ts',
    endpointsPath: 'src/api/endpoints.ts'
  });

  console.log('🛠️  开发工作流程：');
  
  try {
    // 步骤 1: 初始生成
    console.log('\n📋 步骤 1: 初始生成类型定义');
    await generator.generate({
      source: 'auto',
      service: 'development'
    });
    console.log('✅ 初始生成完成');

    // 步骤 2: 展示如何在不同环境间切换
    console.log('\n🔄 步骤 2: 切换到不同环境');
    
    const environments = ['development', 'staging', 'production'];
    const currentEnv = process.env.NODE_ENV || 'development';
    
    console.log(`当前环境: ${currentEnv}`);
    console.log('可用环境:', environments.join(', '));
    
    // 根据环境生成对应的类型
    await generator.generate({
      source: 'auto',
      service: currentEnv
    });
    
    console.log(`✅ ${currentEnv} 环境类型生成完成`);

    // 步骤 3: 监听模式（开发时非常有用）
    console.log('\n👀 步骤 3: 启动监听模式');
    console.log('💡 在开发过程中，你可以运行以下命令启动监听模式：');
    console.log('   npx stt generate --watch');
    console.log('   这样当 Swagger 文件发生变化时，会自动重新生成类型');
    
    // 步骤 4: 验证生成的文件
    console.log('\n✅ 步骤 4: 验证生成的文件');
    console.log('检查以下文件是否正确生成：');
    console.log('- src/types/api.d.ts (TypeScript 类型定义)');
    console.log('- src/api/endpoints.ts (API 端点常量)');
    console.log('- src/api/generated/development.ts (API 调用函数)');

  } catch (error) {
    console.error('❌ 工作流执行失败:', error.message);
    
    console.log('\n🔧 故障排除指南：');
    console.log('1. 检查 Swagger 文件是否存在且格式正确');
    console.log('2. 确认网络连接（如果使用远程 URL）');
    console.log('3. 检查文件权限');
    console.log('4. 查看详细错误信息');
  }

  console.log('\n📚 开发最佳实践：');
  console.log('1. 🔄 使用监听模式进行开发');
  console.log('2. 🌍 为不同环境配置不同的 Swagger 源');
  console.log('3. 📝 定期验证生成的类型是否正确');
  console.log('4. 🔒 在 CI/CD 中集成类型生成步骤');
  console.log('5. 📦 将生成的文件加入版本控制');

  console.log('\n💻 推荐的 package.json 脚本：');
  console.log(JSON.stringify({
    "scripts": {
      "api:generate": "stt generate",
      "api:generate:dev": "stt generate --service development",
      "api:generate:prod": "stt generate --service production", 
      "api:watch": "stt generate --watch",
      "api:validate": "stt validate"
    }
  }, null, 2));
}

// 运行示例
developmentWorkflow();