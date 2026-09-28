/**
 * Markdown 渲染引擎
 * --------------------------------------------------
 * 基于 markdown-it：
 * - 支持旧文档中的内嵌 HTML（img 等）
 * - highlight.js 代码高亮（按需注册语言，控制体积）
 * - 标题锚点（markdown-it-anchor）
 * - 修正旧文档中 "/public/xxx" 的图片路径
 * - 外链自动新开页、表格外包一层滚动容器
 */
import MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import anchor from 'markdown-it-anchor'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import yaml from 'highlight.js/lib/languages/yaml'
import markdownLang from 'highlight.js/lib/languages/markdown'
import ini from 'highlight.js/lib/languages/ini'
import plaintext from 'highlight.js/lib/languages/plaintext'

// 按需注册常用语言（其他语言退化为纯文本显示）
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('shell', bash)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('yml', yaml)
hljs.registerLanguage('markdown', markdownLang)
hljs.registerLanguage('nginx', ini)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('text', plaintext)

/** 创建一个 markdown-it 实例（每次渲染独立计数器，保证 SSR/客户端标题锚点一致） */
export function createMarkdown(): MarkdownIt {
  let anchorSeq = 0
  const md: MarkdownIt = new MarkdownIt({
    html: true, // 允许内嵌 HTML（旧文档中的 <img> 标签）
    linkify: true, // 自动识别链接
    typographer: false,
    highlight(code: string, lang: string): string {
      const language = lang.trim().toLowerCase()
      // mermaid 等非高亮语言：原样转义展示
      if (language && hljs.getLanguage(language)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(code, { language, ignoreIllegals: true }).value}</code></pre>`
        } catch {
          /* fall through */
        }
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`
    },
  })

  // 标题锚点（中文标题用递增序号生成稳定 id）
  md.use(anchor, {
    level: [2, 3],
    slugify: () => `heading-${anchorSeq++}`,
    permalink: anchor.permalink.linkInsideHeader({
      symbol: '#',
      placement: 'before',
      class: 'heading-anchor',
      ariaHidden: true,
    }),
  })

  // 图片规则：修正旧文档 "/public/xxx" 为 "/xxx"
  const defaultImageRender: RenderRule | undefined = md.renderer.rules.image
  const imageRule: RenderRule = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const srcIndex = token.attrIndex('src')
    if (srcIndex >= 0) {
      const src = token.attrs![srcIndex][1]
      token.attrs![srcIndex][1] = src.replace(/^\/public\//, '/')
    }
    return defaultImageRender
      ? defaultImageRender(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.image = imageRule

  // 链接规则：外链新开页并加上安全属性
  const defaultLinkRender: RenderRule | undefined = md.renderer.rules.link_open
  const linkOpenRule: RenderRule = (tokens, idx, options, env, self) => {
    const hrefIndex = tokens[idx].attrIndex('href')
    if (hrefIndex >= 0) {
      const href = tokens[idx].attrs![hrefIndex][1]
      if (/^https?:\/\//.test(href)) {
        tokens[idx].attrSet('target', '_blank')
        tokens[idx].attrSet('rel', 'noopener noreferrer')
      }
    }
    return defaultLinkRender
      ? defaultLinkRender(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
  }
  md.renderer.rules.link_open = linkOpenRule

  // 表格外包一层横向滚动容器
  md.renderer.rules.table_open = () => '<div class="table-wrap"><table>'
  md.renderer.rules.table_close = () => '</table></div>'

  return md
}

/** 便捷方法：渲染一段 markdown 字符串为 HTML */
export function renderMarkdown(body: string): string {
  return createMarkdown().render(body)
}
