// 完整的 swagger-ts-toolkit 配置示例
// 展示所有可用的配置选项和最佳实践

export default {
  // Swagger 文档配置
  swagger: {
    // 本地文件路径配置（优先使用）
    localPaths: {
      // 环境相关的配置
      development: 'docs/swagger/api-dev.yaml',
      staging: 'docs/swagger/api-staging.yaml',
      production: 'docs/swagger/api-prod.yaml',
      
      // 服务相关的配置（微服务架构）
      userService: 'docs/swagger/user-service.yaml',
      orderService: 'docs/swagger/order-service.yaml',
      paymentService: 'docs/swagger/payment-service.json',
      productService: 'docs/swagger/product-service.yaml',
      notificationService: 'docs/swagger/notification-service.json',
      
      // 第三方服务集成
      wechatApi: 'docs/swagger/wechat-api.yaml',
      alipayApi: 'docs/swagger/alipay-api.json',
      
      // 内部工具和管理 API
      adminApi: 'docs/swagger/admin-api.yaml',
      analyticsApi: 'docs/swagger/analytics-api.json',
      
      // 移动端专用 API
      mobileApi: 'docs/swagger/mobile-api.yaml',
      
      // 测试和示例 API
      testApi: 'examples/sample-swagger-files/petstore-api.yaml',
      sampleUserApi: 'examples/sample-swagger-files/user-service.json'
    },
    
    // 远程 URL 配置（作为备选方案）
    remoteUrls: {
      // 环境相关的远程URL
      development: 'http://localhost:8080/api/swagger/doc.json',
      staging: 'https://api-staging.yourcompany.com/swagger/doc.json',
      production: 'https://api.yourcompany.com/swagger/doc.json',
      
      // 微服务的远程URL
      userService: 'https://user-api.yourcompany.com/swagger/doc.json',
      orderService: 'https://order-api.yourcompany.com/swagger/doc.json',
      paymentService: 'https://payment-api.yourcompany.com/swagger/doc.json',
      productService: 'https://product-api.yourcompany.com/swagger/doc.json',
      notificationService: 'https://notification-api.yourcompany.com/swagger/doc.json',
      
      // 第三方服务 API 文档
      wechatApi: 'https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/',
      
      // 公开的示例 API
      petstore: 'https://petstore.swagger.io/v2/swagger.json',
      jsonplaceholder: 'https://jsonplaceholder.typicode.com/swagger.json'
    }
  },
  
  // 输出路径配置
  outputPath: 'src/types/api-generated.d.ts',
  endpointsPath: 'src/api/generated/endpoints.ts',
  
  // 备份和临时文件配置
  backupPath: 'src/types/.backup/api-generated.backup.d.ts',
  tempJsonPath: '.temp/swagger-converted.json',
  
  // 高级配置选项（如果工具支持）
  advanced: {
    // 是否生成详细注释
    generateComments: true,
    
    // 是否生成示例数据
    generateExamples: true,
    
    // 类型命名策略
    typeNamingStrategy: 'PascalCase', // 'PascalCase' | 'camelCase' | 'snake_case'
    
    // 是否生成验证函数
    generateValidators: false,
    
    // 是否压缩生成的文件
    minify: false,
    
    // 自定义类型映射
    typeMapping: {
      'integer': 'number',
      'long': 'number',
      'float': 'number',
      'double': 'number',
      'byte': 'string',
      'binary': 'string',
      'date': 'string',
      'dateTime': 'string',
      'password': 'string'
    },
    
    // 忽略的字段或路径
    ignore: {
      paths: [
        '/internal/**',
        '/debug/**'
      ],
      schemas: [
        'InternalDebugInfo',
        'SystemMetadata'
      ]
    }
  }
};

// 环境特定的配置覆盖
export const environmentConfigs = {
  development: {
    // 开发环境特定配置
    swagger: {
      localPaths: {
        default: 'docs/swagger/api-dev.yaml'
      },
      remoteUrls: {
        default: 'http://localhost:8080/api/swagger/doc.json'
      }
    },
    outputPath: 'src/types/api-dev.d.ts',
    advanced: {
      generateComments: true,
      generateExamples: true
    }
  },
  
  staging: {
    // 测试环境特定配置
    swagger: {
      remoteUrls: {
        default: 'https://api-staging.yourcompany.com/swagger/doc.json'
      }
    },
    outputPath: 'src/types/api-staging.d.ts',
    advanced: {
      generateComments: true,
      generateExamples: false
    }
  },
  
  production: {
    // 生产环境特定配置
    swagger: {
      remoteUrls: {
        default: 'https://api.yourcompany.com/swagger/doc.json'
      }
    },
    outputPath: 'src/types/api-prod.d.ts',
    advanced: {
      generateComments: false,
      generateExamples: false,
      minify: true
    }
  }
};

// 根据环境变量选择配置的辅助函数
export function getEnvironmentConfig() {
  const env = process.env.NODE_ENV || 'development';
  const baseConfig = getDefaultConfig();
  const envConfig = environmentConfigs[env] || {};
  
  return mergeConfigs(baseConfig, envConfig);
}

// 配置合并函数
function mergeConfigs(base, override) {
  return {
    ...base,
    ...override,
    swagger: {
      ...base.swagger,
      ...override.swagger,
      localPaths: {
        ...base.swagger?.localPaths,
        ...override.swagger?.localPaths
      },
      remoteUrls: {
        ...base.swagger?.remoteUrls,
        ...override.swagger?.remoteUrls
      }
    },
    advanced: {
      ...base.advanced,
      ...override.advanced
    }
  };
}

// 获取默认配置
function getDefaultConfig() {
  // 这里返回上面定义的默认配置
  return {
    swagger: {
      localPaths: {},
      remoteUrls: {}
    },
    outputPath: 'src/types/api-generated.d.ts',
    endpointsPath: 'src/api/generated/endpoints.ts',
    backupPath: 'src/types/.backup/api-generated.backup.d.ts',
    tempJsonPath: '.temp/swagger-converted.json'
  };
}

// 使用示例
console.log('当前环境配置:', getEnvironmentConfig());

// 导出默认配置（这是 swagger-ts-toolkit 会使用的）
// export default getEnvironmentConfig();