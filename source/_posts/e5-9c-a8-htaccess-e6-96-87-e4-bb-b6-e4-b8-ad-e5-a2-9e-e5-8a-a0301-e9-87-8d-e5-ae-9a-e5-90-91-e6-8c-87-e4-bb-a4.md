---
title: '在.htaccess文件中增加301重定向指令 '
tags:
  - '301'
  - htaccess
  - 重定向
url: 199.html
id: 199
categories:
  - apache
date: 2014-09-18 09:50:16
---

在.htaccess文件中增加301重定向指令 采用“mod_rewrite”技术，形如： RewriteEngine on RewriteRule ^(.*)$ [http://www.jiliuke.com/](http://www.jiliuke.com/) $1 \[R=301,L\]

301重定向代码和测试工具 国外:[http://www.seoconsultants.com/tools/headers](http://www.seoconsultants.com/tools/headers) 国 内:[http://www.ranknow.cn/tools/redirectcheck](http://www.ranknow.cn/tools/redirectcheck)