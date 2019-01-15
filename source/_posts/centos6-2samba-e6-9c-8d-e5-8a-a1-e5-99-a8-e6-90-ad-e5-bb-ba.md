---
title: CentOS6.2samba服务器搭建
tags:
  - centos
  - samba
url: 99.html
id: 99
categories:
  - samba
date: 2014-04-09 09:46:39
---

匿名访问 1\. yum -y install samba samba-common 2. cd /etc/samba vim smb.conf # 1). 先设定好服务器整体环境方面的参数 \[global\] # 与主机名有关的设定信息 workgroup = vbirdhouse netbios name = vbirdserver server string = This is vbird's samba server # 与语系方面有关的设定项目喔，为何如此设定请参考前面的说明 unix charset = utf8 display charset = utf8 dos charset = cp950 # 与登录文件有关的设定项目，注意变量 (%m) log file = /var/log/samba/log.%m max log size = 50 # 这里才是与密码有关的设定项目哩！ security = share # 修改一下打印机的加载方式，不要加载啦！ load printers = no # 2). 分享的资源设定方面：主要得将旧的批注，新的加入！ # 先取消 \[homes\], \[printers\] 的项目，然后针对 /tmp 的设定，可浏览且可写入喔 \[temp\] <==分享资源名称 comment = Temporary file space <==简单的解释此资源 path = /tmp <==实际 Linux 分享的目录 writable = yes <==是否可写入？在此例为是的 browseable = yes <==能不能被浏览到资源名称 guest ok = yes <==单纯分享时，让用户随意登入的设定值 3. service smb start service smb start