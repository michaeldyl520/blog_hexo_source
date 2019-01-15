---
title: 玩玩负载均衡---在window与linux下配置nginx
tags:
  - 负载均衡
url: 356.html
id: 356
categories:
  - nginx
date: 2015-08-11 09:49:21
---

最近有些时间，开始接触负载均衡方面的东西，从硬件F5再到Citrix Netscalar。不过因为硬件的配置虽然不复杂，但昂贵的价格也让一般用户望而却步(十几万到几十万)，所以只能转向[nginx](http://nginx.net/),squid这类有反向代理功能的软件了。好在其设置都不是很麻烦。 本文就之前所做过的安装和配置步骤做一下总结分享出来，以免日后忘记了。 首先是windows系统，这里建议使用window 2003企业版，而不要作用win7（太新了，我遇到无法启动nginx的问题）。要说的是，在windows下配置安装nginx还是很容易的，少了linux下下载tar再配置编译参数等等步骤，我们只要从下面的地址下载相应的zip包(大约750kb)即可，地址如下： [http://sysoev.ru/nginx/nginx-0.8.21.zip](http://sysoev.ru/nginx/nginx-0.8.21.zip)       需要说明的是这个下载包是nginx 0.8.21开发版，换句话说其只能用于搭建测试环境等用途的，不能用于实际的生产环境（受限于windows文件句柄数限制）。 下载并将该包中的文件解压到c盘上，为了配置使用方便，我将其解压后的文件夹名称从“nginx-0.8.19”改为"nginx”，这样我们只要将要负载均衡的站点在iis中设置好之后，将相应的链接地址放到nginx的相应配置文件中即可，这里我们打开C:\\nginx\\conf\\nginx.conf文件，将下面的内容放到该文件的“server { ”上方行处：

upstream  mylocalsite { server   10.0.2.137:8088; server   10.0.2.137:8089; }

  因为nginx无法运行动态脚本，所以这里要使用proxy_pass属性进行代理，所以找到该配置文件的如下内容：

location / { root   html; index  index.html index.htm; }

  修改其内容如下：  

location / { proxy\_pass http://mylocalsite; #proxy\_set\_header   Host             $host; #proxy\_set\_header   X-Real-IP        $remote\_addr;  ;#防止ajax安全请求问题 #proxy\_set\_header   REMOTE-HOST        $remote_addr; ;#防止ajax安全请求问题 }

  修改完之后，还要修改一下server的侦听端口，原内容如下：

server { listen       80; server_name  localhost; ……

  修改完后的内容如下：

 server { listen       8086; server_name  10.0.2.136; ……

  这样,nginx就会在启动之后开始侦听本地IP（10.0.2.136）的8086端口请求，然后将其请求转向到**mylocalsite** 中所指定的两个iis站点，并将执行的结果转发给客户端。如果一切配置正确，这时可以运行 c:/nginx/nginx.exe （或在cmd下运行“start nginx”），就可以在任务管理器中看到一个nginx进程启动了。（注:如果配置文件有错误，可以到C:\\nginx\\logs\\error.log查看错误日志，进一步排错）。 注： 关闭ngnix的命令： **nginx -s stop** 配置文件ngnix.conf正确性判断的命令: **nginx -t **   当然**Nginx 负载均衡**的功能也是很强的，并且其一般作为七层负载均衡（应用协议层）。下面就其upstream所支持的四个常用设置进行说明：

![复制代码](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/6cf311f22a2c49a3935c5e093260d0a3/copycode.gif)

1)、轮询（默认）：每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。 2)、weight ：指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。 2)、ip\_hash ：每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。 3)、fair（第三方）：按后端服务器的响应时间来分配请求，响应时间短的优先分配。 4)、url\_hash（第三方）

![复制代码](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/6cf311f22a2c49a3935c5e093260d0a3/copycode.gif)

  按上面的说明，可以将之前我们的upstream做如下修改：  

