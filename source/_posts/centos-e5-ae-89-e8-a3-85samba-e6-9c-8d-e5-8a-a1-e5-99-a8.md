---
title: centos 安装samba服务器
tags:
  - centos
  - samba
url: 14.html
id: 14
categories:
  - CentOS
date: 2014-02-20 09:43:47
---

1.yum -y install samba//下载samba包，并自动安装

2.service smb start//开启samba服务

3.netstat -anpl|grep smb//查看samba端口号(一般是139和445)

4.vi /etc/sysconfig/iptables//添加端口到防火墙

5.samba配置，配置文件在：vi /etc/samba/smb.conf

主要配置global setting，share definitions

> 74行：workgroup = WORKGROUP//和windows工作组一致
> 
> 75行：服务器版本信息，可不改
> 
> 77行：微软中显示的信息，可不改
> 
> 79行：监听的物理网卡，前有分号不解析的，用的时候配置
> 
> 80行：监听的ip地址，可以写域名段，前有分号不解析的，用的时候配置
> 
> 101行：加密方式：user表示用户加密，share表示不加密，设置成share后就能登ip访问了

6.添加samba用户之前需要添加为系统用户，

      pdbedit –a username：新建Samba账户。 pdbedit –x username：删除Samba账户。 pdbedit –L：列出Samba用户列表，读取passdb.tdb数据库文件。 pdbedit –Lv：列出Samba用户列表的详细信息。 pdbedit –c “\[D\]” –u username：暂停该Samba用户的账号。 pdbedit –c “\[\]” –u username：恢复该Samba用户的账号。

以下是命令:

useradd daiyunlong

passwd daiyunlong

123456

123456

pdbedit -a daiyunlong

123456

123456

7.关闭SELinux

setenforce 1 开启

setenforce 0 关闭

到此，已经可以向linux复制东西了