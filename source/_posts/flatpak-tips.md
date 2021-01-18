---
title: 关于国内使用flatpak
date: 2021-01-18 10:26:07
tags:
---
国内用户可以使用上海交通大学的flatpak源，修改代码如下：
```
sudo flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub
```