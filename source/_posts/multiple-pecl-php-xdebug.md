---
title: debian系统多版本PHP安装多版本xdebug
date: 2021-02-09 16:12:43
tags:
---
多版本PHP共存的Debian系统中，特定版本的xdebug支持特定PHP版本，所以需要安装不同的版本的xdebug

前提条件： Debian系统 已安装php7.3-dev php7.4-dev
```shell
#设定默认php环境变量为7.3
sudo update-alternatives --set php /usr/bin/php7.3
sudo update-alternatives --set phpize /usr/bin/phpize7.3
sudo update-alternatives --set php-config /usr/bin/php-config7.3
#安装xdebug 2.9.8
sudo pecl -d php_suffix=7.3 install http://pecl.php.net/get/xdebug-2.9.8.tgz
sudo pecl uninstall xdebug

#设定默认php环境变量为7.4
sudo update-alternatives --set php /usr/bin/php7.4
sudo update-alternatives --set phpize /usr/bin/phpize7.4
sudo update-alternatives --set php-config /usr/bin/php-config7.4
#安装xdebug 3.0.2
sudo proxychains pecl -d php_suffix=7.4 install http://pecl.php.net/get/xdebug-3.0.2.tgz
sudo pecl uninstall xdebug
```