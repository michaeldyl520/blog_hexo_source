---
title: CentOS mini 默认无法上网和配置IP
tags:
  - centos
url: 340.html
id: 340
categories:
  - CentOS
date: 2015-08-11 09:43:03
---

CentOS　 mini默认是无法上网，需要进行如下设置： 一、编辑网络设置： 修改ONBOOT值为yes

`1`

`DEVICE=eth0`

`2`

`HWADDR=00:0C:29:4E:B7:C9`

`3`

`TYPE=Ethernet`

`4`

`UUID=a3d55d06-78fe-4542-a44a-d95cb5667cd6`

`5`

`ONBOOT=no`

`6`

`NM_CONTROLLED=yes`

`7`

`BOOTPROTO=dhcp`

二、重启network服务 service network restart **手动配置IP：** vi  /etc/sysconfig/network-scripts/ifcfg-ethx

![linux-ip](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/f291a0c53bcf4d6bb92703fe4bf4ee81/linux-ip.jpeg)linux-ip