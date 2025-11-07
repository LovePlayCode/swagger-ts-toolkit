// 基本使用示例
import { SwaggerTsGenerator } from 'swagger-ts-toolkit';

async function main() {
  // 创建生成器实例
  const generator = new SwaggerTsGenerator({
    swagger: {
      localPaths: {
        api: 'docs/swagger.yaml'
      },
      remoteUrls: {
        development: 'https://api-test.example.com/swagger/doc.json'
      }
    },
    outputPath: 'src/types/api.d.ts',
    endpointsPath: 'src/api/endpoints.ts'
  });

  try {
    // 生成类型定义
    await generator.generate({
      source: 'auto',  // 自动检测本地文件，如果不存在则使用远程
      service: 'api'
    });
    
    console.log('✅ 代码生成成功');
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
  }
}

main();