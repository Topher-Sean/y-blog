/**
 * 内容加载器
 * --------------------------------------------------
 * 构建时通过 import.meta.glob 读取 src/content/ 下全部 markdown，
 * 解析 frontmatter，对外提供按集合查询的方法。
 * 新增 markdown 文件后自动出现在列表中，无需改代码。
 */
/**
 * 轻量 frontmatter 解析（浏览器/SSR 通用，不依赖 Node Buffer）
 * 支持形如「key: value」的简单标量字段
 */
function parseFrontmatter(raw: string): { data: Record<string, string | number>; content: string } {
  const text = raw.replace(/^\uFEFF/, '')
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: text }
  const [, header, body] = match
  const data: Record<string, string | number> = {}
  for (const line of header.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (m) {
      const [, key, val] = m
      data[key] = /^-?\d+(\.\d+)?$/.test(val.trim()) ? Number(val.trim()) : val.trim()
    }
  }
  return { data, content: body }
}

/** 内容集合（对应 src/content 下的子目录） */
export type Collection = 'works' | 'notes' | 'interview' | 'training'

/** 内容条目 */
export interface ContentItem {
  /** slug = markdown 文件名（不含扩展名），同时是路由参数 */
  slug: string
  /** 所属集合 */
  collection: Collection
  /** 正文（不含 frontmatter） */
  body: string
  /** 标题 */
  title: string
  /** 分类 */
  category: string
  /** 时间文本（原样展示，可能是“2025.03 - 至今”或空） */
  date: string
  /** 排序权重（小在前） */
  order: number
  /** 摘要 */
  summary: string
}

// eager：构建时全部读取；?raw：以字符串形式拿到原文
const files = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** 全部内容条目 */
const all: ContentItem[] = Object.entries(files).map(([filePath, raw]) => {
  // 路径形如 ../content/works/chatppt-editor.md
  const match = filePath.match(/\.\.\/content\/(works|notes|interview|training)\/(.+)\.md$/)
  if (!match) throw new Error(`无法解析内容路径：${filePath}`)
  const [, collection, slug] = match as [string, Collection, string]
  const { data, content } = parseFrontmatter(raw)
  return {
    slug,
    collection,
    body: content.replace(/^\n+/, ''),
    title: String(data.title ?? slug),
    category: String(data.category ?? ''),
    date: String(data.date ?? ''),
    order: Number(data.order ?? 999),
    summary: String(data.summary ?? ''),
  }
})

/** 排序规则：order 升序，其次标题 */
const sortItems = (list: ContentItem[]) =>
  [...list].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'zh-CN'))

/** 获取某集合的全部条目 */
export function getCollection(collection: Collection): ContentItem[] {
  return sortItems(all.filter((item) => item.collection === collection))
}

/** 按 slug 获取某集合中的条目 */
export function getBySlug(collection: Collection, slug: string): ContentItem | undefined {
  return all.find((item) => item.collection === collection && item.slug === slug)
}

/** 获取首页精选作品（按 data/works.ts 的 slug 顺序） */
export function getWorksBySlugs(slugs: string[]): ContentItem[] {
  const works = all.filter((item) => item.collection === 'works')
  return slugs
    .map((slug) => works.find((item) => item.slug === slug))
    .filter((item): item is ContentItem => Boolean(item))
}

/** 获取最新的若干条笔记 */
export function getLatestNotes(limit: number): ContentItem[] {
  return getCollection('notes').slice(0, limit)
}
