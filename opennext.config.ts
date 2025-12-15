// opennext.config.ts
export default {
  // 构建命令
  buildCommand: "npm run build",
  
  // 输出目录
  outputDir: "./opennext",
  
  // 最小化
  minify: true,
  
  // 是否为独立模式
  standalone: true,
  
  // Cloudflare特定配置
  cloudflare: {
    // 如果你需要额外的Worker绑定
    bindings: {},
    
    // KV命名空间（如果需要）
    kvNamespaces: [],
    
    // D1数据库（如果需要）
    d1Databases: []
  }
};