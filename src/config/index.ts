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
  // API函数输出路径
  apiFunctionsPath: 'src/api/generated/api-functions.ts',
  // 备份路径
  backupPath: 'src/typings/api-generated.backup.d.ts',
  // 临时JSON文件路径（用于YAML转换）
  tempJsonPath: 'temp/swagger-converted.json',
  // 是否生成API函数
  generateApiFunctions: true,
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
  // 如果没有指定配置文件路径，尝试查找默认配置文件
  if (!configPath) {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    
    // 尝试常见的配置文件名
    const possibleConfigs = [
      'swagger-ts-toolkit.config.js',
      'swagger-ts-toolkit.config.mjs',
      'swagger-ts-toolkit.config.json',
      'stt.config.js',
      'stt.config.mjs',
      'stt.config.json',
    ];
    
    for (const configFile of possibleConfigs) {
      try {
        await fs.access(configFile);
        // 文件存在，尝试加载
        const absolutePath = path.resolve(process.cwd(), configFile);
        console.log(`📋 使用配置文件: ${configFile}`);
        const { default: config } = await import(absolutePath);
        return config;
      } catch {
        // 文件不存在或加载失败，继续尝试下一个
        continue;
      }
    }
    
    // 没有找到配置文件，返回空对象（将使用默认配置）
    console.log('ℹ️  未找到配置文件，使用默认配置');
    return {};
  }

  // 指定了配置文件路径，尝试加载
  try {
    const path = await import('node:path');
    const absolutePath = path.resolve(process.cwd(), configPath);
    const { default: config } = await import(absolutePath);
    console.log(`📋 使用配置文件: ${configPath}`);
    return config;
  } catch (error) {
    console.warn(`⚠️  无法加载配置文件 ${configPath}:`, (error as Error).message);
    return {};
  }
}