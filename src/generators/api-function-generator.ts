import fs from 'node:fs/promises';
import type { SwaggerData, ApiOperation } from '../types/index.js';
import { ensureDirectory } from '../utils/file-utils.js';
import { toCamelCase, formatComment, escapeTemplateString } from '../utils/string-utils.js';

/**
 * 参数信息
 */
interface ParameterInfo {
  name: string;
  type: string;
  required: boolean;
  in: 'path' | 'query' | 'header' | 'body';
  description?: string;
}

/**
 * API函数信息
 */
interface ApiFunctionInfo extends ApiOperation {
  functionName: string;
  parameters: ParameterInfo[];
  requestType: string;
  responseType: string;
  hasPathParams: boolean;
  hasQueryParams: boolean;
  hasBodyParams: boolean;
}

/**
 * 生成可直接调用的API函数模块
 */
export async function generateApiFunctions(
  swaggerData: SwaggerData,
  outputPath: string,
  serviceName: string = 'default'
): Promise<void> {
  console.log(`🔧 生成 API 函数模块: ${serviceName}`);

  const apiFunctions = extractApiFunctions(swaggerData);
  const content = generateApiFunctionsContent(apiFunctions, serviceName);

  await ensureDirectory(outputPath);
  await fs.writeFile(outputPath, content, 'utf-8');
  
  console.log(`✅ API函数模块已生成: ${outputPath}`);
}

/**
 * 提取API函数信息
 */
function extractApiFunctions(swaggerData: SwaggerData): ApiFunctionInfo[] {
  const functions: ApiFunctionInfo[] = [];
  const paths = swaggerData.paths || {};

  for (const [path, methods] of Object.entries(paths)) {
    for (const [method, config] of Object.entries(methods)) {
      if (typeof config === 'object' && config) {
        const operationId = config.operationId || generateOperationId(method, path);
        const functionName = toCamelCase(operationId);
        
        // 提取参数信息
        const parameters = extractParameters(config, swaggerData);
        const { requestType, responseType } = extractTypes(config, swaggerData, operationId);
        
        functions.push({
          operationId,
          functionName,
          path,
          method: method.toUpperCase(),
          summary: config.summary || '',
          requestBody: config.requestBody,
          responses: config.responses,
          parameters,
          requestType,
          responseType,
          hasPathParams: parameters.some(p => p.in === 'path'),
          hasQueryParams: parameters.some(p => p.in === 'query'),
          hasBodyParams: parameters.some(p => p.in === 'body') || !!config.requestBody
        });
      }
    }
  }

  return functions;
}

/**
 * 生成操作ID
 */
function generateOperationId(method: string, path: string): string {
  const cleanPath = path
    .replace(/^\//, '')
    .replace(/\{[^}]*\}/g, 'ById')
    .replace(/\//g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '');
  
  return `${method.toLowerCase()}_${cleanPath}`;
}

/**
 * 提取参数信息
 */
function extractParameters(operation: any, swaggerData: SwaggerData): ParameterInfo[] {
  const parameters: ParameterInfo[] = [];
  
  // 处理路径参数和查询参数
  if (operation.parameters && Array.isArray(operation.parameters)) {
    for (const param of operation.parameters) {
      if (param.$ref) {
        // 处理引用参数
        const refParam = resolveReference(param.$ref, swaggerData);
        if (refParam) {
          parameters.push(extractParameterInfo(refParam));
        }
      } else {
        parameters.push(extractParameterInfo(param));
      }
    }
  }

  // 处理请求体参数
  if (operation.requestBody) {
    const bodyParam: ParameterInfo = {
      name: 'data',
      type: 'any',
      required: operation.requestBody.required || false,
      in: 'body',
      description: operation.requestBody.description
    };

    // 尝试提取请求体类型
    if (operation.requestBody.content) {
      const content = operation.requestBody.content['application/json'] || 
                    operation.requestBody.content['application/x-www-form-urlencoded'] ||
                    Object.values(operation.requestBody.content)[0];
      
      if (content?.schema) {
        bodyParam.type = extractTypeFromSchema(content.schema, swaggerData);
      }
    }

    parameters.push(bodyParam);
  }

  return parameters;
}

/**
 * 提取参数信息
 */
function extractParameterInfo(param: any): ParameterInfo {
  return {
    name: param.name,
    type: extractTypeFromSchema(param.schema || { type: 'string' }),
    required: param.required || false,
    in: param.in,
    description: param.description
  };
}

/**
 * 从schema提取类型
 */
function extractTypeFromSchema(schema: any, swaggerData?: SwaggerData): string {
  if (!schema) return 'any';

  if (schema.$ref) {
    const refName = schema.$ref.replace('#/components/schemas/', '');
    return `components['schemas']['${refName}']`;
  }

  switch (schema.type) {
    case 'string':
      return 'string';
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array': {
      const itemType = extractTypeFromSchema(schema.items, swaggerData);
      return `${itemType}[]`;
    }
    case 'object':
      return 'Record<string, any>';
    default:
      return 'any';
  }
}

