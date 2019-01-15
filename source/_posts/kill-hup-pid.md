---
title: kill -HUP pid
tags:
  - kill
url: 346.html
id: 346
categories:
  - CentOS
date: 2015-08-11 09:45:42
---

kill -HUP pid pid 是进程标识。**如果想要更改配置而不需停止并重新启动服务，请使用该命令。在对配置文件作必要的更改后，发出该命令以动态更新服务配置。** 根据约定，当您发送一个挂起信号（信号 1 或 HUP）时，大多数服务器进程（所有常用的进程）都会进行复位操作并重新加载它们的配置文件。清单 2 显示了向所有正在运行的 Web 服务器进程发送挂起信号的一种方法。 清单 2. 告诉 Web 服务器重新加载其配置文件并对文件进行复位操作 root@holy \[507\]$ ps -A | grep httpd | grep -v grep | awk '{ print $1; }' | xargs -L 1 sudo kill -HUP 上面的命令中包含了很多的操作，所以让我们来仔细地看一下管道的每个部分。ps 和 grep 命令用来在所有的进程中搜索 httpd（并且忽略用来搜索 httpd 进程的 grep 进程）。接下来，awk 只显示输出结果中的进程 ID，并将它传递给 xargs。然后，xargs 命令接受每个进程 ID（因为使用了 -L 1 以便一次提取一行内容），并使用 sudo kill -HUP 向相应的进程发送一个挂起信号。 LINUX和Unix都适用： 改/etc/ssh/sshd_config，将里面的Port改为新端口，比如10022，然后 kill -HUP \`cat /var/run/sshd.pid\` 就行了。 现有连接自己不会断，因为kill -HUP \`cat /var/run/sshd.pid\` 只是HUP监听的那个，已经建立的连接（不同的 pid）不会断。 然后你在现有账号下面exit，在用新的端口登陆就可以了。 **PS:** HUP(1)是让进程挂起，睡眠; kill (9)六亲不认的杀掉 term(15)正常的退出进程 因为进程可能屏蔽某些信号，所以它们的用处也就不一样。。。