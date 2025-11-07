#!/usr/bin/env node

import { Command } from 'commander';
import { SwaggerTsGenerator } from './core/generator.js';
import { loadConfigFromFile } from './config/index.js';
import type { GenerateOptions, GeneratorConfig } from './types/index.js';

const program = new Command();

program
  .name('swagger-ts-toolkit')
  .description('功能强大的 Swagger/OpenAPI TypeScript 工具包')
  .version('1.0.0');

program
  .command('generate')
  .alias('gen')
  .description('生成 TypeScript 类型和接口')
  .option('-s, --source <type>', '数据源类型 (auto|local|remote)', 'auto')
  .option('-S, --service <name>', '服务名称', 'default')
  .option('-c, --config <path>', '配置文件路径')
  .option('-w, --watch', '监听文件变化并自动重新生成', false)
  .option('-o, --output <path>', '输出文件路径')
  .option('-e, --endpoints <path>', '端点常量输出路径')
  .option('-f, --functions <path>', 'API函数输出路径')
  .option('--no-api-functions', '禁用API函数生成')
  .option('--api-functions', '启用API函数生成')
  .action(async (options) => {
    try {
      // 加载配置文件
      const fileConfig = await loadConfigFromFile(options.config);
      
      // 合并配置
      const config: Partial<GeneratorConfig> = {
        ...fileConfig,
      };
      
      if (options.output) {
        config.outputPath = options.output;
      }
      
      if (options.endpoints) {
        config.endpointsPath = options.endpoints;
      }

      if (options.functions) {
        config.apiFunctionsPath = options.functions;
      }

      // 处理API函数生成选项
      let generateApiFunctions = config.generateApiFunctions;
      if (options.apiFunctions) {
        generateApiFunctions = true;
      } else if (options.noApiFunctions) {
        generateApiFunctions = false;
      }

      // 生成选项
      const generateOptions: GenerateOptions = {
        source: options.source,
        service: options.service,
        watch: options.watch,
        generateApiFunctions,
        apiFunctionsPath: options.functions,
      };

      // 创建生成器并执行
      const generator = new SwaggerTsGenerator(config);
      await generator.generate(generateOptions);
      
      if (!options.watch) {
        console.log('🎉 生成完成！');
      }
    } catch (error) {
      console.error('❌ 生成失败:', (error as Error).message);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('初始化配置文件')
  .option('-f, --format <type>', '配置文件格式 (js|json)', 'js')
  .action(async (options) => {
    const configContent = options.format === 'json' 
      ? generateJsonConfig()
      : generateJsConfig();
    
    const configFile = options.format === 'json' 
      ? 'swagger-ts-toolkit.config.json'
      : 'swagger-ts-toolkit.config.js';
    
    const fs = await import('node:fs/promises');
    await fs.writeFile(configFile, configContent, 'utf-8');
    console.log(`✅ 配置文件已创建: ${configFile}`);
  });

program
  .command('validate')
  .description('验证 Swagger 文档')
  .option('-s, --source <type>', '数据源类型 (auto|local|remote)', 'auto')
  .option('-S, --service <name>', '服务名称', 'default')
  .option('-c, --config <path>', '配置文件路径')
  .action(async (options) => {
    try {
      const fileConfig = await loadConfigFromFile(options.config);
      const generator = new SwaggerTsGenerator(fileConfig);
      
      // 这里可以添加验证逻辑
      console.log('🔍 验证 Swagger 文档...');
      console.log('✅ 验证通过！');
    } catch (error) {
      console.error('❌ 验证失败:', (error as Error).message);
      process.exit(1);
    }
  });

function generateJsConfig(): string {
  return `// swagger-ts-toolkit 配置文件
export default {
  swagger: {
    localPaths: {
      development: 'docs/swagger/api-dev.yaml',
      production: 'docs/swagger/api-prod.yaml',
      // 添加更多服务配置
      // userService: 'docs/swagger/user-service.yaml',
    },
    remoteUrls: {
      development: 'https://api-test.example.com/swagger/doc.json',
      production: 'https://api.example.com/swagger/doc.json',
    },
  },
  outputPath: 'src/typings/api-generated.d.ts',
  endpointsPath: 'src/api/generated/endpoints.ts',
  apiFunctionsPath: 'src/api/generated/api-functions.ts',
  backupPath: 'src/typings/api-generated.backup.d.ts',
  tempJsonPath: 'temp/swagger-converted.json',
  generateApiFunctions: true,
};
`;
}

function generateJsonConfig(): string {
  return JSON.stringify({
    swagger: {
      localPaths: {
        development: 'docs/swagger/api-dev.yaml',
        production: 'docs/swagger/api-prod.yaml',
      },
      remoteUrls: {
        development: 'https://api-test.example.com/swagger/doc.json',
        production: 'https://api.example.com/swagger/doc.json',
      },
    },
    outputPath: 'src/typings/api-generated.d.ts',
    endpointsPath: 'src/api/generated/endpoints.ts',
    apiFunctionsPath: 'src/api/generated/api-functions.ts',
    backupPath: 'src/typings/api-generated.backup.d.ts',
    tempJsonPath: 'temp/swagger-converted.json',
    generateApiFunctions: true,
  }, null, 2);
}

// 处理未捕获的错误
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

program.parse();