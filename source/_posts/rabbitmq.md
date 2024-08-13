---
title: Rabbitmq 一些有用的用法
date: 2024-08-13 10:29:42
tags:
 - rabbitmq
 - docker
---
# Docker 安装rabbitmq
management的意思是带有UI的rabbitmq，如果需要web gui，安装带-management的版本，然后通过http://localhost:15672即可访问gui，访问密钥默认是guest/guest.
```shell
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```