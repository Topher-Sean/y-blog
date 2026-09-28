/**
 * 站点全局配置
 * --------------------------------------------------
 * 编辑此文件即可修改：站名、导航、社交链接、首页区块展示。
 * 不需要改动任何组件代码。
 */

export interface NavItem {
  /** 导航显示文字 */
  label: string
  /** 路由地址（内部路径）或外链地址 */
  to: string
  /** 是否为外链（http 开头时组件也会自动识别，这里仅作显式声明） */
  external?: boolean
}

export interface SocialLink {
  label: string
  url: string
  /** 图标标识：对应 components/common/AppIcon.vue 中支持的名称 */
  icon: 'github' | 'mail' | 'phone' | 'link'
}

export const site = {
  /** 站点名称（页脚 / 浏览器标题使用） */
  title: '小叶的前端笔记',
  /** 站点拥有者姓名 */
  author: '叶泽顺',
  /** 站点一句话描述（SEO / 页脚） */
  description:
    '叶泽顺的个人作品集与前端笔记，前端开发工程师，专注 Vue3 / TypeScript、AI 内容创作、在线编辑器与数据可视化。',
  /** 首页 Hero 区的英文小标签（宽字距显示） */
  heroTagline: 'FRONTEND ENGINEER · PORTFOLIO',
  /** 首页首页主标题（可逐字排版） */
  heroTitle: '叶泽顺',
  /** 首页主标题下的中文说明 */
  heroSubtitle: '前端开发工程师 · 记录学习，记录经历',
  /** 简历 PDF 下载地址（文件位于 public 目录） */
  resumePdf: '/叶泽顺的简历.pdf',

  /** 顶部导航（移动端菜单同样使用） */
  nav: [
    { label: '首页', to: '/' },
    { label: '作品', to: '/#works' },
    { label: '关于', to: '/about' },
    { label: '笔记', to: '/notes' },
    { label: '题库', to: '/interview' },
    { label: '训练', to: '/training' },
  ] as NavItem[],

  /** 社交 / 联系方式（页脚与首页联系区使用） */
  social: [
    { label: 'GitHub', url: 'https://github.com/Topeceen/y-blog', icon: 'github' },
    { label: '1274300766@qq.com', url: 'mailto:1274300766@qq.com', icon: 'mail' },
    { label: '15060816236', url: 'tel:15060816236', icon: 'phone' },
    { label: 'topher-sean.site', url: 'https://topher-sean.site/', icon: 'link' },
  ] as SocialLink[],

  /** 首页区块开关：不需要某个区块时改为 false */
  sections: {
    works: true, // 精选作品
    profile: true, // 简介条
    notes: true, // 最新笔记
    contact: true, // 联系方式
  },
} as const

export type SiteConfig = typeof site
