// 🏗️ 微服务架构示例
// 展示如何为多个微服务配置和生成 API 类型

import { SwaggerTsGenerator } from 'swagger-ts-toolkit';
import path from 'path';

async function microservicesExample() {
  console.log('🏗️ 微服务架构示例');
  
  // 微服务配置
  const microservicesConfig = {
    swagger: {
      localPaths: {
        // 用户服务
        userService: 'docs/swagger/user-service.yaml',
        // 订单服务  
        orderService: 'docs/swagger/order-service.yaml',
        // 支付服务
        paymentService: 'docs/swagger/payment-service.json',
        // 商品服务
        productService: 'docs/swagger/product-service.yaml',
        // 通知服务
        notificationService: 'docs/swagger/notification-service.json'
      },
      remoteUrls: {
        // 远程服务 URL（作为备选）
        userService: 'https://user-api.yourcompany.com/swagger/doc.json',
        orderService: 'https://order-api.yourcompany.com/swagger/doc.json',
        paymentService: 'https://payment-api.yourcompany.com/swagger/doc.json',
        productService: 'https://product-api.yourcompany.com/swagger/doc.json',
        notificationService: 'https://notification-api.yourcompany.com/swagger/doc.json'
      }
    },
    outputPath: 'src/types/api-generated.d.ts',
    endpointsPath: 'src/api/endpoints.ts'
  };

  const generator = new SwaggerTsGenerator(microservicesConfig);
  
  // 要处理的服务列表
  const services = [
    'userService',
    'orderService', 
    'paymentService',
    'productService',
    'notificationService'
  ];

  console.log(`📋 准备处理 ${services.length} 个微服务...`);

  // 为每个服务生成类型定义
  for (const service of services) {
    try {
      console.log(`\n🔄 处理服务: ${service}`);
      
      await generator.generate({
        source: 'auto',  // 自动选择本地或远程
        service: service
      });
      
      console.log(`✅ ${service} 处理完成`);
      
    } catch (error) {
      console.error(`❌ ${service} 处理失败:`, error.message);
      // 继续处理其他服务
      continue;
    }
  }

  console.log('\n🎉 微服务类型生成完成！');
  console.log('\n📁 生成的文件结构：');
  console.log('src/');
  console.log('├── types/');
  console.log('│   └── api-generated.d.ts     # 所有服务的类型定义');
  console.log('├── api/');
  console.log('│   ├── endpoints.ts           # 所有端点常量');
  console.log('│   └── generated/');
  console.log('│       ├── userService.ts     # 用户服务 API');
  console.log('│       ├── orderService.ts    # 订单服务 API');
  console.log('│       ├── paymentService.ts  # 支付服务 API');
  console.log('│       ├── productService.ts  # 商品服务 API');
  console.log('│       └── notificationService.ts # 通知服务 API');

  console.log('\n💡 使用建议：');
  console.log('// 在你的代码中这样使用：');
  console.log('import { userServiceApi } from "@/api/generated/userService";');
  console.log('import { orderServiceApi } from "@/api/generated/orderService";');
  console.log('');
  console.log('// 类型安全的 API 调用');
  console.log('const user = await userServiceApi.getUserById({ id: 123 });');
  console.log('const orders = await orderServiceApi.getOrdersByUserId({ userId: 123 });');
}

// 运行示例
microservicesExample();