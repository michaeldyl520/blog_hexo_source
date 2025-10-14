---
title: 使用mysqldump备份文件后删除日志数据
date: 2025-10-14 16:00:00
tags:
 - mysqldump
 - mysql
 - reduce
---
实际应用中会出现需要减少导出的备份体积，然后在本地导入再开发，可以大幅缩短导入等待时间,方法如下
```shell
sed '/INSERT INTO `tablelog1`/d' xxxx.sql | sed '/INSERT INTO `tablelog2`/d' | sed '/INSERT INTO `tablelog3`/d' | sed '/INSERT INTO `tablelog4`/d' | sed '/INSERT INTO `tablelog5`/d' > reduced.sql
```

更好的方法
```shell
grep -vE 'INSERT INTO `(tablelog1|tablelog2|tablelog3|tablelog4)`' xxxx.sql > reduced.sql
```