---
title: 'Linux 系统如何禁ping, CentOS 禁ping'
tags:
  - centos
  - ping
url: 348.html
id: 348
categories:
  - CentOS
date: 2015-08-11 09:46:23
---

Linux系统，CentOS操作系统如何设置禁止别人ping我们自己的服务器，下面给大家介绍一些常用的方法： **1、以root账户进入系统，然后编辑文件icmp\_echo\_ignore_all** vi /proc/sys/net/ipv4/icmp\_echo\_ignore\_all 0 表示允许ping 1 表示禁止ping 可以直接运行以下命令 \[root@00isp ~\]# echo 1 >/proc/sys/net/ipv4/icmp\_echo\_ignore\_all \[root@00isp ~\]# echo 0 >/proc/sys/net/ipv4/icmp\_echo\_ignore\_all 此上两条命令的效果实时生效，可以用另外的机器ping来测试是否生效。以上方式只是临时性的禁ping 重启后会失效，如果想要重启过后也不能ping可以做如下操作 /etc/rc.d/rc.local中增加一行 echo 1 > /proc/sys/net/ipv4/icmp\_echo\_ignore\_all 另外可以在配置文件 /etc/sysctl.conf 文件中增加一行 net.ipv4.icmp\_echo\_ignore_all=1 **2、使用IPTables禁止PING** echo "1" > /proc/sys/net/ipv4/icmp\_echo\_ignore_all 这下是别人不能ping你，你也不能ping别人，其实使用iptable最简单 iptables -A INPUT -p icmp --icmp-type 8 -s 0/0 -j DROP iptables -A INPUT -p icmp --icmp-type 0 -s 0/0 -j ACCEPT iptables -A OUTPUT -p icmp --icmp-type 0 -s 192.168.29.1 -j DROP iptables -A OUTPUT -p icmp --icmp-type 8 -s 192.168.29.1 -j ACCEPT