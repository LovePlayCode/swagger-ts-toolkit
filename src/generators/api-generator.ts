import fs from 'node:fs/promises';
import type { SwaggerData } from '../types/index.js';
import { ensureDirectory } from '../utils/file-utils.js';
import { toCamelCase, formatComment, escapeTemplateString } from '../utils/string-utils.js';

/**
 * API操作信息
 */
interface ApiOperation {
  operationId: string;
  path: string;
  method: string;
  summary: string;
  requestBody?: any;
  responses?: any;
}

/**
 * 生成API模块文件
 */
export async function generateApiModule(
  swaggerData: SwaggerData,
  outputPath: string,
  serviceName: string = 'default'
): Promise<void> {
  console.log(`🔧 生成 API 模块: ${serviceName}`);

  const operations = extractApiOperations(swaggerData);
  const content = generateApiModuleContent(operations, serviceName);

  await ensureDirectory(outputPath);
  await fs.writeFile(outputPath, content, 'utf-8');
  
  console.log(`✅ API模块已生成: ${outputPath}`);
}

/**
 * 提取API操作信息
 */
function extractApiOperations(swaggerData: SwaggerData): ApiOperation[] {
  const operations: ApiOperation[] = [];
  const paths = swaggerData.paths || {};

  for (const [path, methods] of Object.entries(paths)) {
    for (const [method, config] of Object.entries(methods)) {
      if (typeof config === 'object' && config.operationId) {
        operations.push({
          operationId: config.operationId,
          path,
          method: method.toUpperCase(),
          summary: config.summary || '',
          requestBody: config.requestBody,
          responses: config.responses,
        });
      }
    }
  }

  return operations;
}

/**
 * 生成API模块内容
 */
function generateApiModuleContent(operations: ApiOperation[], serviceName: string): string {
  let content = `// 🤖 基于Swagger生成的API调用模块 - ${serviceName}
// ⚠️  请勿手动修改此文件

import { typedHttp } from '@/utils/http/typed-client';
import type { components } from '@/typings/api-generated';
import { API_ENDPOINTS } from './endpoints';

/**
 * ${serviceName} 服务API接口
 */
export const ${toCamelCase(serviceName)}Api = {
`;

  // 为每个操作生成函数
  for (const operation of operations) {
    const { operationId, method, summary } = operation;
    const functionName = toCamelCase(operationId);
    const summaryText = formatComment(summary || operationId.replace(/([A-Z])/g, ' $1').trim());

    // 尝试提取请求和响应类型
    const { requestType, responseType } = extractTypes(operation);

    content += `  /**
   * ${escapeTemplateString(summaryText)}
   * @param data 请求参数
   * @returns 响应数据
   */
  async ${functionName}(data: ${requestType}): Promise<${responseType}> {
    return typedHttp.${method.toLowerCase()}(
      API_ENDPOINTS.${operationId}.path,
      data
    );
  },

`;
  }

  content += `};

// 导出服务类型
export type ${toCamelCase(serviceName)}ApiType = typeof ${toCamelCase(serviceName)}Api;

// 导出常用类型
export type {} from '@/typings/api-generated';
`;

  return content;
}

/**
 * 提取请求和响应类型
 */
function extractTypes(operation: ApiOperation): { requestType: string; responseType: string } {
  let requestType = 'any';
  let responseType = 'any';

  // 尝试提取请求类型
  if (
    operation.requestBody &&
    operation.requestBody.content &&
    operation.requestBody.content['application/json']
  ) {
    const schemaRef = operation.requestBody.content['application/json'].schema?.$ref;
    if (schemaRef) {
      const schemaName = schemaRef.replace('#/components/schemas/', '');
      requestType = `components['schemas']['${schemaName}']`;
    }
  }

  // 尝试提取响应类型
  if (
    operation.responses &&
    operation.responses['200'] &&
    operation.responses['200'].content &&
    operation.responses['200'].content['application/json']
  ) {
    const schemaRef = operation.responses['200'].content['application/json'].schema?.$ref;
    if (schemaRef) {
      const schemaName = schemaRef.replace('#/components/schemas/', '');
      responseType = `components['schemas']['${schemaName}']`;
    }
  }

  return { requestType, responseType };
}