import { execSync } from 'node:child_process';

/**
 * 生成 TypeScript 类型定义
 */
export async function generateTypeDefinitions(swaggerSource: string, outputPath: string): Promise<void> {
  console.log(`🔧 生成 TypeScript 类型定义...`);
  
  try {
    const command = `npx openapi-typescript "${swaggerSource}" --output "${outputPath}"`;
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ 类型定义已生成: ${outputPath}`);
  } catch (error) {
    throw new Error(`类型定义生成失败: ${(error as Error).message}`);
  }
}