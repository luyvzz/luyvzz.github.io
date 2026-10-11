# 鹿屿个人网站实施计划

**Goal:** 制作可在本地预览、可部署到 GitHub Pages 的 A+B 个人主页。

**Architecture:** Astro 预生成页面，共享布局承载导航、主题和命令面板。内容配置与交互脚本独立，文章使用 Markdown，样式采用统一变量。

**Tech Stack:** Astro、TypeScript、原生 CSS、Markdown。

## 执行步骤

- [x] 创建 `src/data/site.ts` 统一管理真实个人资料、项目和导航；`src/components/Icon.astro` 管理图标。
- [x] 创建 `src/layouts/Base.astro`、`src/styles/global.css`、`src/scripts/site.ts`，实现响应式布局、主题持久化、命令面板、移动菜单。
- [x] 创建首页、项目、关于、笔记索引，以及 `src/layouts/Article.astro` 和 Markdown 示例文章。
- [x] 创建 `src/components/Terminal.astro` 与 `src/scripts/terminal.ts`，支持 help/about/projects/notes/theme/clear/banner，并安全呈现文本输入。
- [x] 创建 `public/favicon.svg`、README 与 `.github/workflows/deploy.yml`；部署通过 GitHub Pages 官方 Actions 完成，代码推送前保持本地预览。
- [x] 执行 `npm run build`，修复所有类型/构建错误；启动预览，检查真实页面与交互，覆盖 1440px 桌面及 390px 手机。
- [x] 检查子路径构建，更新文档并向用户展示预览入口。

## 验收场景

1. 每个导航和文章链接可访问，页面不存在水平溢出。
2. 切换主题后刷新保持选择，减少动态效果偏好有效。
3. Ctrl/Cmd+K 打开命令面板、搜索筛选、点击跳转，Escape 关闭并恢复焦点。
4. 终端帮助、主题切换、跳转、未知命令、历史记录均可用，HTML 输入只作为文本显示。
5. 手机菜单能打开/关闭、选中页面后正常导航，点击区域可操作。
6. GitHub 指向真实用户名；不出现虚构经历、数据或邮箱。
