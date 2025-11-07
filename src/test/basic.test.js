// swagger-ts-toolkit 基本功能测试
import { test } from 'node:test';
import assert from 'node:assert';
import { SwaggerTsGenerator, DEFAULT_CONFIG } from '../../dist/index.js';

test('SwaggerTsGenerator 类可以正常实例化', () => {
  const generator = new SwaggerTsGenerator();
  
  assert.ok(generator instanceof SwaggerTsGenerator);
  assert.deepStrictEqual(generator.getConfig(), DEFAULT_CONFIG);
});

test('配置合并功能正常工作', () => {
  const customConfig = {
    outputPath: 'custom/path/api.d.ts'
  };
  
  const generator = new SwaggerTsGenerator(customConfig);
  const config = generator.getConfig();
  
  assert.strictEqual(config.outputPath, 'custom/path/api.d.ts');
  assert.strictEqual(config.endpointsPath, DEFAULT_CONFIG.endpointsPath);
});

test('工具函数正常工作', async () => {
  const { detectFileFormat, toCamelCase } = await import('../../dist/index.js');
  
  assert.strictEqual(detectFileFormat('test.yaml'), 'yaml');
  assert.strictEqual(detectFileFormat('test.json'), 'json');
  
  assert.strictEqual(toCamelCase('get_user_by_id'), 'getUserById');
  assert.strictEqual(toCamelCase('CreateUser'), 'createUser');
});