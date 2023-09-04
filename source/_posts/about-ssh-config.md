---
title: ssh 配置不同key对应不同的git仓库
date: 2019-08-19 10:11:03
tags:
 - ssh
 - git
categories:
 - ssh
 - git
---
# 需求
我们有很多仓库账号，每个仓库的登录用户又不同，这个时候就需要使用多个ssh keys配置不同的仓库，否则将会出现权限问题
# 步骤
1.首先生成`ssh key`，参见[生成ssk key](https://help.github.com/articles/generating-an-ssh-key/).
2.配置`config`(~/.ssh/config)
```
Host            git.us.magento.cloud
    Hostname        git.us.magento.cloud
    IdentityFile    ~/.ssh/id_rsa_mage_cloud
    IdentitiesOnly yes
Host            michaeldyl520.github.com
    Hostname        ssh.github.com
    IdentityFile    ~/.ssh/id_rsa_michaeldyl520
    IdentitiesOnly yes
    User git
```
>如果都是使用github，建议别名项目仓库Host避免冲突，例如`git@michaeldyl520.github.com:xxxx/xxxx.git`