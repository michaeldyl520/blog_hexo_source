---
title: CMake和Configure项目的安装与反安装
tags:
  - cmake
  - configure
url: 284.html
id: 284
categories:
  - LAMP技术中心
date: 2015-03-30 10:44:34
---

Configure： 项目安装： 比如用源码包安装gaim 的 ./configure --prefix=/opt/gaim make make install 如果安装mlterm ./configure --prefix=/opt/mlterm make make install 把源码包安装的软件，都指定安装在 /opt目录中 项目删除： 如果删除，就删除相应的软件目录； 有些软件要在解压安装目录中执行 make uninstall 这样就卸载掉了 CMake： 项目安装： 1、首先安装CMake工具 wget http://www.cmake.org/files/v2.8/cmake-2.8.4.tar.gz tar xvzf cmake-2.8.4.tar.gz cd cmake-2.8.4 ./configure make make install 以安装MySQL 5.5.9为例，执行： tar zxvf mysql-5.5.9.tar.gz cd mysql-5.5.9/ rm CMakeCache.txt cmake -DCMAKE\_INSTALL\_PREFIX=/usr/local/webserver/mysql/-DMYSQL\_DATADIR=/home/mysql/data/-DEFAULT\_CHARSET=utf8 -DMYSQL\_TCP\_PORT=3306-DMYSQL\_UNIX\_ADDR=/tmp/mysql.sock -DWITH\_DEBUG=0-DWITH\_INNOBASE\_STORAGE\_ENGINE=1-DMYSQL\_USER=mysql 这些参数的意思: -DCMAKE\_INSTALL\_PREFIX=/data/mysql 准备安装到那里 -DEFAULT\_CHARSET=utf8 默认的字符集 -DMYSQL\_TCP\_PORT=3306 数据库的监听端口 -DMYSQL\_UNIX\_ADDR=/tmp/mysql3306.sock 本机连回数据库的unix socket -DWITH\_DEBUG=0 关闭debug模式 -DWITH\_INNOBASE\_STORAGE\_ENGINE=1 打开innodb引擎 make && make install 项目删除： CMake 默认不提供 uninstall 这个 target，想要的话，输入： xargs rm < install_manifest.txt 对于不修改配置的项目足够了，manifest.txt 是CMake 生成的安装文件列表。