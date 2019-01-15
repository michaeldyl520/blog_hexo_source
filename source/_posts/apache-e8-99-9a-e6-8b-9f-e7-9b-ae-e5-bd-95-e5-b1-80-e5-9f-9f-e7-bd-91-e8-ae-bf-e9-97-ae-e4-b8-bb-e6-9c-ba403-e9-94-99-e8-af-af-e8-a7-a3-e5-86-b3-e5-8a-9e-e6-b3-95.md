---
title: apache虚拟目录局域网访问主机403错误解决办法
tags:
  - '403'
  - apache
  - 虚拟目录
url: 197.html
id: 197
categories:
  - apache
date: 2014-09-17 16:34:00
---

在这个例子，所有请求都将拒绝

### 2.2 configuration:

Order deny,allow
Deny from all

### 2.4 configuration:

Require all denied

在这个例子，所有请求都将允许

### 2.2 configuration:

Order allow,deny
Allow from all

### 2.4 configuration:

Require all granted

在这个例子，所有在 example.org域名的主机都将被允许访问;其他的都将拒绝。

### 2.2 configuration:

Order Deny,Allow
Deny from all
Allow from example.org

### 2.4 configuration:

Require host example.org