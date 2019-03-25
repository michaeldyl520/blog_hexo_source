---
title: ssh 必须使用账号密码登录方法
date: 2018-06-20 14:14:16
categories:
 - ssh
tags:
 - ssh
 - linux
 - debian
---
## 问题
当我们本地有很多私钥的时候，直接使用`ssh xxx@xx.xx.xx.xx`方式登录的时候会出现` Too many authentication failures for xxx
Authentication failed.`的错误，所以当我们存在大量的私钥时，为了方便，可以使用免密登录（不在此文讨论范围），还可以必须使用账号密码登录。

## 解决办法
配置ssh配置文件，如debian配置文件在`/etc/ssh/ssh_config`中，加入`PubkeyAuthentication no`到文件中即可。