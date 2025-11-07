// 🚀 快速开始示例
// 这个示例展示了最基本的使用方法

import { SwaggerTsGenerator } from 'swagger-ts-toolkit';

async function quickStart() {
  console.log('🎯 快速开始示例');
  
  try {
    // 1. 创建生成器实例（使用最简配置）
    const generator = new SwaggerTsGenerator({
      swagger: {
        localPaths: {
          // 假设你的 Swagger 文件在项目根目录的 docs 文件夹中
          api: 'docs/swagger.yaml'  // 或 swagger.json
        }
      },
      // 生成的文件会放在 src 目录下
      outputPath: 'src/types/api.d.ts',
      endpointsPath: 'src/api/endpoints.ts'
    });

    // 2. 生成类型定义和端点常量
    console.log('📖 开始解析 Swagger 文档...');
    await generator.generate({
      source: 'local',  // 使用本地文件
      service: 'api'    // 服务名称
    });
    
    console.log('✅ 生成完成！');
    console.log('📁 生成的文件：');
    console.log('   - src/types/api.d.ts        (TypeScript 类型定义)');
    console.log('   - src/api/endpoints.ts      (API 端点常量)');
    console.log('   - src/api/generated/api.ts  (API 调用函数)');
    
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    console.log('\n💡 常见问题解决：');
    console.log('1. 确保 Swagger 文件路径正确');
    console.log('2. 检查 Swagger 文件格式是否有效');
    console.log('3. 确保目标目录有写入权限');
  }
}

// 运行示例
quickStart();