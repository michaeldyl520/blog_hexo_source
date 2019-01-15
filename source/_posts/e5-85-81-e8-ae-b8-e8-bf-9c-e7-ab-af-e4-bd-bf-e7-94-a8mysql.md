---
title: 允许远端使用mysql
tags:
  - MYSQL
url: 354.html
id: 354
categories:
  - MYSQL
date: 2015-08-11 09:48:47
---

mysql中敲命令

grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;