---
title: apache使用php-fpm配置多版本
date: 2019-08-19 09:31:38
tags:
 - apache
 - php-fpm
categories:
 - lnmp
---
# 需求

有时候我们需要在同一台服务器配置多个php版本利于开发测试，我们可以直接使用他人做好的包直接安装配置，以`deepin`示例。
# 步骤
1. 首先加入多版本php源
```  shell
sudo apt-get -y install apt-transport-https lsb-release ca-certificates
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
sudo apt-get update
```
> https://packages.sury.org/php/README.txt

2. 安装`apache`和多版本`php-fpm`
``` shell
sudo apt-get install apache2 php5.6-fpm php7.0-fpm php7.1-fpm
```
3. 打开apache `headers`和`proxy_fcgi`模块
```  shell
sudo a2enmode headers proxy_fcgi
```
> `apache`和`php-fpm`建议运行用户配置成当前登录账号，避免出现权限问题

4. 配置虚拟域名
```
<VirtualHost *:80>
	ServerName m1.mycoolcell.local
         ServerAlias m1.mycoolcell.local
	ServerAdmin webmaster@localhost
	DocumentRoot /home/dyl/website/mycoolcell_m1
         SetEnv MAGE_RUN_CODE wholesale
         SetEnv MAGE_RUN_TYPE website
	<FilesMatch "\.php$">
		<If "-f %{REQUEST_FILENAME}">
		    SetHandler "proxy:unix:/run/php/php5.6-fpm.sock|fcgi://localhost/"
		</If>
	</FilesMatch>
	ErrorLog ${APACHE_LOG_DIR}/m1.mycoolcell.local.error.log
	CustomLog ${APACHE_LOG_DIR}/m1.mycoolcell.local.access.log combined
</VirtualHost>

```
> 如果需要其他版本，将上面的`php5.6-fpm.sock`配置成`php7.1-fpm.sock`即可。