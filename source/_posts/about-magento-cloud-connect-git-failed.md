---
tags:
title: 关于magento-cloud新项目无法pull代码的问题
date: 2018-06-06 14:13:49
categories:
 - magento2
 - magento-cloud
tags:
 - magento2
 - magento-cloud
---
## 问题
magento-cloud新项目添加magento-cloud ssh-key:add后仍然无法pull代码，
## 处理
解决方法如下：

1.需要配置`~/.ssh/config`文件，例如：

`gedit ~/.ssh/config`,

拷贝以下到`~/.ssh/config`中
```config
Host git.us-3.magento.cloud
    Hostname    git.us-3.magento.cloud
    User        tajmoznp6wqkq
    IdentityFile        /home/dyl/.ssh/id_rsa.2
```
2.获取公钥写入到`~/.ssh/known_hosts`中，终端执行以下命令：
```known_hosts
ssh-keyscan -H git.us-3.magento.cloud >> ~/.ssh/known_hosts
```