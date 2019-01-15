---
title: php-fpm进程关闭与重启脚本详解
tags:
  - php-fpm
url: 338.html
id: 338
categories:
  - php-fpm
date: 2015-08-11 09:42:02
---

今天我来给各位同学介绍一下关于php-fpm进程关闭与重启命令吧，PHP-FPM是一个PHP FastCGI管理器，是只用于PHP的并且PHP5.3.3已经集成php-fpm了，不再是第三方的包了哦。

**先来理解一下什么是php-fpm** PHP-FPM是一个PHP FastCGI管理器，是只用于PHP的。 PHP-FPM其实是PHP源代码的一个补丁，旨在将FastCGI进程管理整合进PHP包中。必须将它patch到你的PHP源代码中，在编译安装PHP后才可以使用。 　　现在我们可以在最新的PHP 5.3.2的源码树里下载得到直接整合了PHP-FPM的分支，据说下个版本会融合进PHP的主分支去。相对Spawn-FCGI，PHP-FPM在CPU和内存方面的控制都更胜一筹，而且前者很容易崩溃，必须用crontab进行监控，而PHP-FPM则没有这种烦恼。 PHP5.3.3已经集成php-fpm了，不再是第三方的包了。PHP-FPM提供了更好的PHP进程管理方式，可以有效控制内存和进程、可以平滑重载PHP配置，比spawn-fcgi具有更多优点，所以被PHP官方收录了。在./configure的时候带 –enable-fpm参数即可开启PHP-FPM。 　　使用PHP-FPM来控制PHP-CGI的FastCGI进程 **master进程可以理解以下信号** INT, TERM 立刻终止 QUIT 平滑终止 USR1 重新打开日志文件 USR2 平滑重载所有worker进程并重新载入配置和二进制模块 **示例：** php-fpm 关闭：

 代码如下

复制代码

kill -INT \`cat /usr/local/php/var/run/php-fpm.pid\`

php-fpm 重启：

 代码如下

复制代码

kill -USR2 \`cat /usr/local/php/var/run/php-fpm.pid\`

查看php-fpm进程数：

 代码如下

复制代码

[ps](http://www.111cn.net/fw/photo.html) aux | grep -c php-fpm

**php-fmp的重启 (方法二）** 先执行

 代码如下

复制代码

killall php-fpm

再执行(usr/local/php是php的安装目录)

 代码如下

复制代码

/usr/local/php/sbin/php-fpm &