upstream  mylocalsite { #ip_hash; server   10.0.2.137:8088 weight=2; server   10.0.2.137:8089 weight=1; }

  这个当来了三个http请求时，其中的两个会被分配到10.0.2.137:8088 上，一个分配到10.0.2.137:8089 。当然一开始可以其分摊的请求可以不是太严格按其设置，但当请求数多了之后，基本上就接近于我们分指派的权值了。当然就负载均衡的算法而言，使用weight只是其中的一种，而经常使用的还有许多，比如lvs就在其内部实现了[多种的负载均衡算法](http://id-phatman.spaces.live.com/blog/cns%21CA763CA8DB2378D1%21627.entry?sa=467434071)，可以根据用户的实际环境进行设置布署。。当然就目前而言，nginx的算法相比较还是少了许多，呵呵。 可以说在windows下安装配置还是很方便的，但如果使用loadrunner做并发测试时，就会发现其logs/error.log就会报如下错误： maximum number of descriptors supported by select() is 1024 while connecting to upstream 我曾经在网上查过解决方案，包括修改配置文件的worker_connections ，如下:

 worker\_rlimit\_nofile 20240; events { #use epoll;//linux下使用 worker_connections  20240; }

  但依旧不能将文件句柄数扩充到20240，还是报1024最大句柄数错误。最后实在没办法了，只得开始尝试在linux下安装配置nginx。也就引发了下面的内容。 其实在网上有关介绍如何在linux下安装nginx的要比windows下的要多得多，必定这是‘本家’吧。 因为之前网管只在虚拟机上安装了CentOS5，所以只能就尝试在该linux分支版本下安装了。好在虚拟机已安装完了，剩下的工作并不太多。 首先需要以root身份登陆系统，然后切换身份为**超级管理员：**

 sudo -s          # 先成为超级管理员

  然后进入到src目前下，并在当前目录下download nginx.tar.gz包

    cd /usr/src      # 将文件下载到这个目录 wget http://sysoev.ru/nginx/nginx-0.7.62.tar.gz# 下载安装包 tar xzvf nginx-0.7.62.tar.gz   #解压

  如果下载的nginx 中默认可能没有 rewirte规则，因此需要下载pcre包的扩展来实现这个功能：

      wget [http://blog.s135.com/soft/linux/nginx_php/pcre/pcre-7.8.tar.gz](http://blog.s135.com/soft/linux/nginx_php/pcre/pcre-7.8.tar.gz)    # 下载pcre tar xzvf pcre-7.8.tar.gz                   # 解压pcre

  下面编译安装pcre

 cd /usr/src/pcre-7.8; ./configure --prefix=/usr/local/pcre --enable-utf8 --enable-unicode-properties

  下面编译安装nginx

 cd /usr/src/nginx-0.7.62

  开始配置要编译的参数（注：内容较长，容易输错。具体参数设置参见[http://wiki.codemongers.com/NginxChsInstall](http://wiki.codemongers.com/NginxChsInstall)）   ./configure --prefix=/usr/local/nginx  --sbin-path=/usr/local/nginx/sbin/nginx  --conf-path=/usr/local/nginx/conf/nginx.conf --error-log-path=/usr/local/nginx/logs/error.log --http-log-path=/usr/local/nginx/logs/access.log --pid-path=/usr/local/nginx/var/nginx.pid --lock-path=/usr/local/nginx/var/nginx.lock --http-client-body-temp-path=/dev/shm/nginx\_temp/client\_body --http-proxy-temp-path=/dev/shm/nginx\_temp/proxy --without-http\_rewrite\_module --without-http-cache  --without-http\_map\_module --without-http\_gzip_module ＃使用debuginfo 信息--_with-debug_＃ 接下来就开始编译生成相应的文件了：

   make make install

  然后/dev/shm 也就是内存中，建立一个nginx_temp文件夹

   mkdir /dev/shm/nginx_temp

  接着创建www用户和组，以及其使用的目录：

   /usr/sbin/groupadd www -g 48 /usr/sbin/useradd -u 48 -g www www mkdir -p /data0/vshare/htdocs chmod +w /data0/vshare/htdocs chown -R www:www /data0/vshare/htdocs

  这时可以扩充一下文件句柄数（windows下就没这么容易扩展了，哎）

 ulimit -SHn 51200 #设置打开文件句柄

  到这里，我们就可以使用linux下的vi编辑器编辑一下：

   cd /usr/src/nginx-0.7.62/conf/ vi nginx.conf

  将之前在window下的修改内容替换(按下insert键进入到编辑模式)到当前的文件中，当修改完成了，按冒号（":"）切换到命令模式下，然后敲入“wq”，保存并退出。(强制退出（不保存）的话，输入q!，然后回车) 注：

events { use epoll; worker_connections  20240; }

注：use epoll; //linux下使用,更多内容参见[NginxChsOptimizations](http://wiki.nginx.org/NginxChsOptimizations) 这样就可以运行nginx了：

 /usr/local/nginx/sbin/nginx -t –c

创建个软链接： $ sudo ln -s /user/local/nginx/sbin/nginx  /usr/bin/nginx #之前安过的话要先删除sudo rm  /usr/bin/nginx 启动完成后，可以通过如下指令查看其在内存中的运行信息： **\# ps aux | egrep '(PID|nginx)'** [![nginx_config1](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/fcf21d67a5414a3196dce407409a2fee/onfig1_thumb.gif "nginx_config1")](http://images.cnblogs.com/cnblogs_com/daizhj/WindowsLiveWriter/windowlinuxnginx_A335/nginx_config1_2.gif)   这样当我们再使用loadrunner运行时，就可以看到error.log中就不再报那个恼人的“1024错误了”。 当然在nginx中，还支持文件缓存，以便于将那些静态文件缓存到本地的nginx服务器上，只不过要修改一下其config文件配置，如下： **vi nginx.conf** 在文件中的相应节点处输入如下内容:

![复制代码](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/6cf311f22a2c49a3935c5e093260d0a3/copycode.gif)

location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf|js|html|htm|css)$ {        #指定缓存文件类型 expires 7d;      #设置浏览器过期时间7天 root data/nginx\_cache/iis;          #静态文件根目录目录(必须对应proxy\_temp\_path) proxy\_store on;        #开启缓存机制 proxy\_store\_access user:rw group:rw all:rw;       #缓存读写规则 proxy\_temp\_path data/nginx\_cache/iis;            #存放静态文件的缓存目录 #    include proxy.conf;          # 外联proxy理的详细配置如proxy\_set\_header， client\_max\_body\_size ![](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/a60b929bb5fd45f2a1bac4de1ace414c/dot.gif). if (!-e $request\_filename) { proxy\_pass http://10.0.2.136;/ } }

![复制代码](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/6cf311f22a2c49a3935c5e093260d0a3/copycode.gif)

  这样就会在data/nginx_cache/iis目前下生成相应的gif,jpg等文件的临时信息，当客户端请求到来时，就会从该目录中检索相应文件绑定之后返回给客户端，以减轻iis服务器和网络带宽的压力。 最后附上一个我在那台Centos上的配置文件，大家可以对比参照一下，因为nginx本身提供的配置结点信息过多，更多信息可以参见[这篇文章](http://www.bordf.com.cn/220)。 相关链接如下： 张宴 [搭建胜过Apache十倍的Web服务器（第5版）\[原创\]](http://blog.s135.com/nginx_php_v5/) 守住每一天（网名）       [nginx反向代理配置及优化](http://liuyu.blog.51cto.com/183345/166381)   原文链接: [http://www.cnblogs.com/daizhj/archive/2009/11/03/1595292.html](http://www.cnblogs.com/daizhj/archive/2009/11/03/1595292.html "view: 玩玩负载均衡---在window与linux下配置nginx") 作者: daizhj, 代震军 Tags: nginx,负载均衡 网址: [http://daizhj.cnblogs.com/](http://daizhj.cnblogs.com/)