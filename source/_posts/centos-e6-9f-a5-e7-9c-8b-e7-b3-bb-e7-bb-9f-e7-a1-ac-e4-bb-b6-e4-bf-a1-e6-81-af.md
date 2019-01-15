---
title: Centos 查看系统硬件信息
tags:
  - centos
  - 硬件
url: 25.html
id: 25
comments: false
categories:
  - CentOS
date: 2014-02-27 09:44:38
---

Centos 查看系统硬件信息 \[root@yongsen ~\] # uname -a # 查看内核/操作系统/CPU信息的linux系统信息命令 \[root@yongsen ~\] # head -n 1 /etc/issue # 查看操作系统版本，是数字1不是字母L \[root@yongsen ~\] # cat /proc/cpuinfo # 查看CPU信息的linux系统信息命令 \[root@yongsen ~\] # hostname # 查看计算机名的linux系统信息命令 \[root@yongsen ~\] # lspci -tv # 列出所有PCI设备 \[root@yongsen ~\] # lsusb -tv # 列出所有USB设备的linux系统信息命令 \[root@yongsen ~\] # lsmod # 列出加载的内核模块 \[root@yongsen ~\] # env # 查看环境变量资源 \[root@yongsen ~\] # free -m # 查看内存使用量和交换区使用量 \[root@yongsen ~\] # df -h # 查看各分区使用情况 \[root@yongsen ~\] # du -sh # 查看指定目录的大小 \[root@yongsen ~\] # grep MemTotal /proc/meminfo # 查看内存总量 \[root@yongsen ~\] # grep MemFree /proc/meminfo # 查看空闲内存量 \[root@yongsen ~\] # uptime # 查看系统运行时间、用户数、负载 \[root@yongsen ~\] # cat /proc/loadavg # 查看系统负载磁盘和分区 \[root@yongsen ~\] # mount | column -t # 查看挂接的分区状态 \[root@yongsen ~\] # fdisk -l # 查看所有分区 \[root@yongsen ~\] # swapon -s # 查看所有交换分区 \[root@yongsen ~\] # hdparm -i /dev/hda # 查看磁盘参数(仅适用于IDE设备) \[root@yongsen ~\] # dmesg | grep IDE # 查看启动时IDE设备检测状况网络 \[root@yongsen ~\] # ifconfig # 查看所有网络接口的属性 \[root@yongsen ~\] # iptables -L # 查看防火墙设置 \[root@yongsen ~\] # route -n # 查看路由表 \[root@yongsen ~\] # netstat -lntp # 查看所有监听端口 \[root@yongsen ~\] # netstat -antp # 查看所有已经建立的连接 \[root@yongsen ~\] # netstat -s # 查看网络统计信息进程 \[root@yongsen ~\] # ps -ef # 查看所有进程 \[root@yongsen ~\] # top # 实时显示进程状态用户 \[root@yongsen ~\] # w # 查看活动用户 \[root@yongsen ~\] # id # 查看指定用户信息 \[root@yongsen ~\] # last # 查看用户登录日志 \[root@yongsen ~\] # cut -d: -f1 /etc/passwd # 查看系统所有用户 \[root@yongsen ~\] # cut -d: -f1 /etc/group # 查看系统所有组 \[root@yongsen ~\] # crontab -l # 查看当前用户的计划任务服务 \[root@yongsen ~\] # chkconfig –list # 列出所有系统服务 \[root@yongsen ~\] # chkconfig –list | grep on # 列出所有启动的系统服务程序 \[root@yongsen ~\] # rpm -qa # 查看所有安装的软件包 \[root@yongsen ~\] # cat /proc/cpuinfo # 查看CPU相关参数的linux系统命令 \[root@yongsen ~\] # cat /proc/partitions # 查看linux硬盘和分区信息的系统信息命令 \[root@yongsen ~\] # cat /proc/meminfo # 查看linux系统内存信息的linux系统命令 \[root@yongsen ~\] # cat /proc/version # 查看版本，类似uname -r \[root@yongsen ~\] # cat /proc/ioports # 查看设备io端口 \[root@yongsen ~\] # cat /proc/interrupts # 查看中断 \[root@yongsen ~\] # cat /proc/pci # 查看pci设备的信息 \[root@yongsen ~\] # cat /proc/swaps # 查看所有swap分区的信息 以上命令如果说没有，那么在RHEL6的系统上，你可以用 yum provides “*/lspci”这样类似的命令来查询，然后安装相应的软件包就可以了。