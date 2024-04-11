---
title: Linux 系统远程开机(WOL)
date: 2024-04-11 09:45:26
tags:
 - wakeonlan
 - deepin
 - wol
---
# 局域网远程开机(WOL)
前置条件，主板需要支持wakonlan，Deepin 20.9 为例
## 1.查看lan网卡是否开启WOL
```shell
sudo ethtool enp3s0
```
如果 ``Wake-on: d`` 表示未开启

## 2.设置 ``wake-on: g`` 开启WOL
```shell
sudo ethtool -s enp3s0 wol g
```
## 3.设置开机自启动
添加rc.local文件
```sudo vim /etc/rc.local```
```shell
#!/bin/bash
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

/usr/sbin/ethtool -s enp3s0 wol g

exit 0

```
```shell
sudo chmod +x /etc/rc.local
sudo systemctl enable rc-local
```
然后重启计算机

## 4.另外一台局域网电脑安装wakeonlan
```shell
sudo apt-get install etherwake
```
## 5.发送数据包到上面配置的电脑的MAC地址启动
```shell
wakeonlan {MAC Address}
```