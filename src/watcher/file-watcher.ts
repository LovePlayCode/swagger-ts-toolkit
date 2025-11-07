import path from 'node:path';
import process from 'node:process';
import type { GenerateOptions } from '../types/index.js';

/**
 * 启动文件监听模式
 */
export async function startWatchMode(generateFn: (options: GenerateOptions) => Promise<void>): Promise<void> {
  const { default: chokidar } = await import('chokidar');

  console.log('👀 开始监听本地 Swagger 文件变化...');

  const watcher = chokidar.watch(
    [
      'docs/swagger/**/*.json',
      'docs/swagger/**/*.yaml',
      'docs/swagger/**/*.yml',
    ],
    {
      ignored: /node_modules/,
      persistent: true,
      ignoreInitial: true,
    }
  );

  watcher.on('change', async (filePath) => {
    console.log(`🔄 检测到文件变化: ${filePath}`);
    try {
      // 检测文件格式
      const ext = path.extname(filePath).toLowerCase();
      const format = ext === '.yaml' || ext === '.yml' ? 'YAML' : 'JSON';
      console.log(`📄 检测到 ${format} 文件更新`);

      await generateFn({ source: 'local' });
      console.log('✅ 类型重新生成完成');
    } catch (error) {
      console.error('❌ 类型重新生成失败:', (error as Error).message);
    }
  });

  watcher.on('add', async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const format = ext === '.yaml' || ext === '.yml' ? 'YAML' : 'JSON';
    console.log(`➕ 新增 ${format} 文件: ${filePath}`);
    await generateFn({ source: 'local' });
  });

  // 保持进程运行
  process.on('SIGINT', () => {
    console.log('👋 监听已停止');
    watcher.close();
    process.exit(0);
  });

  // 返回一个永不resolve的Promise来保持进程运行
  return new Promise(() => {});
}