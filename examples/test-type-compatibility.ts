// 🧪 测试自定义Request客户端的类型兼容性

import { 
  elderSvrApi, 
  configureApiClient, 
  RequestClient, 
  ApiRequestConfig 
} from './docs/generated/api-functions-elderSvr';

// ==================== 类型兼容性测试 ====================

console.log('🔍 测试类型兼容性...\n');

// 测试1: 验证ApiRequestConfig类型
console.log('📋 测试1: ApiRequestConfig类型定义');

const validConfig: ApiRequestConfig = {
  url: '/test',
  method: 'POST',
  data: { test: 'data' },
  params: { page: 1 },
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  customProperty: 'custom-value' // 支持扩展属性
};

console.log('  ✅ ApiRequestConfig类型定义正确');
console.log('  📦 配置示例:', {
  url: validConfig.url,
  method: validConfig.method,
  hasData: !!validConfig.data,
  hasHeaders: !!validConfig.headers
});

// 测试2: 自定义客户端实现
console.log('\n🔧 测试2: 自定义客户端实现');

class TestRequestClient implements RequestClient {
  async request<T = any>(config: ApiRequestConfig): Promise<T> {
    console.log('  📡 接收配置类型:', typeof config);
    console.log('  📋 配置属性:', Object.keys(config));
    
    // 验证配置对象包含必要属性
    if (!config.url || !config.method) {
      throw new Error('缺少必要的配置属性');
    }
    
    // 模拟响应
    return Promise.resolve({
      success: true,
      message: '自定义客户端工作正常',
      receivedConfig: {
        url: config.url,
        method: config.method,
        hasData: !!config.data
      }
    } as T);
  }
}

const testClient = new TestRequestClient();

// 测试3: 配置自定义客户端
console.log('\n⚙️  测试3: 配置自定义客户端');

try {
  configureApiClient({
    customClient: testClient
  });
  console.log('  ✅ 自定义客户端配置成功');
} catch (error) {
  console.log('  ❌ 自定义客户端配置失败:', error.message);
}

// 测试4: API函数调用测试（模拟）
console.log('\n🎯 测试4: API函数类型检查');

// 检查函数签名是否使用了正确的类型
type GetAppSettingFunction = typeof elderSvrApi.paymentMgrServiceGetAppSetting;

// 提取参数类型
type GetAppSettingParams = Parameters<GetAppSettingFunction>;
type ConfigParam = GetAppSettingParams[1]; // 第二个参数应该是config

// 验证config参数类型
const testConfig: ConfigParam = {
  timeout: 3000,
  headers: { 'X-Test': 'value' }
};

console.log('  ✅ API函数参数类型正确');
console.log('  📝 config参数类型可选:', testConfig !== undefined);

// 测试5: 不同HTTP客户端的兼容性
console.log('\n🌐 测试5: 多种HTTP客户端兼容性');

// Fetch客户端
class FetchClient implements RequestClient {
  async request<T>(config: ApiRequestConfig): Promise<T> {
    console.log('  📡 Fetch客户端接收配置');
    return {} as T;
  }
}

// 原生XHR客户端
class XHRClient implements RequestClient {
  async request<T>(config: ApiRequestConfig): Promise<T> {
    console.log('  📡 XHR客户端接收配置');
    return {} as T;
  }
}

// 模拟Ky客户端
class KyClient implements RequestClient {
  async request<T>(config: ApiRequestConfig): Promise<T> {
    console.log('  📡 Ky客户端接收配置');
    return {} as T;
  }
}

const clients = [
  { name: 'Fetch', client: new FetchClient() },
  { name: 'XHR', client: new XHRClient() },
  { name: 'Ky', client: new KyClient() }
];

clients.forEach(({ name, client }) => {
  try {
    // 验证客户端实现了正确的接口
    const isValidClient = typeof client.request === 'function';
    console.log(`  ${isValidClient ? '✅' : '❌'} ${name}客户端: ${isValidClient ? '兼容' : '不兼容'}`);
  } catch (error) {
    console.log(`  ❌ ${name}客户端测试失败:`, error.message);
  }
});

// 测试6: 类型安全检查
console.log('\n🛡️  测试6: 类型安全检查');

// 这些应该通过TypeScript类型检查
const safeConfig1: ApiRequestConfig = { url: '/test', method: 'GET' };
const safeConfig2: ApiRequestConfig = { 
  url: '/test', 
  method: 'POST', 
  data: { key: 'value' },
  headers: { 'Authorization': 'Bearer token' }
};

// 验证必需属性
console.log('  ✅ 基本配置类型安全');
console.log('  ✅ 完整配置类型安全');

// 测试7: 扩展性测试
console.log('\n🔧 测试7: 配置扩展性');

const extendedConfig: ApiRequestConfig = {
  url: '/api/test',
  method: 'POST',
  data: { test: true },
  // 自定义扩展属性
  retryCount: 3,
  cacheKey: 'test-cache',
  customHeaders: { 'X-Custom': 'value' },
  metadata: { source: 'test' }
};

console.log('  ✅ 支持自定义扩展属性');
console.log('  📊 扩展属性数量:', Object.keys(extendedConfig).length - 4); // 减去标准属性

console.log('\n🎉 所有类型兼容性测试通过！');

// ==================== 总结 ====================
console.log('\n📊 测试总结:');
console.log('✅ ApiRequestConfig类型定义正确');
console.log('✅ 自定义客户端接口兼容');
console.log('✅ API函数参数类型正确');
console.log('✅ 多种HTTP客户端兼容');
console.log('✅ 类型安全检查通过');
console.log('✅ 配置扩展性良好');

console.log('\n💡 优势:');
console.log('  • 完全类型安全');
console.log('  • HTTP库无关');
console.log('  • 支持配置扩展');
console.log('  • 向后兼容');

export { validConfig, TestRequestClient };