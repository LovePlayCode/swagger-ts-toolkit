// swagger-ts-toolkit 配置文件
// 用于从 docs 文件夹下的 Swagger 文档生成前端 API 接口

export default {
  // 主要的 Swagger 文档路径
  swaggerPath: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/swagger/user-api.yaml',
  
  swagger: {
    // 本地文件路径配置
    localPaths: {
      // 用户管理 API
      userApi: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/swagger/user-api.yaml',
      
      // 商品管理 API
      productApi: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/swagger/product-api.json',
    },
    
    // 远程 URL 配置（备选）
    remoteUrls: {
      // 如果本地文件不存在，可以从远程获取
      userApi: 'http://localhost:3000/api/v1/swagger/doc.json',
      productApi: 'http://localhost:3001/api/v2/swagger/doc.json',
    },
  },
  
  // 生成的类型定义文件路径
  outputPath: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/generated/api-generated.ts',
  
  // 生成的端点常量文件路径
  endpointsPath: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/generated/endpoints.ts',
  
  // 备份文件路径
  backupPath: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/generated/.backup/api-types.backup.d.ts',
  
  // 临时 JSON 文件路径（用于 YAML 转换）
  tempJsonPath: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/.temp/swagger-converted.json',
  
  // 🆕 启用 API 函数生成
  generateApiFunctions: true,
  
  // 🆕 API 函数输出路径
  apiFunctionsPath: '/Users/nathenieli/codebuddy/swagger-ts-toolkit/examples/docs/generated/api-functions-userApi.ts',
};