---
title: The container 'Android Dependencies' references non existing library
url: 210.html
id: 210
categories:
  - android
date: 2014-10-23 09:28:43
tags:
---

在andriod项目中引用另一个library project时，报

The container 'Android Dependencies' references non existing library 'xxxxxxx' 错误，解决办法是右击library project，选择Build Path->Configure Build Path->Order and Export->Select All将所有包都选上