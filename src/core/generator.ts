import type { GenerateOptions, GeneratorConfig } from '../types/index.js';
import { mergeConfig } from '../config/index.js';
import { 
  convertYamlToJson,
  cleanupTempFiles,
  backupFile,
  restoreFromBackup,
  detectFileFormat
} from '../utils/file-utils.js';
import {
  resolveSwaggerSource,
  loadSwaggerData,
  extractEndpoints,
  validateSwaggerData
} from '../swagger/parser.js';
import { generateTypeDefinitions } from '../generators/type-generator.js';
import { generateEndpointsFile } from '../generators/endpoints-generator.js';
import { generateApiModule } from '../generators/api-generator.js';
import { generateApiFunctions } from '../generators/api-function-generator.js';
import { startWatchMode } from '../watcher/file-watcher.js';

/**
 * 主要的代码生成器类
 */
export class SwaggerTsGenerator {
  private config: GeneratorConfig;

  constructor(config: Partial<GeneratorConfig> = {}) {
    this.config = mergeConfig(config);
  }

  /**
   * 生成所有代码
   */
  async generate(options: GenerateOptions = {}): Promise<void> {
    const { 
      source = 'auto', 
      service = 'default', 
      watch = false,
      generateApiFunctions: shouldGenerateApiFunctions = this.config.generateApiFunctions,
      apiFunctionsPath
    } = options;

    if (watch) {
      await startWatchMode((watchOptions) => this.generate({ ...options, ...watchOptions, watch: false }));
      return;
    }

    let tempJsonFile: string | null = null;

    try {
      const swaggerSource = await resolveSwaggerSource(this.config, source, service);
      console.log(`📖 使用 Swagger 源: ${swaggerSource}`);

      // 处理YAML文件
      let processedSource = swaggerSource;
      if (!swaggerSource.startsWith('http')) {
        const format = detectFileFormat(swaggerSource);
        if (format === 'yaml') {
          tempJsonFile = this.config.tempJsonPath;
          processedSource = await convertYamlToJson(swaggerSource, tempJsonFile);
        }
      }

      // 备份现有类型文件
      await backupFile(this.config.outputPath, this.config.backupPath);

      // 加载和验证 Swagger 数据
      const swaggerData = await loadSwaggerData(processedSource);
      validateSwaggerData(swaggerData);

      // 生成类型定义
      await generateTypeDefinitions(processedSource, this.config.outputPath);

      // 生成端点常量
      const endpoints = extractEndpoints(swaggerData);
      await generateEndpointsFile(endpoints, this.config.endpointsPath);

      // 生成API模块（兼容旧版本）
      const apiModulePath = `src/api/generated/${service}.ts`;
      await generateApiModule(swaggerData, apiModulePath, service);

      // 生成API函数（新功能）
      if (shouldGenerateApiFunctions) {
        const functionsPath = apiFunctionsPath || this.config.apiFunctionsPath.replace('.ts', `-${service}.ts`);
        await generateApiFunctions(swaggerData, functionsPath, service);
        console.log(`✅ API函数已生成: ${functionsPath}`);
      }

      console.log('✅ API 类型生成成功');
    } catch (error) {
      console.error('❌ API 类型生成失败:', (error as Error).message);
      await restoreFromBackup(this.config.backupPath, this.config.outputPath);
      throw error;
    } finally {
      // 清理临时文件
      if (tempJsonFile) {
        await cleanupTempFiles(tempJsonFile);
      }
    }
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<GeneratorConfig>): void {
    this.config = mergeConfig({ ...this.config, ...config });
  }

  /**
   * 获取当前配置
   */
  getConfig(): GeneratorConfig {
    return { ...this.config };
  }
}

/**
 * 便捷的生成函数
 */
export async function generateTypes(options: GenerateOptions = {}, config: Partial<GeneratorConfig> = {}): Promise<void> {
  const generator = new SwaggerTsGenerator(config);
  await generator.generate(options);
}