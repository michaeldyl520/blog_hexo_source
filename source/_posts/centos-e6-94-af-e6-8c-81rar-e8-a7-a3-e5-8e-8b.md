---
title: centos支持rar解压
tags:
  - centos
  - rar
url: 368.html
id: 368
categories:
  - CentOS
date: 2015-08-11 09:53:50
---

添加centos系统对rar文件的支持。 **\[root@localhost ~\]# wget http://www.rarsoft.com/rar/rarlinux-4.0.1.tar.gz \[root@localhost ~\]# tar -zxvf rarlinux-4.0.1.tar.gz** rar/ rar/readme.txt rar/default.sfx rar/whatsnew.txt rar/license.txt rar/order.htm rar/rar rar/unrar rar/rar_static rar/technote.txt rar/rarfiles.lst rar/makefile rar/rar.txt **\[root@localhost ~\]# cd rar \[root@localhost rar\]# make** mkdir -p /usr/local/bin mkdir -p /usr/local/lib cp rar unrar /usr/local/bin cp rarfiles.lst /etc cp default.sfx /usr/local/lib \[**root@localhost rar\]# rar x moumou.rar** -bash: /usr/local/bin/rar: /lib/ld-linux.so.2: bad ELF interpreter: No such file or directory 处理这个问题 **\[root@localhost rar\]# cp rar_static /usr/local/bin/rar** cp: overwrite `/usr/local/bin/rar'? y 已可以正常解压 **root@localhost rar\]# rar x moumou.rar** RAR 4.01 Copyright (c) 1993-2011 Alexander Roshal 28 May 2011 Shareware version Type RAR -? for help Extracting from moumou.rar Creating moumou OK Creating moumou/css OK Extracting moumou/css/default.css OK