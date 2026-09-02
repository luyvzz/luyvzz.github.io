# 鹿屿の博客

这是 luyvzz 的个人网页博客，部署在 GitHub Pages。

访问地址：<https://luyvzz.github.io/>

## 内容定位

- 个人资料
- 具身智能和 AI 学习记录
- 嵌入式与机器人视觉笔记
- 开源项目展示
- 个人随笔

## 视觉方向

网站采用极客控制台风格，主色使用青绿色和琥珀色。头像来自 `assets/images/avatar.jpg`，并通过已配置的 `micu-gpt-image-2` MCP 调用中转站 gpt-image-2 生成新版视觉资产：`assets/images/avatar-gpt-image-2.png`、`assets/images/avatar-gpt-image-2.webp`、`assets/images/avatar-gpt-image-2-icon.png`、`assets/images/hero-embodied-ai-lab.png`、`assets/images/hero-embodied-ai-lab.webp`。

## MCP 图像链路

- MCP 名称：`micu-gpt-image-2`
- Base URL：`https://www.micuapi.ai/v1`
- 模型：`gpt-image-2`
- 用途：首页主视觉与个人头像赛博化生成

## 本地预览

```powershell
python -m http.server 8000
```

然后访问 <http://127.0.0.1:8000/>。

## 本地验证

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tests\Test-SiteQuality.ps1
```

## 技术栈

- HTML
- CSS
- Vanilla JavaScript
- GitHub Pages

## License

MIT
