---
title: >-
  Lamp环境下编写PHP代码时出现错误：Warning: Unknown: failed to open stream: Permission denied
  i
tags:
  - LAMP
  - PHP
url: 286.html
id: 286
categories:
  - PHP
date: 2015-03-30 10:55:23
---

Lamp环境下编写PHP代码时出现错误：Warning: Unknown: failed to open stream: Permission denied in Unknown on line 0 Fatal error: Unknown: Failed opening required 'X' (include_path='X') in Unknown on line 时的解决办法。 在出现此问题时，是文件权限出了问题，可以通过以下两中方法进行解决： 一、在图形界面直接更改权限 右键点击文件选择权限，然后直接更改，如图： [![1](http://www.jiliuke.com/wp-content/uploads/2015/03/1-271x300.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/1.png) 更改完权限之后为： [![2](http://www.jiliuke.com/wp-content/uploads/2015/03/2-272x300.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/2.png) 更改完之后就应该为什么问题了。 二、通过命令行直接进行权限的更改 直接将文件的权限更改为777 例如：文件为a.php 则进入所在的文件夹，通过命令chmod 777 a.php 更改权限。 具体777是什么意思，大家看看书或上网搜一下，在这里就不再赘述啦！