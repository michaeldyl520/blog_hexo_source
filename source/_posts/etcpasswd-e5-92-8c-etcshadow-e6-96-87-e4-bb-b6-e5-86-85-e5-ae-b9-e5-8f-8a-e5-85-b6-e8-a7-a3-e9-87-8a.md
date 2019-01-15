---
title: /etc/passwd 和 /etc/shadow 文件内容及其解释
tags:
  - /etc/passwd
  - /etc/shadow
  - centos
url: 315.html
id: 315
categories:
  - CentOS
date: 2015-03-30 11:14:56
---

默认情况下，/etc/passwd 存储有关本地用户的信息 /etc/passwd 采用以下格式：

![/etc/passwd 和 /etc/shadow 文件内容及其解释 - 梦に者 - 梦に空間](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/2183c4c98e6a4a05986f425351227c13/62595684511.jpeg)[![1](http://www.jiliuke.com/wp-content/uploads/2015/03/1.jpeg)](http://www.jiliuke.com/wp-content/uploads/2015/03/1.jpeg)

1）username        UID到名称的一种映射，用户名 2）password         保存密码的位置，现在保存在/etc/shadow 中 3）UID                   用户ID 4）GID                  主组ID 5）GECOS            字段存储任意文本，用户注释 6）/home/dir          用户的家目录 7）shell                 用户登入后使用的shell名称 passwd文件是普通的文本文件，可以手工修改文件中的用户信息（usermod），或者最后添加新行以增加新的用户(useradd)。 如果同时2个人修改文件passwd的话，有毁坏文件的危险。建议采用vipw命令，它可以将passwd文件锁住，以防止其他人同时使用。 用户密码存储在/etc/shadow，格式为（以“：”为分割符）：

![/etc/passwd 和 /etc/shadow 文件内容及其解释 - 梦に者 - 梦に空間](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/8823916108804775aafbdaf543bbadb7/02074812306.jpeg)[![2](http://www.jiliuke.com/wp-content/uploads/2015/03/2.jpeg)](http://www.jiliuke.com/wp-content/uploads/2015/03/2.jpeg)

  1）用户名 2）加密的密码 3）上次更改密码的日期（从1970-1-1开始） 4）最短密码期限（按天计算，0 = 无最短期限） 5）最长密码期限（按天计算） 6）密码警告期限（按天计算，0 = 未指定警告） 7）密码非活动期限（按天计算） 8）账号到期时间（从1970-1-1开始） 9）保留域 /etc/shadow 由 pwconv 命令根据/etc/passwd中的数据自动产生。

![/etc/passwd 和 /etc/shadow 文件内容及其解释 - 梦に者 - 梦に空間](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/0e39096c0557460d8e00cb6f61c44469/70994828189.jpeg)[![3](http://www.jiliuke.com/wp-content/uploads/2015/03/3.jpeg)](http://www.jiliuke.com/wp-content/uploads/2015/03/3.jpeg)

**改使用者的密码 — passwd** 参数 -l 关闭账号密码。效果相当于usermod -L，只有root才有权使用此项。 -u 恢复账号密码。效果相当于usermod -U，同样只有root才有权使用。 -g 修改组密码。gpasswd的等效命令。 -f 更改由finger命令访问的用户信息。 -d 关闭使用者的密码认证功能, 使用者在登入时将可以不用输入密码, 只有具备 root 权限的使用者方可使用。 -S 显示指定使用者的密码认证种类, 只有具备 root 权限的使用者方可使用。

![/etc/passwd 和 /etc/shadow 文件内容及其解释 - 梦に者 - 梦に空間](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/7256230466304c55a776095bb385922e/94260857553.jpeg)[![4](http://www.jiliuke.com/wp-content/uploads/2015/03/4.jpeg)](http://www.jiliuke.com/wp-content/uploads/2015/03/4.jpeg)

**更改密码时效 — chage** 参数 -m 密码可更改的最小天数。为零时代表任何时候都可以更改密码。 -M 密码保持有效的最大天数。 -W 用户密码到期前，提前收到警告信息的天数。 -E 帐号到期的日期。过了这天，此帐号将不可用。 -d 上一次更改的日期。 -I（大写的i） 停滞时期。如果一个密码已过期这些天，那么此帐号将不可用。 -l 列出当前的设置。由非特权用户来确定他们的密码或帐号何时过期。

![/etc/passwd 和 /etc/shadow 文件内容及其解释 - 梦に者 - 梦に空間](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/509bbc4b30404217a8f6fcac8e599e2e/91152868811.jpeg)[![5](http://www.jiliuke.com/wp-content/uploads/2015/03/5.jpeg)](http://www.jiliuke.com/wp-content/uploads/2015/03/5.jpeg)

关于账号时间图示：

![/etc/passwd 和 /etc/shadow 文件内容及其解释 - 梦に者 - 梦に空間](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/2f191f4b6dcf4daeab6fc25e9558c8e7/49246926598.jpeg)[![6](http://www.jiliuke.com/wp-content/uploads/2015/03/6.jpeg)](http://www.jiliuke.com/wp-content/uploads/2015/03/6.jpeg)