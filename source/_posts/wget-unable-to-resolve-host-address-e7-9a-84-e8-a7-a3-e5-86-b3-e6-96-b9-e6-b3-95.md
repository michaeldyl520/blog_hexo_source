---
title: 'wget: unable to resolve host address的解决方法  '
tags:
  - centos
  - nameserver
url: 134.html
id: 134
categories:
  - CentOS
date: 2014-05-15 09:25:35
---

解决办法： 登入root（VPS）。 进入/etc/resolv.conf。 修改内容为下 nameserver 8.8.8.8 #google域名服务器 nameserver 8.8.4.4 #google域名服务器