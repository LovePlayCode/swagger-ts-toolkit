import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import type { FileFormat } from '../types/index.js';

/**
 * 检测文件格式
 */
export function detectFileFormat(filePath: string): FileFormat {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.yaml' || ext === '.yml') {
    return 'yaml';
  } else if (ext === '.json') {
    return 'json';
  }
  throw new Error(`不支持的文件格式: ${ext}`);
}

/**
 * YAML文件转换为JSON
 */
export async function convertYamlToJson(yamlPath: string, jsonPath: string): Promise<string> {
  try {
    console.log(`🔄 转换 YAML 文件: ${yamlPath}`);

    const yamlContent = await fs.readFile(yamlPath, 'utf-8');
    const jsonData = yaml.load(yamlContent);

    // 确保临时目录存在
    const tempDir = path.dirname(jsonPath);
    await fs.mkdir(tempDir, { recursive: true });

    await fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');
    console.log(`✅ YAML 转换完成: ${jsonPath}`);

    return jsonPath;
  } catch (error) {
    throw new Error(`YAML 转换失败: ${(error as Error).message}`);
  }
}

/**
 * 清理临时文件
 */
export async function cleanupTempFiles(tempFilePath: string): Promise<void> {
  try {
    await fs.unlink(tempFilePath);
    console.log('🗑️  已清理临时文件');
  } catch {
    // 文件不存在或删除失败，忽略
  }
}

/**
 * 备份现有文件
 */
export async function backupFile(sourcePath: string, backupPath: string): Promise<void> {
  try {
    await fs.access(sourcePath);
    await fs.copyFile(sourcePath, backupPath);
    console.log('🔒 已备份现有文件');
  } catch {
    console.log('🆕 无需备份，文件不存在');
  }
}

/**
 * 从备份恢复文件
 */
export async function restoreFromBackup(backupPath: string, targetPath: string): Promise<void> {
  try {
    await fs.access(backupPath);
    await fs.copyFile(backupPath, targetPath);
    console.log('🔄 已从备份恢复文件');
  } catch {
    console.log('⚠️  无备份文件可恢复');
  }
}

/**
 * 确保目录存在
 */
export async function ensureDirectory(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

/**
 * 检查文件是否存在
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}