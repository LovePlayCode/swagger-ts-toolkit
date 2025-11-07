// 🤖 自动生成的API端点常量
// ⚠️  请勿手动修改此文件

export const API_ENDPOINTS = {
  getProductList: {
    path: '/products',
    method: 'GET',
    summary: `获取商品列表`
  },
  createProduct: {
    path: '/products',
    method: 'POST',
    summary: `创建新商品`
  },
  getProductById: {
    path: '/products/{productId}',
    method: 'GET',
    summary: `根据ID获取商品详情`
  },
  updateProduct: {
    path: '/products/{productId}',
    method: 'PUT',
    summary: `更新商品信息`
  },
  deleteProduct: {
    path: '/products/{productId}',
    method: 'DELETE',
    summary: `删除商品`
  },
  getCategoryList: {
    path: '/categories',
    method: 'GET',
    summary: `获取商品分类列表`
  },
  getProductInventory: {
    path: '/products/{productId}/inventory',
    method: 'GET',
    summary: `获取商品库存`
  },
  updateProductInventory: {
    path: '/products/{productId}/inventory',
    method: 'PUT',
    summary: `更新商品库存`
  },
} as const;

// API端点类型
export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

// API操作ID类型
export type ApiOperationId = keyof typeof API_ENDPOINTS;

// 获取特定操作的端点信息
export function getEndpoint(operationId: ApiOperationId): ApiEndpoint {
  return API_ENDPOINTS[operationId];
}

// 获取所有端点列表
export function getAllEndpoints(): ApiOperationId[] {
  return Object.keys(API_ENDPOINTS) as ApiOperationId[];
}
