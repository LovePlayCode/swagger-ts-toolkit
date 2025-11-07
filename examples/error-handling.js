// 🛡️ 错误处理示例
// 展示如何优雅地处理各种错误情况

import { SwaggerTsGenerator } from 'swagger-ts-toolkit';
import fs from 'fs/promises';
import path from 'path';

async function errorHandlingExample() {
  console.log('🛡️ 错误处理示例');
  
  const generator = new SwaggerTsGenerator({
    swagger: {
      localPaths: {
        valid: 'docs/swagger/valid-api.yaml',
        invalid: 'docs/swagger/invalid-api.yaml',
        nonexistent: 'docs/swagger/does-not-exist.yaml'
      },
      remoteUrls: {
        valid: 'https://petstore.swagger.io/v2/swagger.json',
        invalid: 'https://invalid-url-example.com/swagger.json',
        timeout: 'https://httpstat.us/200?sleep=30000' // 模拟超时
      }
    },
    outputPath: 'src/types/api.d.ts',
    endpointsPath: 'src/api/endpoints.ts'
  });

  // 测试场景 1: 文件不存在
  console.log('\n📋 测试场景 1: 处理不存在的本地文件');
  try {
    await generator.generate({
      source: 'local',
      service: 'nonexistent'
    });
  } catch (error) {
    console.log('✅ 正确捕获了文件不存在错误:', error.message);
    console.log('💡 解决方案: 检查文件路径是否正确');
  }

  // 测试场景 2: 无效的 Swagger 格式
  console.log('\n📋 测试场景 2: 处理无效的 Swagger 格式');
  
  // 创建一个无效的 Swagger 文件进行测试
  try {
    await fs.mkdir('docs/swagger', { recursive: true });
    await fs.writeFile('docs/swagger/invalid-api.yaml', `
# 这是一个无效的 Swagger 文件
invalid_structure:
  - missing required fields
  - no paths defined
    `);
    
    await generator.generate({
      source: 'local',
      service: 'invalid'
    });
  } catch (error) {
    console.log('✅ 正确捕获了格式错误:', error.message);
    console.log('💡 解决方案: 使用 Swagger 编辑器验证文档格式');
  }

  // 测试场景 3: 网络错误
  console.log('\n📋 测试场景 3: 处理网络错误');
  try {
    await generator.generate({
      source: 'remote',
      service: 'invalid'
    });
  } catch (error) {
    console.log('✅ 正确捕获了网络错误:', error.message);
    console.log('💡 解决方案: 检查网络连接和 URL 有效性');
  }

  // 测试场景 4: 权限错误
  console.log('\n📋 测试场景 4: 处理文件权限错误');
  try {
    // 尝试写入到只读目录（模拟权限错误）
    const readOnlyGenerator = new SwaggerTsGenerator({
      ...generator.getConfig(),
      outputPath: '/root/readonly/api.d.ts' // 通常没有写权限的路径
    });
    
    await readOnlyGenerator.generate({
      source: 'remote',
      service: 'valid'
    });
  } catch (error) {
    console.log('✅ 正确捕获了权限错误:', error.message);
    console.log('💡 解决方案: 检查目标目录的写入权限');
  }

  // 展示错误恢复机制
  console.log('\n🔄 错误恢复机制演示');
  
  const robustGenerator = new SwaggerTsGenerator({
    swagger: {
      localPaths: {
        primary: 'docs/swagger/primary-api.yaml',
        fallback: 'docs/swagger/fallback-api.yaml'
      },
      remoteUrls: {
        primary: 'https://petstore.swagger.io/v2/swagger.json'
      }
    },
    outputPath: 'src/types/api.d.ts',
    endpointsPath: 'src/api/endpoints.ts'
  });

  // 创建一个有效的备用文件
  await fs.writeFile('docs/swagger/fallback-api.yaml', `
openapi: 3.0.0
info:
  title: Fallback API
  version: 1.0.0
paths:
  /health:
    get:
      operationId: getHealth
      summary: Health check
      responses:
        '200':
          description: OK
  `);

  try {
    console.log('尝试使用主要源...');
    await robustGenerator.generate({
      source: 'local',
      service: 'primary'
    });
  } catch (primaryError) {
    console.log('主要源失败，尝试备用源...');
    try {
      await robustGenerator.generate({
        source: 'local', 
        service: 'fallback'
      });
      console.log('✅ 备用源成功！错误恢复完成');
    } catch (fallbackError) {
      console.log('❌ 备用源也失败了:', fallbackError.message);
    }
  }

  // 清理测试文件
  try {
    await fs.unlink('docs/swagger/invalid-api.yaml');
    await fs.unlink('docs/swagger/fallback-api.yaml');
  } catch (cleanupError) {
    // 忽略清理错误
  }

  console.log('\n📚 错误处理最佳实践：');
  console.log('1. 🔍 总是检查文件路径和网络连接');
  console.log('2. 📝 使用 Swagger 验证工具检查文档格式');
  console.log('3. 🔄 配置多个数据源作为备选方案');
  console.log('4. 📊 记录错误日志以便调试');
  console.log('5. 🛡️ 在 CI/CD 中添加验证步骤');
  console.log('6. 📦 定期备份生成的类型文件');

  console.log('\n🔧 常见问题解决方案：');
  console.log('• 文件不存在 → 检查路径配置');
  console.log('• 格式错误 → 使用 Swagger Editor 验证');
  console.log('• 网络错误 → 检查 URL 和网络连接');
  console.log('• 权限错误 → 检查目录写权限');
  console.log('• 类型错误 → 更新 openapi-typescript 版本');
}

// 运行示例
errorHandlingExample();