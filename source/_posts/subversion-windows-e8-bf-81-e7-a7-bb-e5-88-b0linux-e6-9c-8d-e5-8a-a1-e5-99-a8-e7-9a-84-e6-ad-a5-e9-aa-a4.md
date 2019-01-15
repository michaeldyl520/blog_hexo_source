---
title: Subversion windows迁移到linux服务器的步骤
tags:
  - linux
  - Subversion
  - 迁移
url: 16.html
id: 16
categories:
  - CentOS
date: 2014-02-21 13:24:30
---

首先在Windows上，使用svnadmin dump resp\_path >dumpfile将一个仓库导出成一个文件，这时候可以看到一个版本一个版本的导出过程。然后把这个dumpfile复制到Linux的机器上，使用svnadmin load resp\_path amis.dump 2、ftp上传到linux下如/project 3、linux下/project$svnadmin create amis 4、/project$svnadmin load amis < amis.dump. 注意导出用>，导入用< 注意：linux的profile下要使用utf-8的编码；securecrt的字符编码也要用utf-8。