import type { GeneratorConfig } from '../types/index.js';

/**
 * 默认配置
 */
export const DEFAULT_CONFIG: GeneratorConfig = {
  // Swagger 文档配置
  swagger: {
    // 本地文件路径（优先使用）
    localPaths: {
      development: 'docs/swagger/api-dev.yaml',
      production: 'docs/swagger/api-prod.yaml',
      // 可以配置多个后端服务的swagger文件
      elderSvr: 'docs/swagger/elder-service.yaml',
      userSvr: 'docs/swagger/user-service.yaml',
      open: 'docs/swagger/open.yaml',
      // 同时支持JSON格式
      elderSvrJson: 'docs/swagger/elder-service.json',
      userSvrJson: 'docs/swagger/user-service.json',
    },
    // 远程URL（作为备选方案）
    remoteUrls: {
      development: 'https://api-test.community-platform.qq.com/swagger/doc.json',
      production: 'https://api.community-platform.qq.com/swagger/doc.json',
    },
  },
  // 输出文件路径
  outputPath: 'src/typings/api-generated.d.ts',
  // 端点常量输出路径
  endpointsPath: 'src/api/generated/endpoints.ts',
  // 备份路径
  backupPath: 'src/typings/api-generated.backup.d.ts',
  // 临时JSON文件路径（用于YAML转换）
  tempJsonPath: 'temp/swagger-converted.json',
};

/**
 * 合并用户配置与默认配置
 */
export function mergeConfig(userConfig: Partial<GeneratorConfig> = {}): GeneratorConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
    swagger: {
      ...DEFAULT_CONFIG.swagger,
      ...userConfig.swagger,
      localPaths: {
        ...DEFAULT_CONFIG.swagger.localPaths,
        ...userConfig.swagger?.localPaths,
      },
      remoteUrls: {
        ...DEFAULT_CONFIG.swagger.remoteUrls,
        ...userConfig.swagger?.remoteUrls,
      },
    },
  };
}

/**
 * 从文件加载配置
 */
export async function loadConfigFromFile(configPath?: string): Promise<Partial<GeneratorConfig>> {
  if (!configPath) {
    return {};
  }

  try {
    const { default: config } = await import(configPath);
    return config;
  } catch (error) {
    console.warn(`⚠️  无法加载配置文件 ${configPath}:`, error);
    return {};
  }
}