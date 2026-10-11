---
layout: ../../layouts/Article.astro
title: 让网页上的小交互，刚刚好
slug: small-interactions
category: 界面探索
minutes: 2
description: 关于反馈、键盘操作，以及那些不打扰阅读的细节。
---

一个按钮被按下后有反馈，一个链接可以用键盘选中，一次主题切换在刷新之后仍然保留。这些细节很小，却影响着网站用起来的感觉。

## 先有用途，再有动画

为交互加入动画之前，可以先想一想：它在解释什么？

- 悬停时的颜色变化，提示这里可以点击。
- 打开面板时的短暂过渡，帮助理解界面发生了什么。
- 成功反馈，告诉使用者操作已经完成。

当动画没有明确用途时，保持静止也很好。

## 键盘也是一种入口

快捷命令面板提供了另一种浏览方式。按下 `Ctrl + K`（Mac 上是 `⌘ + K`），可以搜索页面，或者切换主题。

但快捷键不能成为唯一入口。普通导航、触摸操作和键盘操作应该通向同一份内容。

## 尊重不同的阅读习惯

有人喜欢深色页面，有人偏好浅色。有些人希望减少动画。把这些偏好认真考虑进去，界面才能让更多人舒服地使用。

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

把交互控制在合适的程度，会让内容自然地成为主角。
