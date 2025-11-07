/**
 * 配置接口定义
 */
export interface SwaggerConfig {
  /** 本地文件路径配置 */
  localPaths: Record<string, string>;
  /** 远程URL配置 */
  remoteUrls: Record<string, string>;
}

export interface GeneratorConfig {
  /** Swagger 文档配置 */
  swagger: SwaggerConfig;
  /** 输出文件路径 */
  outputPath: string;
  /** 端点常量输出路径 */
  endpointsPath: string;
  /** API函数输出路径 */
  apiFunctionsPath: string;
  /** 备份路径 */
  backupPath: string;
  /** 临时JSON文件路径 */
  tempJsonPath: string;
  /** 是否生成API函数 */
  generateApiFunctions: boolean;
}

/**
 * 生成选项
 */
export interface GenerateOptions {
  /** 数据源类型 */
  source?: 'auto' | 'local' | 'remote';
  /** 服务名称 */
  service?: string;
  /** 是否监听文件变化 */
  watch?: boolean;
  /** 是否生成API函数 */
  generateApiFunctions?: boolean;
  /** 自定义API函数输出路径 */
  apiFunctionsPath?: string;
}

/**
 * 端点信息
 */
export interface EndpointInfo {
  path: string;
  method: string;
  summary: string;
  description: string;
}

/**
 * API操作信息
 */
export interface ApiOperation {
  operationId: string;
  path: string;
  method: string;
  summary: string;
  requestBody?: any;
  responses?: any;
}

/**
 * Swagger文档数据结构
 */
export interface SwaggerData {
  paths: Record<string, Record<string, any>>;
  components?: {
    schemas?: Record<string, any>;
  };
}

/**
 * 文件格式类型
 */
export type FileFormat = 'yaml' | 'json';

/**
 * 参数信息
 */
export interface ParameterInfo {
  name: string;
  type: string;
  required: boolean;
  in: 'path' | 'query' | 'header' | 'body';
  description?: string;
}

/**
 * API函数信息
 */
export interface ApiFunctionInfo extends ApiOperation {
  functionName: string;
  parameters: ParameterInfo[];
  requestType: string;
  responseType: string;
  hasPathParams: boolean;
  hasQueryParams: boolean;
  hasBodyParams: boolean;
}