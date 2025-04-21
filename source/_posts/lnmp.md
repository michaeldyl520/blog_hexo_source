---
title: 源码安装lnmp
tags:
  - centos
  - lnmp
url: 323.html
id: 323
categories:
  - LAMP技术中心
date: 2025-04-20 11:16:25
---

1.nginx [http://nginx.org/en/docs/configure.html](http://nginx.org/en/docs/configure.html)

```
sudo apt update
sudo apt-get install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev libgd-dev libxml2 libxml2-dev uuid-dev

cd ~
wget https://nginx.org/download/nginx-1.26.3.tar.gz
tar -zxvf nginx-1.26.3.tar.gz
cd nginx-1.26.3
./configure --prefix=/var/www/html --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --with-pcre  --lock-path=/var/lock/nginx.lock --pid-path=/var/run/nginx.pid --with-http_ssl_module --with-http_image_filter_module=dynamic --modules-path=/etc/nginx/modules --with-http_v2_module --with-stream=dynamic --with-http_addition_module --with-http_mp4_module
sudo make -j 4
sudo make install
nginx -V
```
安装nginx service
```
sudo deepin-editor /lib/systemd/system/nginx.service
```
粘贴以下代码并保存
```
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/var/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```
开启自启动
```
sudo systemctl enable nginx
```

2.php [http://php.net/manual/en/install.unix.nginx.php](http://php.net/manual/en/install.unix.nginx.php)

3.cmake [http://www.cmake.org/download/](http://www.cmake.org/download/)

4.mysql

/lnmp/cmake/bin/cmake \
-DCMAKE\_INSTALL\_PREFIX=/lnmp/mysql \
-DMYSQL_DATADIR=/lnmp/mysql/data \
-DSYSCONFDIR=/lnmp/mysql/etc \
-DWITH\_MYISAM\_STORAGE_ENGINE=1 \
-DWITH\_INNOBASE\_STORAGE_ENGINE=1 \
-DWITH\_MEMORY\_STORAGE_ENGINE=1 \
-DWITH_READLINE=1 \
-DMYSQL\_UNIX\_ADDR=/lnmp/mysql/mysql.sock \
-DMYSQL\_TCP\_PORT=3306 \
-DENABLED\_LOCAL\_INFILE=1 \
-DWITH\_PARTITION\_STORAGE_ENGINE=1 \
-DEXTRA_CHARSETS=all \
-DDEFAULT_CHARSET=utf8 \
-DDEFAULT\_COLLATION=utf8\_general_ci

make && make install

yum -y install ncurses-devel

新安装的mysql如果需要密码，查看cat /root/.mysql_secret中即为mysql的默认root密码

进入后set password="123456";

安装完成后需要添加php扩展，先cd到php安装源文件ext/gd(以安装gd为例)

/php路径/bin/phpize 生成configure文件

./configure --with-php-config=/php路径/bin/php-config

php查看安装的模块php -m

加入环境变量例子(环境变量地址：/etc/profile)

PATH=/lnmp/mysql/bin:$PATH

export PATH

source /etc/profile