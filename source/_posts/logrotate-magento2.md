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
 1.首先确定当前的项目名称（magento2）和项目路径(/var/www/magento2),项目执行用户www

 2.sudo vim /etc/logrotate.d/magento2
 3.拷贝以下内容到/etc/logrotate.d/magento2
 ```
 {
    daily
    missingok
    rotate 365
    maxage 365
    compress
    copytruncate
    prerotate
        # logrotate fails if the .1 file already exists, which only
        # ever happens if the last copytruncate failed, or during the
        # first run after delaycompress is disabled. When this script
        # runs, older logs have already been rotated, so it's safe to
        # rotate an unexpected log.1 file into log.2.gz. Sometimes the
        # argument already has a .1 suffix, so strip it.
        [ -e "${1%.1}.1" ] && sudo -u  -g  bash -c "gzip --best < \"${1%.1}.1\" > \"${1%.1}.2.gz\"" && rm "${1%.1}.1"
        true
    endscript
    notifempty
    create 0640 www www
    su www www
    lastaction
        chown www:www -R /var/www/magento2/var/log/*.log
        # fix files with broken permissions
        chown www:www -R /var/www/magento2/var/log/*.log.[0-9]*.gz 2>/dev/null || true
    endscript
}
 ```
4.测试
```shell
#强制执行
sudo logrotate -f /etc/logrotate.d/magento2
#调试模式
sudo logrotate -d /etc/logrotate.d/magento2
```