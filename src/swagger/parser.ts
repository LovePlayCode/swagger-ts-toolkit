import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import yaml from 'js-yaml';
import type { SwaggerData, EndpointInfo, ApiOperation, GeneratorConfig } from '../types/index.js';
import { detectFileFormat, fileExists } from '../utils/file-utils.js';

/**
 * 解析 Swagger 源（支持YAML和JSON）
 */
export async function resolveSwaggerSource(
  config: GeneratorConfig,
  source: string = 'auto',
  service: string = 'default'
): Promise<string> {
  const env = process.env.NODE_ENV || 'development';

  if (source === 'local' || source === 'auto') {
    // 优先检查本地文件（YAML和JSON都检查）
    const possiblePaths = [
      config.swagger.localPaths[service],
      config.swagger.localPaths[`${service}Json`],
      config.swagger.localPaths[env],
    ].filter(Boolean);

    for (const localPath of possiblePaths) {
      const fullLocalPath = path.resolve(process.cwd(), localPath);

      if (await fileExists(fullLocalPath)) {
        const format = detectFileFormat(localPath);
        console.log(`🔍 发现本地 ${format.toUpperCase()} 文件: ${localPath}`);
        return fullLocalPath;
      }
    }

    if (source === 'local') {
      throw new Error(
        `本地 Swagger 文件不存在，已检查路径: ${possiblePaths.join(', ')}`
      );
    }

    console.log(`⚠️  本地文件不存在，尝试使用远程源`);
  }

  if (source === 'remote' || source === 'auto') {
    // 使用远程URL
    const remoteUrl = config.swagger.remoteUrls[env];
    if (!remoteUrl) {
      throw new Error(`未配置 ${env} 环境的远程 Swagger URL`);
    }

    console.log(`🌐 使用远程 Swagger URL: ${remoteUrl}`);
    return remoteUrl;
  }

  throw new Error(`无效的源类型: ${source}`);
}

/**
 * 加载 Swagger 数据
 */
export async function loadSwaggerData(swaggerSource: string): Promise<SwaggerData> {
  let swaggerData: SwaggerData;

  // 根据源类型读取数据
  if (swaggerSource.startsWith('http')) {
    const response = await fetch(swaggerSource);
    if (!response.ok) {
      throw new Error(`获取远程 Swagger 文档失败: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('yaml')) {
      const yamlText = await response.text();
      swaggerData = yaml.load(yamlText) as SwaggerData;
    } else {
      swaggerData = await response.json() as SwaggerData;
    }
  } else {
    const content = await fs.readFile(swaggerSource, 'utf-8');
    const ext = path.extname(swaggerSource).toLowerCase();

    if (ext === '.yaml' || ext === '.yml') {
      swaggerData = yaml.load(content) as SwaggerData;
    } else {
      swaggerData = JSON.parse(content) as SwaggerData;
    }
  }

  return swaggerData;
}

/**
 * 提取端点信息
 */
export function extractEndpoints(swaggerData: SwaggerData): Record<string, EndpointInfo> {
  const endpoints: Record<string, EndpointInfo> = {};
  const paths = swaggerData.paths || {};

  for (const [path, methods] of Object.entries(paths)) {
    for (const [method, config] of Object.entries(methods)) {
      if (typeof config === 'object' && config.operationId) {
        const operationId = config.operationId;
        endpoints[operationId] = {
          path,
          method: method.toUpperCase(),
          summary: config.summary || '',
          description: config.description || '',
        };
      }
    }
  }

  return endpoints;
}

/**
 * 提取 API 操作信息
 */
export function extractApiOperations(swaggerData: SwaggerData): ApiOperation[] {
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
 * 验证 Swagger 数据结构
 */
export function validateSwaggerData(swaggerData: SwaggerData): void {
  if (!swaggerData || typeof swaggerData !== 'object') {
    throw new Error('无效的 Swagger 数据结构');
  }

  if (!swaggerData.paths || typeof swaggerData.paths !== 'object') {
    throw new Error('Swagger 数据中缺少 paths 字段');
  }

  const pathCount = Object.keys(swaggerData.paths).length;
  if (pathCount === 0) {
    console.warn('⚠️  Swagger 数据中没有找到任何 API 路径');
  } else {
    console.log(`📊 发现 ${pathCount} 个 API 路径`);
  }
}