---
title: 大批量文件删除操作
date: 2019-12-28 10:06:31
categories:
  - 运维
  - 文件操作
tags:
  - 文件删除
---
百万级文件删除使用rm删除会十分缓慢，大量删除操作需要用到rsync同步命令。
例如需要删除文件夹`/home/dyl/test/`
1. 首先新建一个空文件夹 `/tmp/test/`。
2. 然后使用以下命令删除
    ```shell
    rsync --delete-before -a -H -v /tmp/test/ /home/dyl/test/
    ```
    如果不想看到日志，参数换成`-d`.
    ```shell
    rsync --delete-before -d /tmp/test/ /home/dyl/test/
    ```