/**
 * 解析引用
 */
function resolveReference(ref: string, swaggerData: SwaggerData): any {
  const parts = ref.replace('#/', '').split('/');
  let current: any = swaggerData;
  
  for (const part of parts) {
    current = current[part];
    if (!current) return null;
  }
  
  return current;
}

/**
 * 提取请求和响应类型
 */
function extractTypes(operation: any, swaggerData: SwaggerData, _operationId?: string): { requestType: string; responseType: string } {
  let requestType = 'any';
  let responseType = 'any';

  // 提取请求类型
  if (operation.requestBody?.content) {
    const content = operation.requestBody.content['application/json'];
    if (content?.schema) {
      requestType = extractTypeFromSchema(content.schema, swaggerData);
    }
  }

  // 提取响应类型 - 优先检查成功响应
  const successResponse = operation.responses?.['200'] || 
                         operation.responses?.['201'] || 
                         operation.responses?.['202'] ||
                         operation.responses?.['204'];
  
  if (successResponse?.content) {
    const content = successResponse.content['application/json'];
    if (content?.schema) {
      responseType = extractTypeFromSchema(content.schema, swaggerData);
      
      // 直接使用具体的响应类型，不再强制包装为 StandardResponse
      // 这样可以保持API的原始类型定义
    }
  } else if (operation.responses?.['204']) {
    // 204 No Content 响应
    responseType = 'void';
  }

  return { requestType, responseType };
}

/**
 * 生成API函数内容
 */
function generateApiFunctionsContent(apiFunctions: ApiFunctionInfo[], serviceName: string): string {
  const serviceNameCamel = toCamelCase(serviceName);
  
  let content = `// 🤖 基于Swagger自动生成的API调用函数 - ${serviceName}
// ⚠️  请勿手动修改此文件
// 📅 生成时间: ${new Date().toISOString()}

import type { components } from './api-generated';

// ==================== 请求配置接口 ====================

/**
 * 通用请求配置接口
 */
export interface ApiRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  [key: string]: any;
}

/**
 * 请求客户端接口
 */
export interface RequestClient {
  request<T = any>(config: ApiRequestConfig): Promise<T>;
}

/**
 * API客户端配置
 */
export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  customClient?: RequestClient;
}

// ==================== API客户端管理 ====================

let globalApiClient: RequestClient | null = null;

/**
 * 配置全局API客户端
 * @param config 客户端配置
 */
export function configureApiClient(config: ApiClientConfig = {}): void {
  if (config.customClient) {
    // 使用用户提供的自定义客户端
    globalApiClient = config.customClient;
  } else {
    // 创建默认的Axios客户端
    let axios: any;
    try {
      axios = require('axios');
    } catch (e) {
      throw new Error('axios not found. Please install axios or provide customClient.');
    }

    const axiosInstance = axios.create({
      baseURL: config.baseURL || process.env.REACT_APP_API_BASE_URL || process.env.VUE_APP_API_BASE_URL || '/api',
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    globalApiClient = {
      request: <T = any>(requestConfig: ApiRequestConfig): Promise<T> => {
        return axiosInstance.request(requestConfig).then((response: any) => response.data);
      },
    };
  }
}

/**
 * 获取当前API客户端
 */
export function getApiClient(): RequestClient {
  if (!globalApiClient) {
    configureApiClient();
  }
  return globalApiClient!;
}

// ==================== 工具函数 ====================

/**
 * 构建URL路径，替换路径参数
 */
function buildPath(path: string, pathParams: Record<string, any> = {}): string {
  let builtPath = path;
  for (const [key, value] of Object.entries(pathParams)) {
    builtPath = builtPath.replace(` + '`{${key}}`' + `, encodeURIComponent(String(value)));
  }
  return builtPath;
}

// ==================== API函数集合 ====================

/**
 * ${serviceName} 服务API函数集合
 */
export const ${serviceNameCamel}Api = {
`;

  // 为每个API生成函数
  for (const func of apiFunctions) {
    content += generateSingleApiFunction(func);
  }

  content += `};

// ==================== 导出 ====================

export type ${serviceNameCamel}ApiType = typeof ${serviceNameCamel}Api;
export type { components } from './api-generated';

// ==================== 使用示例 ====================

/*
// 方式1: 使用默认配置
import { ${serviceNameCamel}Api } from './${serviceName}';
const result = await ${serviceNameCamel}Api.someMethod();

// 方式2: 自定义baseURL和headers
import { ${serviceNameCamel}Api, configureApiClient } from './${serviceName}';
configureApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'value' }
});

// 方式3: 使用完全自定义的客户端
import axios from 'axios';
import { ${serviceNameCamel}Api, configureApiClient } from './${serviceName}';

const customAxios = axios.create({
  baseURL: 'https://api.example.com'
});

// 添加拦截器
customAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

customAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) window.location.href = '/login';
    return Promise.reject(error);
  }
);

configureApiClient({
  customClient: {
    request: (config) => customAxios.request(config)
  }
});
*/
`;

  return content;
}

