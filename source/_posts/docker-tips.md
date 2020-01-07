---
title: docker使用小技巧
date: 2020-01-07 10:13:03
tags:
 - docker
categorys: 
 - Docker
---
如果 `docker ps -a` 中太多，一次性删除方法
```shell
docker rm `docker ps -a -q --filter 'status=exited'`
```