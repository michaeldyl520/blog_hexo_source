---
title: linux ip 配置方法
tags:
  - centos
  - ip
  - linux
url: 115.html
id: 115
categories:
  - CentOS
date: 2014-05-14 14:05:57
---

首先你得知道几个命令： ifconfig 查看网卡信息的命令（网卡以eth0~ethN命名，看你网卡用的是哪个）。另外，它只在root用户下可能，一般普通用户不能用。 route -n 查看路由的命令。 cat /etc/resolv.conf 查看DNS，配置DNS可在这个文件配置 命令行里有三种修改IP方法，其中一种是临时的，重启后就没有了，在此不提了。只说两种永久生效的: 1，在命令行里，通过命令调出图形界面配置，比较直观，容易配置： 命令 setup 弹出图形界面，选择network configuration ----> 回车----->两个选项，第一个是网卡，第二个是DNS，在此不多讲了。写太多了，最主要是很直观。 最后配置完了后，点TAB键或者上下左右键 选：OK---->save--->save&quit--->quit 2，命令行编写配置文件来实现，一般你的网卡是eth0. # vi /etc/sysconfig/network-scripts/ifcfg-eth0 DEVICE=eth0 #描述网卡对应的设备别名，例如ifcfg-eth0的文件中它为eth0 BOOTPROTO=static #设置网卡获得ip地址的方式，可能的选项为static，dhcp或bootp，分别对应静态指定的 ip地址，通过dhcp协议获得的ip地址，通过bootp协议获得的ip地址 BROADCAST=192.168.0.255 #对应的子网广播地址 HWADDR=00:07:E9:05:E8:B4 #对应的网卡物理地址 IPADDR=192.168.0.2 #如果设置网卡获得 ip地址的方式为静态指定，此字段就指定了网卡对应的ip地址 IPV6INIT=no IPV6_AUTOCONF=no NETMASK=255.255.255.0 #网卡对应的网络掩码 NETWORK=192.168.0.0 #网卡对应的网络地址 ONBOOT=yes #系统启动时是否设置此网络接口，设置为yes时，系统启动时激活此设备 修改对应网卡的网关的配置文件 vi /etc/sysconfig/network NETWORKING=yes(表示系统是否使用网络，一般设置为yes。如果设为no，则不能使用网络，而且很多系统服务程序将无法启动) HOSTNAME=localhost(设置本机的主机名，这里设置的主机名要和/etc/hosts中设置的主机名对应) GATEWAY=192.168.1.1(设置本机连接的网关的IP地址。)