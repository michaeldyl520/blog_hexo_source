---
title: Linux使用logrotate自动切割magento2日志
date: 2022-01-13 14:29:53
tags:
 - linux
 - logrotate
 - magento2
---
 # 需求
 magento2 在运行的时候会不断在项目中var/log中记录日志，时间久后就会产生巨大的log日志，所以有必要每天切割日志保存，利于日志分析和减少磁盘开销。
 # 方法 (仅对于linux)
 1.首先确定当前的项目名称（magento2）和项目路径(/var/www/magento2)

 2.sudo vim /etc/logrotate.d/magento2
 3.拷贝以下内容到/etc/logrotate.d/magento2
 ```
 /var/www/magento2/var/log/*.log {
        daily
        compress
        delaycompress
        notifempty
        size 50M
        rotate 30
        create 0664
}
 ```
4.测试
```shell
#强制执行
sudo logrotate -f /etc/logrotate.d/magento2
#调试模式
sudo logrotate -f /etc/logrotate.d/magento2
```