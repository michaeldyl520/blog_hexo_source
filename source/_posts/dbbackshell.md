---
title: 数据库shell备份与超时自动删除
date: 2021-10-19 10:38:24
tags:
---
```shell
#!/bin/bash 
id="user"
pwd="password"
$db="db"
backuppath="/app/"$user"/var/dbbackup"
day=15
[ ! -d $backuppath ] && mkdir -p $backuppath
cd $backuppath

dbname=$db'_'
backupname=$dbname`date +%Y%m%d%H%M%S`
mysqldump -h127.0.0.1 -u$id -p$pwd $db --single-transaction --triggers --skip-tz-utc --ignore-table-data=$db.quote_id_mask | gzip -> $backupname.sql.gz
find $backuppath -name $dbname"*.sql.gz" -type f -mtime +$day -exec rm -rf {} \;
```