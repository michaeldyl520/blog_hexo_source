---
title: 一些 deepin-wine 事例
date: 2021-03-17 18:42:58
tags:
---

# 使用MIDI游戏问题

```shell
WINEPREFIX=~/.deepinwine/apps/XXX_1 WINEDEBUG=+seh deepin-wine5-stable ~/.deepinwine/apps/XXX_1/drive_c/Program\ Files/XXXX/XXX5/LinLink5.exe

#调试字体
WINEPREFIX=/data/home/dyl/.deepinwine/apps/XXX_1 WINEDEBUG=+font,+tid deepin-wine5-stable /data/home/dyl/.deepinwine/apps/XXX_1/drive_c/Program\ Files/XXXX/XXX5/LinLink5.exe &> /data/home/dyl/fonts.log

WINEPREFIX=/data/home/dyl/.deepinwine/apps/XXX_1 WINEDEBUG=+seh deepin-wine5-stable /data/home/dyl/.deepinwine/apps/XXX_1/drive_c/Program\ Files/XXXX/XXX5/LinLink5.exe

#解决midi声音问题
sudo apt-get install timidity

timidity -iAD -B2,8 -Os1l -s 44100

WINE=/usr/bin/deepin-wine5-stable WINEPREFIX=/home/dyl/.deepinwine/apps/XXX_1 winetricks -q directmusic gmdls


```
# 解决dotnet40安装卡死问题

```shell
LC_ALL=en_US.UTF-8 WINEPREFIX=/home/dyl/.deepinwine/apps/XXXXXX_1 WINEDEBUG=+seh deepin-wine5-stable /home/dyl/.deepinwine/apps/XXXXXX_1/drive_c/yscq_tanwan/Update.exe

WINE=/usr/bin/deepin-wine5-stable WINEPREFIX=/home/dyl/.deepinwine/apps/XXXXXX_1 winetricks -q dotnet40 gdiplus
```

