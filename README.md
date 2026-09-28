# 叶泽顺的个人网站

日式简约作品集风格个人站点（复刻 doisena.jp 的版式与交互气质）。
技术栈：**Vue 3 + Vite + TypeScript + TailwindCSS + vite-ssg**，构建产物为纯静态文件。

---

## 一、本地运行

```bash
# 环境要求：Node.js >= 20，包管理器 pnpm
pnpm install        # 安装依赖
pnpm dev            # 本地开发，默认 http://localhost:5173
pnpm build          # 构建静态站点，产物在 dist/
pnpm preview        # 本地预览构建产物
pnpm type-check     # TypeScript 类型检查
```

---

## 二、目录结构

```
y-blog/
├─ public/                  # 原样拷贝到站点根目录的静态资源（不改文件名即可直接替换）
│  ├─ 个人照片.jpg
│  ├─ 小程序入口.jpg
│  ├─ 后台项目图片/          # markdown 文章中引用的图片（图片1~9.webp）
│  ├─ logo/
│  ├─ bgm/
│  └─ 叶泽顺的简历.pdf
├─ src/
│  ├─ assets/images/        # 组件内使用的图片（按用途分目录）
│  │  ├─ avatar/个人照片.jpg # 简介区头像
│  │  ├─ logo/               # 站点 logo
│  │  └─ covers/             # 作品封面（需要自己放，见下文）
│  ├─ content/              # ★ 全部文章内容（markdown）
│  │  ├─ works/             #   作品
│  │  ├─ notes/             #   笔记
│  │  ├─ interview/         #   题库
│  │  └─ training/          #   训练计划
│  ├─ data/                 # ★ 结构化个人数据
│  │  ├─ site.ts            #   站名、导航、社交链接、区块开关
│  │  ├─ resume.ts          #   简历全部内容（关于页）
│  │  └─ works.ts           #   作品分类、首页精选顺序、外链
│  ├─ components/           # 组件
│  ├─ pages/                # 页面
│  ├─ router/               # 路由表
│  ├─ composables/          # 组合式函数（主题、平滑滚动）
│  ├─ lib/                  # markdown 解析、内容加载
│  └─ styles/main.css       # 全局样式
└─ index.html
```

---

## 三、如何替换图片资源（无需改代码）

| 想换什么 | 替换哪个文件 |
| --- | --- |
| 简介区头像 | `src/assets/images/avatar/个人照片.jpg`（保持同名） |
| 作品封面 | 在 `src/assets/images/covers/` 放入 `{作品slug}.jpg`，例如 `chatppt-editor.jpg`。**不放封面时自动显示序号排版占位**，不影响使用 |
| 文章内的后台截图 | `public/后台项目图片/图片1~9.webp`（保持同名） |
| logo | `public/logo/` 与 `src/assets/images/logo/` 中同名文件 |
| 简历 PDF | `public/叶泽顺的简历.pdf`（保持同名） |

> 图片建议先压缩（封面推荐 1600×1000 左右、控制在 300KB 内），jpg/webp 均可。

---

## 四、如何新增 / 修改内容

### 1. 修改个人信息 / 社交链接

编辑 `src/data/site.ts`：站点名称、导航菜单、GitHub/邮箱/电话、首页各区块开关。

### 2. 修改简历

编辑 `src/data/resume.ts`：按文件内已有结构修改基本信息、技能、项目、工作经历、教育、荣誉、自我评价。
新增一个项目时，复制一个 project 对象，按字段填写即可（页面自动渲染）。

### 3. 新增一篇作品 / 笔记

1. 在 `src/content/works/`（或 `notes/`、`interview/`、`training/`）下新建 `.md` 文件，文件名即访问地址 slug。
2. 文件开头加上 frontmatter：

```markdown
---
title: 文章标题
category: ai          # 作品分类：ai / platform / archive（笔记等可留空）
date: 2026-06-01
order: 1              # 列表排序，数字越小越靠前
summary: 一句话简介（列表与SEO使用）
---

这里是正文，支持完整 Markdown 语法（标题、列表、代码块、表格、图片）……
```

3. 保存后自动出现在对应列表页，无需改任何代码。
4. （可选）把作品 slug 加入 `src/data/works.ts` 的 `featuredWorks`，即出现在首页精选；
   在 `workLinks` 中可配置「在线体验 / 源码」外链按钮。

文章内图片：把图片放到 `public/` 下，markdown 中以根路径引用，例如：

```markdown
![后台截图](/后台项目图片/图片1.webp)
```

### 4. 删除内容

直接删除对应的 `.md` 文件即可；若该 slug 在 `works.ts` 的精选数组中，一并移除。

---

## 五、部署

构建后 `dist/` 即完整站点（每个路由都已预渲染为静态 HTML），可部署到任意静态托管。

### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/y-blog;
    index index.html;

    # 前端路由 history 模式回退（必须）
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### GitHub Pages

仓库已附带工作流 `.github/workflows/deploy.yml`：推送到 `main` 分支会自动构建并部署。
如使用项目子路径（`用户名.github.io/仓库名`）访问，需要在 `vite.config.ts` 中设置
`base: '/仓库名/'`；使用自定义域名或用户主页（仓库名为 `用户名.github.io`）则无需修改。

### 其他平台

Vercel / Netlify / Cloudflare Pages：构建命令填 `pnpm build`，发布目录填 `dist`；
Netlify 等平台需配置 SPA 回退规则到 `/index.html`（SSG 已生成全部页面，通常直接可用）。

---

## 六、其他说明

- **深色模式**：导航栏右上角按钮切换，偏好保存在浏览器本地。
- **动效**：Lenis 惯性平滑滚动 + IntersectionObserver 滚动进入动画；
  自动尊重系统「减少动态效果」设置。
- **SEO**：预渲染 HTML、每页独立 title/description，可在 `index.html` 修改默认描述。
