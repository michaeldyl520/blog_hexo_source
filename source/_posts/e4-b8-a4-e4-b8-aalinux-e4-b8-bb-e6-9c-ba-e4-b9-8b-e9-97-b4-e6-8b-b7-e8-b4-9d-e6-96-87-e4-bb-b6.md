---
title: 两个linux主机之间拷贝文件
tags:
  - centos
  - scp
url: 231.html
id: 231
categories:
  - CentOS
date: 2014-12-08 13:21:20
---

        不同的Linux之间copy文件常用有3种方法，

        第一种就是ftp，也就是其中一台Linux安装ftp Server， 这样可以另外一台使用ftp的client程序来进行文件的copy。 （注意文件大小不能超过2G） 第二种方法就是采用samba服务，类似Windows文件copy的方式来操作，比较简洁方便， 第三种就是利用scp命令来进行文件复制。 scp是有Security的文件copy，基于ssh登录。操作起来比较方便，比如要把当前一个文件copy到远程另外一台主机上，可以如下命令。 scp /soft/squid-2.6.STABLE2.tar root@192.168.1.1:/soft 然后会提示你输入另外那台172.19.2.75主机的root用户的登录密码，接着就开始copy了。 如果想反过来操作，把文件从远程主机copy到当前系统，也很简单。 scp root@172.19.2.75:/home/root /home/daisy/full.tar.gz