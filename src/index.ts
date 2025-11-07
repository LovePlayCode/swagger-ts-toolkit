// 主要导出
export { SwaggerTsGenerator, generateTypes } from './core/generator.js';

// 配置相关
export { DEFAULT_CONFIG, mergeConfig, loadConfigFromFile } from './config/index.js';

// 类型定义
export type {
  GeneratorConfig,
  SwaggerConfig,
  GenerateOptions,
  EndpointInfo,
  ApiOperation,
  SwaggerData,
  FileFormat
} from './types/index.js';

// 工具函数
export {
  detectFileFormat,
  convertYamlToJson,
  cleanupTempFiles,
  backupFile,
  restoreFromBackup,
  ensureDirectory,
  fileExists
} from './utils/file-utils.js';

export {
  camelCase,
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toSnakeCase,
  formatComment,
  escapeTemplateString
} from './utils/string-utils.js';

// Swagger 解析相关
export {
  resolveSwaggerSource,
  loadSwaggerData,
  extractEndpoints,
  validateSwaggerData
} from './swagger/parser.js';

// 生成器相关
export { generateTypeDefinitions } from './generators/type-generator.js';
export { generateEndpointsFile } from './generators/endpoints-generator.js';
export { generateApiModule } from './generators/api-generator.js';

// 监听器
export { startWatchMode } from './watcher/file-watcher.js';