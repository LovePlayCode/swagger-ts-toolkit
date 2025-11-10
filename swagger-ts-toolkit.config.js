// swagger-ts-toolkit 配置文件
export default {
  swagger: {
    localPaths: {
      development: 'docs/swagger/api-dev.yaml',
      production: 'docs/swagger/api-prod.yaml',
      // 添加更多服务配置
      // userService: 'docs/swagger/user-service.yaml',
    },
    remoteUrls: {
      development: 'https://api-test.example.com/swagger/doc.json',
      production: 'https://api.example.com/swagger/doc.json',
    },
  },
  outputPath: 'src/typings/api-generated.d.ts',
  endpointsPath: 'src/api/generated/endpoints.ts',
  apiFunctionsPath: 'src/api/generated/api-functions.ts',
  backupPath: 'src/typings/api-generated.backup.d.ts',
  tempJsonPath: 'temp/swagger-converted.json',
  generateApiFunctions: true,
};
