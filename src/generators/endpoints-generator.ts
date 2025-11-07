import fs from 'node:fs/promises';
import type { EndpointInfo } from '../types/index.js';
import { ensureDirectory } from '../utils/file-utils.js';

/**
 * 生成端点常量文件
 */
export async function generateEndpointsFile(
  endpoints: Record<string, EndpointInfo>,
  outputPath: string
): Promise<void> {
  console.log(`🔧 生成端点常量文件...`);

  const endpointEntries = Object.entries(endpoints);

  let content = `// 🤖 自动生成的API端点常量
// ⚠️  请勿手动修改此文件

export const API_ENDPOINTS = {
`;

  for (const [operationId, endpoint] of endpointEntries) {
    content += `  ${operationId}: {
    path: '${endpoint.path}',
    method: '${endpoint.method}',
    summary: \`${endpoint.summary.replace(/`/g, '\\`')}\`
  },
`;
  }

  content += `} as const;

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
`;

  // 确保目录存在
  await ensureDirectory(outputPath);
  await fs.writeFile(outputPath, content, 'utf-8');
  
  console.log(`✅ 端点常量已生成: ${outputPath}`);
}