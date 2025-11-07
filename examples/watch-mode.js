// 监听模式示例
import { SwaggerTsGenerator } from 'swagger-ts-toolkit';

async function startWatchMode() {
  const generator = new SwaggerTsGenerator({
    swagger: {
      localPaths: {
        development: 'docs/swagger/api-dev.yaml',
        production: 'docs/swagger/api-prod.yaml'
      }
    }
  });

  console.log('🚀 启动监听模式...');
  
  // 启动监听模式 - 这个函数会一直运行
  await generator.generate({
    source: 'local',
    watch: true
  });
}

// 处理进程退出
process.on('SIGINT', () => {
  console.log('\n👋 退出监听模式');
  process.exit(0);
});

startWatchMode().catch(console.error);