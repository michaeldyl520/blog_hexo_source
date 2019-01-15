---
title: iredmail 问题集锦
tags:
  - centos
  - iredmail
url: 277.html
id: 277
categories:
  - iredMail
date: 2015-03-11 13:39:31
---

配置好后发现收邮件很慢 多半是灰名单引起的， telnet 25测试出现这个Recipient address rejected: Greylisting in effect，请到/etc/policyd/cluebringer.conf中查找Greylisting, # Greylisting module \[Greylisting\] enable=1 enable=1改为0 然后重启灰名单处理即可 /etc/init.d/cbpolicyd restart