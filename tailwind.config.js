/** @type {import('tailwindcss').Config} */
export default {
  // 深色模式：通过给 <html> 加 .dark 类切换
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 浅色模式：日式暖纸色系
        paper: '#faf8f4', // 页面底色（暖纸白）
        surface: '#ffffff', // 卡片/区块表面
        ink: '#1a1813', // 主文字（墨黑，略带暖度）
        muted: '#75705f', // 次级文字
        faint: '#a8a294', // 更弱的说明文字
        line: '#e6e1d6', // 分隔线/描边
        accent: '#b3503a', // 极克制的朱砂点缀色
        // 深色模式：暖墨色系
        'dark-paper': '#13110d',
        'dark-surface': '#1c1a15',
        'dark-ink': '#ede8dd',
        'dark-muted': '#9c958a',
        'dark-faint': '#6f6a5f',
        'dark-line': '#2c2922',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"Songti SC"', 'serif'],
      },
      maxWidth: {
        content: '1240px', // 全站最大内容宽度
        prose: '760px', // 文章阅读区宽度
      },
      letterSpacing: {
        label: '0.25em', // 日式小标签的宽字距
        wider2: '0.12em',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)', // 参考站气质的缓动
      },
      keyframes: {
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
