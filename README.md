# 稳胜石材项目

采用 **Turborepo + pnpm workspaces** 管理的 Next.js Monorepo。

## 应用列表

| 应用 | 路径           | 说明                     | 线上地址                         |
|----|--------------|------------------------|------------------------------|
| 官网 | `apps/site`  | 产品展示、博客、OEM/ODM 服务、询盘  | winwinstonecustom.vercel.app |
| 后台 | `apps/admin` | 内容管理后台原型（产品 / 博客 / 素材） | winwinstoneadmin.vercel.app  |

## 本地开发

```bash
# 所有应用并行启动
pnpm dev

# 单独启动
pnpm dev:site    # http://localhost:3000
pnpm dev:admin   # http://localhost:3001

# 构建
pnpm build       # 全部
pnpm build:site  # 仅官网
pnpm build:admin # 仅后台
```

## 部署

### Vercel 配置

在 Vercel Dashboard 配置两个项目：

| 项目 | Root Directory | Framework | Build Command | Install Command |
|----|--------------|-----------|--------------|----------------|
| winwinstonecustom | `apps/site` | Next.js | `cd ../.. && pnpm turbo build --filter=site` | `cd ../.. && pnpm install` |
| winwinstoneadmin | `apps/admin` | Next.js | `cd ../.. && pnpm turbo build --filter=admin` | `cd ../.. && pnpm install` |

### CLI 部署

```bash
cd apps/site && vercel --prod
cd apps/admin && vercel --prod
```
