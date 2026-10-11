# 鹿屿 · Personal Space

张路宇 / 鹿屿（[@luyvzz](https://github.com/luyvzz)）的个人网站第一版。

暖白与橙色的极简阅读界面，搭配编辑器文件树、命令面板和迷你终端。使用 Astro 静态生成，无需数据库或后端。

## 本地预览

要求 Node.js 24。

```sh
npm ci
npm run dev
```

打开终端提示的本地网址（默认 http://127.0.0.1:4321）。

```sh
npm run build
npm run preview
```

`build` 包含 Astro / TypeScript 检查，静态输出在 `dist/`。

## 编辑内容

- `src/data/site.ts`：姓名、昵称、GitHub、简介、邮箱和笔记索引。
- `src/data/projects.ts`：四个公开项目的介绍、技术栈、源码依据与首页精选标记。
- `src/pages/projects/[id].astro`：自动生成各项目的独立介绍页。
- `src/pages/index.astro`：首页文案。
- `src/pages/about.astro`：个人介绍和近况。
- `src/pages/notes/*.md`：Markdown 文章；复制现有文章并填写 frontmatter，然后更新笔记索引。
- `src/styles/global.css`：主题、布局与响应式样式。
- `src/scripts/terminal.ts`：模拟终端命令。

项目页展示 `ai-solo-toolkit`、`luyv_lceda_ai_demo`、`26-SKILL` 与 `vdmon`，介绍依据公开 README 和核心代码整理；首页精选前两项。详情页提供用途、功能、实现思路、适用环境，以及固定提交版本的源码链接。封面均为结构示意，不是产品截图或实测数据。

三篇文章仍明确标注为示例笔记，后续可替换为个人学习记录。未提供邮箱，因此不显示虚构邮箱。

## 交互

- `Ctrl + K` / `⌘ + K`：打开快捷面板；支持搜索、上下键选择、Enter 跳转、Escape 关闭。
- 左下角按钮：切换深浅主题，保存在当前浏览器中。
- 点击首页像素图案：切换三种图案。
- 终端：`help`、`about`、`projects`、`notes`、`home`、`theme`、`hello`、`banner`、`echo 文本`、`clear`；上下键浏览历史。
- 终端仅执行固定的页面交互，所有输入通过 `textContent` 输出，不执行系统命令或 HTML。

## 部署到 GitHub Pages

1. 建议创建 GitHub 仓库 `luyvzz.github.io`，将本项目推送到 `main` 分支。
2. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
3. 仓库中已包含 `.github/workflows/deploy.yml`，推送后自动检查、构建和部署。
4. 用户主页网址为 `https://luyvzz.github.io/`。普通仓库也支持，工作流会读取 Pages 的 base path。

本地默认站点地址是 `https://luyvzz.github.io`。自定义构建可通过 `SITE_URL` 与 `BASE_PATH` 环境变量覆盖。

仓库：<https://github.com/luyvzz/luyvzz.github.io>。部署工作流在 `main` 更新后自动发布到 <https://luyvzz.github.io/>。

旧版 `index.html`、`assets/` 与 `tests/Test-SiteQuality.ps1` 保留作源码参考；当前网站仅使用 `src/`、`public/` 构建，上传内容为 `dist/`，旧版文件不会混入新版页面。原有 Git 提交历史完整保留。

## 验证

```sh
npm run build
```

浏览器检查覆盖桌面/手机布局、文章导航、主题持久化、命令搜索、终端历史与文本安全、移动菜单以及子路径资源。

已通过的浏览器检查脚本位于 `tests/browser_check.py`。需要 Python Playwright 与 Chromium：

```sh
python -m pip install playwright
python -m playwright install chromium
python tests/browser_check.py http://127.0.0.1:4321/
```

截图和检查报告输出到 `test-results/`（已从 Git 忽略）。子路径检查使用 `tests/subpath_check.py`，要求将以 `/portfolio/` 为 base 构建的目录通过本地 4323 端口提供服务。
