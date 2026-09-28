/**
 * 作品配置
 * --------------------------------------------------
 * 作品列表本身由 src/content/works/ 下的 markdown 文件自动生成
 * （frontmatter 提供标题、分类、时间、摘要）。
 * 本文件负责两件事：
 *   1. featured：首页「精选作品」的展示顺序（取对应 markdown 的 slug）
 *   2. links：每个作品的外部访问地址
 * 新增作品：在 content/works 放一个 md，再视情况把 slug 加到 featured、links 即可。
 */

export interface WorkLink {
  label: string
  url: string
  /** 场景补充说明（如“美化海外独立站场景”） */
  note?: string
}

/** 作品分类（与 markdown frontmatter 中的 category 对应） */
export const workCategories = [
  { value: 'all', label: '全部', en: 'ALL' },
  { value: 'ai', label: 'AI 应用', en: 'AI APP' },
  { value: 'platform', label: '平台与中后台', en: 'PLATFORM' },
  { value: 'archive', label: '早期记录', en: 'ARCHIVE' },
] as const

/**
 * 首页精选作品（slug 顺序即展示顺序）
 * slug = src/content/works/ 下 markdown 的文件名（不含扩展名）
 */
export const featuredWorks: string[] = [
  'chatppt-editor',
  'geo-report-platform',
  'tickshow-admin',
  'wernicke',
  'image-annotation',
  'enterprise-data',
]

/**
 * 各作品的外部访问链接
 * key = slug
 */
export const workLinks: Record<string, WorkLink[]> = {
  'chatppt-editor': [
    { label: 'ChatPPT 官网', url: 'https://chatppt.cn/' },
    { label: 'Tickdeck 海外美化站', url: 'https://meihua.test.yoo-ai.com', note: '美化海外独立站场景' },
    { label: '新华Talk 政务服务平台', url: 'https://xinhua.chatppt.cn', note: '对接新华社的政务场景' },
  ],
  'geo-report-platform': [
    { label: '搜极星', url: 'https://www.sougeo.com/' },
    { label: 'InsGEO', url: 'https://ins.sougeo.com/' },
  ],
  'tickshow-admin': [{ label: '访问 TickShow', url: 'https://m.tickshow.yoo-ai.com/' }],
  wernicke: [{ label: '访问韦尼克平台', url: 'https://b.yoo-ai.com/' }],
  'chatppt-scenarios': [
    { label: 'ChatPPT 主站', url: 'https://chatppt.cn/' },
    { label: '海外美化站', url: 'https://meihua.test.yoo-ai.com/' },
    { label: '政务服务平台', url: 'https://xinhua.chatppt.cn' },
  ],
}
