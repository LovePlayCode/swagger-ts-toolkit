// 使用示例
import type { components } from './generated/api-types';
import { API_ENDPOINTS } from './generated/endpoints';

// 类型定义
type User = components['schemas']['User'];
type Product = components['schemas']['Product'];

// 使用端点常量
console.log('用户列表端点:', API_ENDPOINTS.getUserList.path);
console.log('商品详情端点:', API_ENDPOINTS.getProductById.path);

// API 调用示例
async function getUserList(): Promise<User[]> {
  const response = await fetch(API_ENDPOINTS.getUserList.path);
  const result = await response.json();
  return result.data;
}

async function getProductById(productId: number): Promise<Product> {
  const url = API_ENDPOINTS.getProductById.path.replace('{productId}', productId.toString());
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
}
