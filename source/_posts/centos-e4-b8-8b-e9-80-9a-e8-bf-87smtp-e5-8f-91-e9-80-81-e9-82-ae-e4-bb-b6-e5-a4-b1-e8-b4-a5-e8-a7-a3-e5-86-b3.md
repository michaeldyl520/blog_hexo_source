---
title: Centos下通过SMTP发送邮件失败解决
tags:
  - centos
  - SMTP
url: 52.html
id: 52
categories:
  - CentOS
date: 2014-03-13 09:31:09
---

前天测试出在64位系统下不能发送激活邮件的bug 打出error\_msg:为permission deny 调试搜索了半天，没有结果；网上主要说的是 fsockopen被关闭啊，用pfsockopen，或者stream\_socket\_client()来代替 都试过不行； 因为在window下这几个函数都没有问题，所以想到是linux的 的问题，这个东东困扰过好几次了，以后碰到问题请首先想到这个； 既然默认开启了肯定有他的好处，不能关selinux，就搜索：selinux+smtp 找到了答案，selinux果然是不允许http来连接网络的，执行如下命令： setsebool -P httpd\_can\_network\_connect=1 即可发送邮件了，看来得好好看看selinux这个鬼东西了。 详情参考： https://www.vbulletin.com/forum/showthread.php/217997-smtp-mail-and-SElinux-in-enforcing-mode To allow PHP/Apache to connect to port 25 issue the following commands as root: setsebool -P httpd\_can\_network\_connect=1 To allow PHP mail() to work issue the following command as root: setsebool -P httpd\_can_sendmail=1 今天2012-04-19 又碰到服务器不能发送邮件的问题了，服务器部署到电信机房后。 SMTP Error: Could not connect to SMTP host. 找了半天没有发现问题所在，重启了httpd，就好了，实在太诡异了， 按理昨天关闭服务器在机房才开的机，httpd也算是重启了的。 先记住，重启httpd可不是神马好方法