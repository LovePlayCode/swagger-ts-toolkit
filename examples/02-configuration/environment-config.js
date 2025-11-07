#!/usr/bin/env node

// 🌍 环境特定配置示例
// 展示如何为不同环境配置不同的设置

const { SwaggerTsGenerator } = require('../../dist/index.js');
const path = require('path');

console.log('🌍 环境配置示例\n');

// 获取当前环境
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`📊 当前环境: ${NODE_ENV}`);

// 基础配置
const baseConfig = {
  outputPath: path.resolve(__dirname, './output')
};

// 开发环境配置
const developmentConfig = {
  ...baseConfig,
  swagger: {
    localPaths: {
      // 开发环境使用本地文件
      userApi: path.resolve(__dirname, '../08-swagger-files/user-service.json'),
      productApi: path.resolve(__dirname, '../08-swagger-files/product-api.json')
    }
  },
  outputPath: path.resolve(__dirname, './output/dev-api-types.d.ts'),
  endpointsPath: path.resolve(__dirname, './output/dev-endpoints.ts'),
  // 开发环境启用详细日志
  verbose: true,
  // 开发环境保留备份
  backupPath: path.resolve(__dirname, './output/.backup/dev-api-types.backup.d.ts')
};

// 测试环境配置
const testConfig = {
  ...baseConfig,
  swagger: {
    localPaths: {
      // 测试环境使用简化的API
      userApi: path.resolve(__dirname, '../08-swagger-files/petstore-api.yaml')
    }
  },
  outputPath: path.resolve(__dirname, './output/test-api-types.d.ts'),
  // 测试环境不需要端点常量
  endpointsPath: null,
  // 测试环境不保留备份
  backupPath: null
};

// 生产环境配置
const productionConfig = {
  ...baseConfig,
  swagger: {
    remotePaths: {
      // 生产环境从远程获取最新文档
      userApi: 'https://api.production.com/swagger/user.json',
      productApi: 'https://api.production.com/swagger/product.json',
      orderApi: 'https://api.production.com/swagger/order.json'
    }
  },
  outputPath: path.resolve(__dirname, './output/prod-api-types.d.ts'),
  endpointsPath: path.resolve(__dirname, './output/prod-endpoints.ts'),
  // 生产环境启用压缩
  minify: true,
  // 生产环境保留备份
  backupPath: path.resolve(__dirname, './output/.backup/prod-api-types.backup.d.ts')
};

// 根据环境选择配置
function getConfigForEnvironment(env) {
  switch (env) {
    case 'development':
      return developmentConfig;
    case 'test':
      return testConfig;
    case 'production':
      return productionConfig;
    default:
      console.warn(`⚠️  未知环境: ${env}，使用开发环境配置`);
      return developmentConfig;
  }
}

async function runEnvironmentExample() {
  console.log('🚀 使用环境特定配置生成API类型...\n');
  
  try {
    // 获取当前环境的配置
    const config = getConfigForEnvironment(NODE_ENV);
    
    console.log('📋 当前配置:');
    console.log(`   输出路径: ${config.outputPath}`);
    console.log(`   端点路径: ${config.endpointsPath || '未配置'}`);
    console.log(`   备份路径: ${config.backupPath || '未配置'}`);
    console.log('');
    
    // 创建生成器实例
    const generator = new SwaggerTsGenerator(config);
    
    // 生成所有配置的服务
    const services = Object.keys(config.swagger.localPaths || config.swagger.remotePaths || {});
    
    for (const service of services) {
      const source = config.swagger.localPaths ? 'local' : 'remote';
      console.log(`📡 生成 ${service} (${source})...`);
      
      await generator.generate({
        source,
        service
      });
      
      console.log(`✅ ${service} 生成完成`);
    }
    
    console.log('\n🎉 环境配置示例完成！');
    
    // 显示环境特定的使用建议
    showEnvironmentTips(NODE_ENV);
    
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    
    if (NODE_ENV === 'production') {
      console.log('\n💡 生产环境故障排除:');
      console.log('1. 检查网络连接');
      console.log('2. 验证远程API是否可访问');
      console.log('3. 检查API文档格式是否正确');
    }
  }
}

function showEnvironmentTips(env) {
  console.log('\n💡 环境特定建议:');
  
  switch (env) {
    case 'development':
      console.log('🛠️  开发环境:');
      console.log('  • 使用本地Swagger文件，便于快速迭代');
      console.log('  • 启用详细日志，便于调试');
      console.log('  • 保留备份文件，防止意外丢失');
      console.log('  • 建议使用watch模式自动更新');
      break;
      
    case 'test':
      console.log('🧪 测试环境:');
      console.log('  • 使用简化的API，专注核心功能测试');
      console.log('  • 不生成端点常量，减少测试复杂度');
      console.log('  • 不保留备份，保持环境清洁');
      break;
      
    case 'production':
      console.log('🚀 生产环境:');
      console.log('  • 从远程获取最新API文档');
      console.log('  • 启用压缩，减小文件大小');
      console.log('  • 保留备份，便于回滚');
      console.log('  • 建议在CI/CD中自动执行');
      break;
  }
}

// 导出环境配置获取函数
function createEnvironmentConfig(env, customOptions = {}) {
  const baseConfig = getConfigForEnvironment(env);
  return {
    ...baseConfig,
    ...customOptions
  };
}

// 如果直接运行此文件
if (require.main === module) {
  runEnvironmentExample();
}

module.exports = {
  getConfigForEnvironment,
  createEnvironmentConfig,
  runEnvironmentExample,
  developmentConfig,
  testConfig,
  productionConfig
};