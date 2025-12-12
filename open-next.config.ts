import type { OpenNextConfig } from "@opennextjs/cloudflare";

const openNextConfig: OpenNextConfig = {
  output: ".open-next",       // 输出目录
  rootDirectory: process.cwd(), 
  // optional: 你可以添加自定义 Worker 名称或其他 Cloudflare 配置
};

export default openNextConfig;
