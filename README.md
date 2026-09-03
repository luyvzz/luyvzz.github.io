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

网站升级为 `Minimal AI Cockpit`：保留神经网络 Canvas、鼠标光晕、磁吸交互、轨道头像、扫描线和信号条这些极客炫技点，但把视觉重心改为更克制的深色留白、精细线性层次、高对比文字和轻量沉浸背景，避免廉价卡片堆叠；字体系统仍采用中文行楷（`STXingkai` / `华文行楷` 优先回退）与英文 `Times New Roman`。头像来自 `assets/images/avatar.jpg`，并通过已配置的 `micu-gpt-image-2` MCP 调用中转站 gpt-image-2 生成新版视觉资产：`assets/images/avatar-gpt-image-2.png`、`assets/images/avatar-gpt-image-2.webp`、`assets/images/avatar-gpt-image-2-icon.png`、`assets/images/hero-embodied-ai-lab.png`、`assets/images/hero-embodied-ai-lab.webp`。

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

## 交互动效

- 全局神经网络 Canvas 背景
- 鼠标跟随光晕 `cursor-light`
- 滚动入场 `reveal`
- 按钮与项目的磁吸交互 `magnetic`
- 头像轨道、扫描线、信号条和系统状态动效
- 减少传统卡片/边框结构，用开放式排版和细线层次提升高级感
