---
title: composer tips
date: 2023-10-09 13:22:34
tags:
 - composer
 - composer repositories
---
# Composer 小技巧
## 1. 自定义安装包的方法
adobe 官方已不支持stripe-payment 3.2.8,需要用composer 自定义的方式安装包
composer配置方法
```
{
    ......
    "repositories": {
        "0":{
            "type": "composer",
            "url": "https://repo.magento.com/"
        },
        "1": {
            "type": "package",
            "package": {
                "name": "stripe/module-payments",
                "version": "3.2.8",
                "dist": {
                    "url": "https://github.com/stripe/stripe-magento2-releases/raw/master/stripe-magento2-3.2.8.tgz",
                    "type": "tar"
                },
                "autoload":{
                    "files": [
                        "code/StripeIntegration/Payments/registration.php"
                    ],
                    "psr-4": {
                        "StripeIntegration\\Payments\\": "code/StripeIntegration/Payments/"
                    }
                }
            }
        }
    },
    ......
}
```
然后终端中在项目目录下使用 `composer require stripe/module-payments:3.2.8` 安装。

## 2.自定义文件夹方式安装的方法
composer 配置方法
```
{
    ......
    "repositories": {
        "0":{
            "type": "composer",
            "url": "https://repo.magento.com/"
        },
        "1": {
            "type": "path",
            "url": "app/vendor/*/*",
            "options": {
                "symlink": true
            }
        }
    },
    ......
}
```