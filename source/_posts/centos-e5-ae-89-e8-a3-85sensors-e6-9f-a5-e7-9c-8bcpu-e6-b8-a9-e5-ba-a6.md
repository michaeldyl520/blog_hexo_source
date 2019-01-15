---
title: centos 安装sensors查看cpu温度
tags:
  - lm_sensors
  - sensors
url: 362.html
id: 362
categories:
  - CentOS
date: 2015-08-11 09:52:08
---

root#:yum -y install lm_sensors

root#:sensors

如果提示No sensors found

运行：

root#:sensors-detect

一路回车就行了

![](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/10809dbc100a41c19a9c96dabce12936/clipboard.png)