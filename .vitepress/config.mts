import { defineConfigWithTheme } from "vitepress";
import escookConfig from "@escook/vitepress-theme/config";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  // base: "/y-blog/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "logo/Yzs-logo.png",
      },
    ],
  ],
  extends: escookConfig,
  title: "小叶的前端笔记",
  description: "A VitePress Site",
  themeConfig: {
    logo: "/logo/Yzs-logo.png",
    musicBall: {
      list: [
        {
          name: "唯一 - G.E.M. 邓紫棋",
          src: "/bgm/bgm1.mp3", // 音乐文件路径MP3",
        },
        {
          name: "Where Did U Go - G.E.M. 邓紫棋",
          src: "/bgm/bgm2.mp3", // 音乐文件路径MP3",
        },
      ],
      autoplay: true,
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "个人简历", link: "/resume" },
      {
        text: "项目经历",
        items: [
          {
            text: "ChatPPT 编辑器（多端）",
            link: "/projects/ChatPPT编辑器/ChatPPT编辑器",
          },
          {
            text: "ChatPPT 多场景应用",
            link: "/projects/ChatPPT多场景应用/ChatPPT多场景应用",
          },
          {
            text: "TickShow 后台管理平台",
            link: "/projects/TickShow后台管理平台/TickShow后台管理平台",
          },
          {
            text: "韦尼克文档创作平台",
            link: "/projects/韦尼克文档创作平台/韦尼克文档创作平台",
          },
          {
            text: "图像标注平台",
            link: "/projects/图像标注平台/图像标注平台",
          },
          {
            text: "企业级数据管理系统",
            link: "/projects/陆渔生物/陆渔生物",
          },
        ],
      },
      { text: "问题及处理", link: "/experience/基于TS的axios封装" },
      {
        text: "题库",
        items: [
          {
            text: "HTML-CSS",
            link: "/InterviewQuestion/HTML-CSS",
          },
          {
            text: "JavaScript",
            link: "/InterviewQuestion/JS",
          },
        ],
        activeMatch: "^/InterviewQuestion/",
      },
      {
        text: "训练计划",
        items: [
          {
            text: "1、基础训练计划",
            link: "/trainingPlan/训练计划",
          },
        ],
        activeMatch: "^/trainingPlan/",
      },
    ],
    sidebar: {
      "/InterviewQuestion/": [
        {
          text: "题库",
          items: [
            { text: "HTML-CSS", link: "/InterviewQuestion/HTML-CSS" },
            { text: "JavaScript", link: "/InterviewQuestion/JS" },
          ],
        },
      ],
      "/projects/": [
        {
          text: "ChatPPT 项目组",
          items: [
            {
              text: "ChatPPT 编辑器（多端）",
              link: "/projects/ChatPPT编辑器/ChatPPT编辑器",
            },
            {
              text: "ChatPPT 多场景应用",
              link: "/projects/ChatPPT多场景应用/ChatPPT多场景应用",
            },
          ],
        },
        {
          text: "AI 平台与中后台",
          items: [
            {
              text: "TickShow 后台管理平台",
              link: "/projects/TickShow后台管理平台/TickShow后台管理平台",
            },
            {
              text: "韦尼克文档创作平台",
              link: "/projects/韦尼克文档创作平台/韦尼克文档创作平台",
            },
          ],
        },
        {
          text: "数据与业务系统",
          items: [
            {
              text: "图像标注平台",
              link: "/projects/图像标注平台/图像标注平台",
            },
            {
              text: "企业级数据管理系统",
              link: "/projects/陆渔生物/陆渔生物",
            },
          ],
        },
      ],
      "/experience/": [
        {
          text: "问题及处理",
          items: [
            {
              text: "1.基于TS的axios封装",
              link: "/experience/基于TS的axios封装",
            },
            {
              text: "2.自动化部署",
              link: "/experience/自动化部署",
            },
            {
              text: "3.接入支付功能的方法",
              link: "/experience/接入支付功能的方法",
            },
            {
              text: "4.WebSocket实时通信",
              link: "/experience/WebSocket实时通信",
            },
            {
              text: "5.利用Ionic集合Vue3和Framework7",
              link: "/experience/利用Ionic集合Vue3和Framework7",
            },
            {
              text: "6.slice()的用法",
              link: "/experience/slice()的用法",
            },
            {
              text: "7.ssh配置教程",
              link: "/experience/ssh配置教程",
            },
          ],
        },
      ],
      "/trainingPlan/": [
        {
          text: "训练计划",
          items: [
            {
              text: "1、基础训练计划",
              link: "/trainingPlan/训练计划",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Topeceen/y-blog" },
    ],
  },
  vite: {
    ssr: {
      noExternal: ["@escook/vitepress-theme", "vitepress"],
    },
  },
});
