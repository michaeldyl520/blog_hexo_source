---
title: Linux debian 系统一些小技巧
date: 2024-08-07 10:49:14
tags:
 - deepin
 - debian
 - buster
 - php
---
# Debian buster生命周期已结束， 可离线打包本地的包
安装 dpkg-repack 工具：

```shell
sudo apt-get update
sudo apt-get install dpkg-repack
```
列出已安装的软件包：
你可以使用 dpkg -l 命令列出系统上已安装的软件包，找到你想要重新打包的软件包名称。

```shell
dpkg -l | grep <package-name>
```

使用 dpkg-repack 重新打包：
运行以下命令，将 <package-name> 替换为你想要重新打包的软件包名称：

```shell
sudo dpkg-repack <package-name>
```

deb.sury.org 不再提供包，本地打包以便后续继续使用
```shell
dpkg -l|grep php8.2 | awk '/^ii/ {print $2}'| xargs -I {} sudo dpkg-repack {}
```