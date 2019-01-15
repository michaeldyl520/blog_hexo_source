---
title: centos下安装最新firefox
url: 18.html
id: 18
categories:
  - CentOS
date: 2014-02-24 13:43:06
tags:
---

1.install EPEL repository #wget Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm #rpm -Uvh epel-release-6-8.noarch.rpm 2.install Remi repository #wget http://rpms.famillecollet.com/enterprise/remi-release-6.rpm #rpm -Uvh remi-release-6.rpm 3.check Availabilty of Firefox 24 #yum --enablerepo=remi list firefox 4.install firefox #yum --enablerepo=remi install firefox 5.Starting Firefox 24 #firefox