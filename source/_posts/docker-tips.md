---
title: docker使用小技巧
date: 2024-08-02 10:13:03
tags:
 - docker
categorys: 
 - Docker
---
如果 `docker ps -a` 中太多，一次性删除方法
```shell
docker rm `docker ps -a -q --filter 'status=exited'`
```

# debian apparmor linux内核安全模块影响docker运行，本地操作系统可以直接移除此包
```shell
sudo apt-get purge apparmor
```

docker使用代理获取镜像
# 某些原因docker被封禁，使用以下方法可以绕过
```
修改 daemon.json 文件

sudo vi /etc/docker/daemon.json
添加如下内容，使用官方镜像

{
 "registry-mirrors": [
    "https://hub.docker.com/"]
}

新建 proxy.conf 文件

mkdir -p /etc/systemd/system/docker.service.d
cd /etc/systemd/system/docker.service.d
touch proxy.conf
sudi vi /etc/systemd/system/docker.service.d/proxy.conf
添加如下内容：

[Service]
Environment="HTTP_PROXY=http://127.0.0.1:8889"
Environment="HTTPS_PROXY=http://127.0.0.1:8889"
重启 docker 服务

#加载变更的配置
systemctl daemon-reload
#重启docker服务
systemctl restart docker
查看配置是否生效

systemctl show --property=Environment docker
```