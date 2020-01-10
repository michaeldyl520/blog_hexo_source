---
title: nginx-ssl
date: 2020-01-10 10:45:28
tags:
 - nginx
 - ssl
categorys: 
 - nginx
---
# Nginx https 证书自己生成(debian系系统为例)
## 1.切换到/etc/nginx 目录下执行
```shell
sudo openssl req -new -x509 -nodes -out server.crt -keyout server.key
```
## 2.配置站点nginx(/etc/nginx/sites-enabled/test)
```
upstream php5.6-fpm {
    server unix:/var/run/php/php5.6-fpm.sock;
}
server {
	listen 443 ssl;
	listen [::]:443 ssl;

	server_name www.test.local;

    ssl on;

    ssl_certificate     /etc/nginx/server.crt;
    ssl_certificate_key /etc/nginx/server.key;
    
    ssl_session_cache    shared:SSL:1m;


	root /home/dyl/website/test;
	
    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }
    index index.php index.html;

    location ~ \.php$ {
            # 设置php-fpm
            fastcgi_pass   php5.6-fpm;
            # 设置nginx的默认首页文件(上面已经设置过了，可以删除)
            fastcgi_index  index.php;
            # 设置脚本文件请求的路径
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            # 引入fastcgi的配置文件
            include        fastcgi_params;
        }


	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	location ~ /\.ht {
		deny all;
	}
}

```
## 3.重启nginx服务
```shell
sudo systemctl restart nginx
```