/**
 * 生成单个API函数
 */
function generateSingleApiFunction(func: ApiFunctionInfo): string {
  const { functionName, method, path, summary, parameters, responseType, hasPathParams, hasQueryParams, hasBodyParams } = func;
  
  // 构建参数类型
  const paramTypes: string[] = [];
  const pathParams = parameters.filter(p => p.in === 'path');
  const queryParams = parameters.filter(p => p.in === 'query');
  const bodyParams = parameters.filter(p => p.in === 'body');
  
  // 路径参数
  if (hasPathParams) {
    const pathParamTypes = pathParams.map(p => `${p.name}: ${p.type}`).join('; ');
    paramTypes.push(`pathParams: { ${pathParamTypes} }`);
  }
  
  // 查询参数
  if (hasQueryParams) {
    const queryParamTypes = queryParams.map(p => `${p.name}${p.required ? '' : '?'}: ${p.type}`).join('; ');
    paramTypes.push(`queryParams?: { ${queryParamTypes} }`);
  }
  
  // 请求体参数
  if (hasBodyParams) {
    const bodyParam = bodyParams[0] || { type: 'any' };
    paramTypes.push(`data: ${bodyParam.type}`);
  } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    paramTypes.push(`data?: any`);
  }
  
  // 配置参数
  paramTypes.push(`config?: ApiRequestConfig`);
  
  const paramString = paramTypes.length > 0 ? paramTypes.join(', ') : '';
  
  // 生成函数体
  let functionBody = '';
  
  // 构建URL
  if (hasPathParams) {
    functionBody += `    const url = buildPath('${path}', pathParams);\n`;
  } else {
    functionBody += `    const url = '${path}';\n`;
  }
  
  // 构建请求配置
  functionBody += `    const requestConfig: ApiRequestConfig = {\n`;
  functionBody += `      method: '${method}',\n`;
  functionBody += `      url,\n`;
  
  if (hasQueryParams) {
    functionBody += `      params: queryParams,\n`;
  }
  
  if (hasBodyParams || (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    functionBody += `      data,\n`;
  }
  
  functionBody += `      ...config,\n`;
  functionBody += `    };\n\n`;
  
  // 发送请求 - 使用可配置的客户端
  functionBody += `    return getApiClient().request<${responseType}>(requestConfig);`;
  
  return `  /**
   * ${escapeTemplateString(formatComment(summary || functionName))}
   * @description ${method} ${path}
${parameters.map(p => `   * @param ${p.name} ${p.description || ''}`).join('\n')}
   * @returns Promise<${responseType}>
   */
  async ${functionName}(${paramString}): Promise<${responseType}> {
${functionBody}
  },

`;
}