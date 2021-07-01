---
title: deepin中打包出现的问题汇总
date: 2021-07-01 11:11:05
tags:
---


# 问题
打包后安装出现双图标

# 解决办法
desktop中添加StartupWMClass=xxx
xxx通过终端中执行xprop WM_CLASS点击应用程序获取。