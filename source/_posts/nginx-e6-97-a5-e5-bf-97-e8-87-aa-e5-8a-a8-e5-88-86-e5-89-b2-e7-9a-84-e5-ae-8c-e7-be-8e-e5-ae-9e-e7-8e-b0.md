---
title: nginx日志自动分割的完美实现
tags:
  - nginx
url: 344.html
id: 344
categories:
  - nginx
date: 2015-08-11 09:44:40
---

文件名nginx\_access\_log.sh 以下是脚本 #!/bin/bash - #1.nginx日志存放路径 first\_path="/lnmp/nginx/logs" path\_array=($first\_path) #2.日志标识前缀数组 first\_prefix\_sign="first" prefix\_array=($first\_prefix\_sign) #3.日志成功错误标识后缀数组 bool\_array=("access" "error") #4.nginx日志切割备份后缀 postfix=\`date -d '+0 days' +%Y%m%d\`".log" #5.备份当前的日志文件，重命名改为日期后缀 for path in ${path\_array\[*\]} do for prefix in ${prefix\_array\[*\]} do for bool in ${bool\_array\[*\]} do file=$path/$bool.log backfile=$path/$prefix.$bool.$postfix echo $file echo $backfile if \[ -e $file \];then mv $file  $backfile fi done done done #6.查找nginx进程号,让其产生新的日志文件 nginx\_pid=\`ps -ef|grep -E 'nginx: master process nginx'|grep -v 'grep'|awk '{print $2}'\` #USR1:Reopen log files,刷新nginx日志文件 kill -HUP $nginx\_pid