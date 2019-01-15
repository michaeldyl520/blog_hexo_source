---
title: mysql 搜索按照in中顺序排序
tags:
  - MYSQL
url: 364.html
id: 364
categories:
  - MYSQL
date: 2015-08-11 09:52:38
---

select * from shopnc\_order where order\_id in (1225,1228,1231,1233) order by FIND\_IN\_SET(order_id,'1228,1225,1231,1233');