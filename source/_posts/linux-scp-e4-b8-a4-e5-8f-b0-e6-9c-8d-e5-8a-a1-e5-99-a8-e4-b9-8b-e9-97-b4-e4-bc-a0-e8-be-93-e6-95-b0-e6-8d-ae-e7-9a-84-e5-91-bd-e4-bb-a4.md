---
title: linux scp-两台服务器之间传输数据的命令
tags:
  - centos
  - scp
url: 187.html
id: 187
categories:
  - CentOS
date: 2014-08-27 12:42:45
---

我们在管理服务器或vps的时候，经常要上传和下载数据。比如当我们需要把数据从一个服务器搬到另一个服务器的时候，通常是从第一个服务器下载数据到我们电脑，再到ftp工具上传下载好的数据到远程服务器。但这样即浪费时间，又浪费精力。我们何不先在第一台服务器打包好，就直接传输数据到另一台服务器呢？而[Linux](http://www.centos.bz/ "Linux") scp命令则刚好能实现两台服务器之间传输数据的作用。

### 什么是scp

　scp就是secure copy，是用来进行远程文件拷贝的。数据传输使用 ssh，并且和ssh 使用相同的认证方式，提供相同的安全保证 。 与rcp 不同的是，scp 在需要进行验证时会要求你输入密码或口令。

### scp的用法

**从 本地 复制到 远程** 命令基本格式： scp \[可选参数\] 本地文件名 远程用户名@远程地址:远程文件或目录 复制文件例子：

1.  scp /home/backup.zip root@www.example.com:/home/others/backup
2.  scp /home/backup.zip root@www.example.com:/home/others/otherbackup.zip

第一个是本地文件backup.zip发送到远程backup目录下。 第二个是本地文件backup.zip发送到远程otherbackup.zip文件。 复制目录例子：

1.  scp -r /home/backup root@www.example.com:/home/others/

复制本地目录backup到远程目录others **从 远程 复制到 本地** 命令基本格式： scp \[可选参数\] 远程用户名@远程地址:远程文件或目录 本地文件名 例子：

1.  scp root@www.example.com:/home/others/bakcup.zip /home/newbackup.zip
2.  scp -r root@www.example.com:/home/backup /home/other/

第一个是下载远程文件backup.zip到本地文件newbackup.zip。 第二个是下载远程目录bakcup到本地目录other。 **scp可选参数：**

参数

解释

-v

和大多数 [linux](https://www.centos.bz/tag/linux/ "linux") 命令中的 -v 意思一样 , 用来显示进度 . 可以用来查看连接 , 认证 , 或是配置错误 .

-C

使能压缩选项

-P

选择端口 . 注意 -p 已经被 rcp 使用 .

-4

强行使用 IPV4 地址 .

-6

强行使用 IPV6 地址 .