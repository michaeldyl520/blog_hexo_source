---
title: MYSQL 主从服务器配置
tags:
  - MYSQL
  - 主从配置
url: 81.html
id: 81
categories:
  - MYSQL
date: 2014-03-27 13:06:47
---

mysql服务器的主从配置，本来是一件很简单的事情，无奈不是从零开始，总是在别人已经安装好的mysql服务器之上 ，这就会牵扯到，mysql的版本，启动文件，等一些问题。 不过没关系，先问清楚两点 1、mysql配置文件my.cnf的位置 2、如何启动、停止mysql，找好启动文件 假设有两台机器，已经安装好了mysql（尽量同版本，且两台机器同一网络，可以ping通） 有朋友说：“从服务器，不能低于主服务器的版本”，不过我是低于的，没有出现问题。 主机A: 192.168.1.100 从机B:192.168.1.101 可以有多台从机 1、先登录主机 A mysql>GRANT REPLICATION SLAVE ON *.* TO ‘backup’@’192.168.1.101‘ IDENTIFIED BY ‘123456’; 赋予从机权限，有多台丛机，就执行多次 2、 打开主机A的my.cnf，输入 server-id = 1 #主机标示，整数 log\_bin = /var/log/mysql/mysql-bin.log #确保此文件可写 read-only =0 #主机，读写都可以 binlog-do-db =test #需要备份数据，多个写多行 binlog-ignore-db=mysql #不需要备份的数据库，多个写多行 3、打开从机B的my.cnf，输入 server-id = 2 log\_bin = /var/log/mysql/mysql-bin.log master-host =192.168.1.100 master-user =backup master-pass =123456 master-port =3306 master-connect-retry=60 #如果从服务器发现主服务器断掉，重新连接的时间差(秒) replicate-do-db =test #只复制某个库 replicate-ignore-db=mysql #不复制某个库 4、同步数据库 有多种方法，我说最笨的一种，先mysqldump导出主机A的数据test为 test.sql 然后在，从机B上建立数据库test，mysql导入 test.sql到test库中 5、先重启主机A的mysql，再重启从机B的mysql 6、验证 在主机A中，mysql>show master statusG; 在从机B中，mysql>show slave statusG; 能看到大致这些内容 File: mysql-bin.000001 Position: 1374 Binlog\_Do\_DB: test Binlog\_Ignore\_DB: mysql 可以在主机A中，做一些INSERT, UPDATE, DELETE 操作，看看主机B中，是否已经被修改 以下是一些其他朋友写的，我也做了参考 http://www.ningoo.net/html/2007/mysql\_replication\_configuration.html http://leftleg.hzpub.com/post/645/ http://blog.zhangjianfeng.com/article/705