// 🤖 自动生成的API端点常量
// ⚠️  请勿手动修改此文件

export const API_ENDPOINTS = {
  getUsers: {
    path: '/users',
    method: 'GET',
    summary: `获取用户列表`
  },
  createUser: {
    path: '/users',
    method: 'POST',
    summary: `创建用户`
  },
  getUserById: {
    path: '/users/{id}',
    method: 'GET',
    summary: `获取用户详情`
  },
  updateUser: {
    path: '/users/{id}',
    method: 'PUT',
    summary: `更新用户`
  },
  deleteUser: {
    path: '/users/{id}',
    method: 'DELETE',
    summary: `删除用户`
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
