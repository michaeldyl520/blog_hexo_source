---
title: 一些 deepin-wine 事例
date: 2021-03-17 18:42:58
tags:
---

# 连连看5

```shell
WINEPREFIX=~/.deepinwine/apps/连连看_1 WINEDEBUG=+seh deepin-wine5-stable ~/.deepinwine/apps/连连看_1/drive_c/Program\ Files/步天软件/连连看5/LinLink5.exe

#调试字体
WINEPREFIX=/data/home/dyl/.deepinwine/apps/连连看_1 WINEDEBUG=+font,+tid deepin-wine5-stable /data/home/dyl/.deepinwine/apps/连连看_1/drive_c/Program\ Files/步天软件/连连看5/LinLink5.exe &> /data/home/dyl/fonts.log

WINEPREFIX=/data/home/dyl/.deepinwine/apps/连连看_1 WINEDEBUG=+seh deepin-wine5-stable /data/home/dyl/.deepinwine/apps/连连看_1/drive_c/Program\ Files/步天软件/连连看5/LinLink5.exe

#解决midi声音问题
sudo apt-get install timidity

timidity -iAD -B2,8 -Os1l -s 44100

WINE=/usr/bin/deepin-wine5-stable WINEPREFIX=/home/dyl/.deepinwine/apps/连连看_1 winetricks -q directmusic gmdls


```
# 贪玩原始传奇

```shell
LC_ALL=en_US.UTF-8 WINEPREFIX=/home/dyl/.deepinwine/apps/贪玩原始传奇_1 WINEDEBUG=+seh deepin-wine5-stable /home/dyl/.deepinwine/apps/贪玩原始传奇_1/drive_c/yscq_tanwan/Update.exe

WINE=/usr/bin/deepin-wine5-stable WINEPREFIX=/home/dyl/.deepinwine/apps/贪玩原始传奇_1 winetricks -q dotnet40 gdiplus
```

