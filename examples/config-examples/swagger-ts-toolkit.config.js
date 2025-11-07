// swagger-ts-toolkit 完整配置文件示例
export default {
  swagger: {
    // 本地文件路径配置
    localPaths: {
      // 环境相关的配置
      development: 'docs/swagger/api-dev.yaml',
      production: 'docs/swagger/api-prod.yaml',
      
      // 服务相关的配置
      userService: 'docs/swagger/user-service.yaml',
      orderService: 'docs/swagger/order-service.yaml',
      paymentService: 'docs/swagger/payment-service.json',
      
      // JSON 格式的配置
      userServiceJson: 'docs/swagger/user-service.json',
      orderServiceJson: 'docs/swagger/order-service.json',
    },
    
    // 远程URL配置
    remoteUrls: {
      development: 'https://api-test.example.com/swagger/doc.json',
      production: 'https://api.example.com/swagger/doc.json',
      
      // 服务相关的远程URL
      userService: 'https://user-api.example.com/swagger/doc.json',
      orderService: 'https://order-api.example.com/swagger/doc.json',
      paymentService: 'https://payment-api.example.com/swagger/doc.json',
    },
  },
  
  // 输出路径配置
  outputPath: 'src/typings/api-generated.d.ts',
  endpointsPath: 'src/api/generated/endpoints.ts',
  backupPath: 'src/typings/api-generated.backup.d.ts',
  tempJsonPath: 'temp/swagger-converted.json',
};