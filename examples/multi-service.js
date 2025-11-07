// 多服务配置示例
import { SwaggerTsGenerator } from 'swagger-ts-toolkit';

const config = {
  swagger: {
    localPaths: {
      userService: 'docs/swagger/user-service.yaml',
      orderService: 'docs/swagger/order-service.yaml',
      paymentService: 'docs/swagger/payment-service.json',
    },
    remoteUrls: {
      userService: 'https://user-api.example.com/swagger/doc.json',
      orderService: 'https://order-api.example.com/swagger/doc.json',
      paymentService: 'https://payment-api.example.com/swagger/doc.json',
    }
  }
};

async function generateAllServices() {
  const generator = new SwaggerTsGenerator(config);
  const services = ['userService', 'orderService', 'paymentService'];

  for (const service of services) {
    try {
      console.log(`🔄 生成 ${service} 服务代码...`);
      
      // 为每个服务生成独立的文件
      generator.updateConfig({
        outputPath: `src/types/${service}.d.ts`,
        endpointsPath: `src/api/${service}/endpoints.ts`
      });
      
      await generator.generate({
        source: 'auto',
        service
      });
      
      console.log(`✅ ${service} 生成完成`);
    } catch (error) {
      console.error(`❌ ${service} 生成失败:`, error.message);
    }
  }
}

generateAllServices();