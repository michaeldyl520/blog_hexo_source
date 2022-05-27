---
title: MYSQL Tips
date: 2022-05-16 10:24:37
tags:
 - mysql
 - 统计
---
一些有用mysql tips
```
#统计所有数据库从大到小排列
select TABLE_SCHEMA,round(SUM(DATA_LENGTH + INDEX_LENGTH)/1024/1024,2) as data from information_schema.tables GROUP BY TABLE_SCHEMA order by data desc;
#统计数据库大小
select round(SUM(DATA_LENGTH + INDEX_LENGTH)/1024/1024,2) as data from information_schema.tables where TABLE_SCHEMA="xxxxxx";
#统计数据表大小
select table_name,round(SUM(DATA_LENGTH + INDEX_LENGTH)/1024/1024,2) as data from information_schema.tables where TABLE_SCHEMA="xxxxxx" GROUP BY table_name order by data desc;
```