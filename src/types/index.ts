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
  /** 备份路径 */
  backupPath: string;
  /** 临时JSON文件路径 */
  tempJsonPath: string;
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