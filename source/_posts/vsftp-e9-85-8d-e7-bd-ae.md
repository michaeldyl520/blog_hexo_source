---
title: vsftp配置
tags:
  - centos
  - vsftp
url: 91.html
id: 91
categories:
  - vsftp
date: 2014-04-04 14:55:59
---

接着就是修改etc/vsftpd/vsftpd.conf里面的参数了。 anonymous\_enable=YES/NO是否允许匿名访问 1、限制所有的本地用户在自家目录 chroot\_local\_user=YES 限制部分本地用户在自家目录 chroot\_local\_user=NO chroot\_list\_enable=YES chroot\_list\_file=/etc/vsftpd.chroot\_list 在/etc/vsftpd.chroot\_list文件中加入要限制的本地用户名。注意一个用户名一行。 有时候要限制某些IP访问服务器,只允许某些IP访问,例如只允许192.168.0.33访问这个FTP,同样修改配置文件: listen\_address=192.168.0.33 端口修改：/etc/services,修改，比如改FTP21端口改2121，只要在这里修改，然后在vsftpd.conf配置文件里加一条 listet\_port=2121 最主要的是防火墙里的SELinux要允许，不然是不能读取写入的 还有一种就是pasv被动传输模式，可以如下设置 pasv\_enable=yes （Default: YES ） 设置是否允许pasv模式 pasv\_promiscuous=no （Default: NO ） 是否屏蔽对pasv进行安全检查，（当有安全隧道时可禁用） pasv\_min\_port=1024（Default: 0 (use any port) ） pasv使用的最大端口 pasv\_max_port=10240 （Default: 0 (use any port) ） pasv使用的最小端口 然后在添加防火墙的时候可以加一条 iptables -A INPUT -p tcp --dport 1024:10240 -j ACCEPT(表示1024-10240这些端口通过) iptables -A OUTPUT -p tcp --spotr 1024:10240 -j ACCEPT 最后，如何让vsftpd自动启动 在/etc/rc.local 文件里面添加一句 vsftpd & 这样就可以开机就自动启动了！