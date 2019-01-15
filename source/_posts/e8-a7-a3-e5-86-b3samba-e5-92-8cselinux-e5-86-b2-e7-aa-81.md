---
title: 解决samba和SELINUX 冲突
tags:
  - samba
  - SELINUX
url: 97.html
id: 97
categories:
  - samba
date: 2014-04-08 09:28:17
---

在使用Samba进行建立Window与Linux共享时，要是不能访问,出现“您可能没有权限使用网络资源”， 那就是SELinux在作怪了 要是想让共享目录能访问，可以使用命令 #setenforce 0 暂时停掉SELinux 使用 #setenforce 1 启用SELinux 有关SELinux 在系统中的作用就不讲了，另外一种方法可以不用关闭SELinux.以下命令将允许这个权限： setsebool -P samba\_enable\_home\_dirs=1 若SElinux啟用中，在Windows檔案總管無法連到 Samba 所分享出來的目錄時， 在Linux 中，可執行下列指令： setsebool -P samba\_enable\_home\_dirs on 參考文件： /etc/samba/smb.conf #--------------- # SELINUX NOTES: # 分享群組 # If you want to use the useradd/groupadd family of binaries please run: # setsebool -P samba\_domain\_controller on # # 分享home目錄 # If you want to share home directories via samba please run: # setsebool -P samba\_enable\_home\_dirs on # # If you create a new directory you want to share you should mark it as # "samba-share\_t" so that selinux will let you write into it. # Make sure not to do that on system directories as they may already have # been marked with othe SELinux labels. # # Use ls -ldZ /path to see which context a directory has # # Set labels only on directories you created! # To set a label use the following: chcon -t samba\_share\_t /path # # If you need to share a system created directory you can use one of the # following (read-only/read-write): # setsebool -P samba\_export\_all\_ro on # or # setsebool -P samba\_export\_all\_rw on # # If you want to run scripts (preexec/root prexec/print command/...) please # put them into the /var/lib/samba/scripts directory so that smbd will be # allowed to run them. # Make sure you COPY them and not MOVE them so that the right SELinux context # is applied, to check all is ok use restorecon -R -v /var/lib/samba/scripts # #-------------- #