---
title: xunsearch同义词管理
tags:
  - PHP
  - xunsearch
url: 378.html
id: 378
categories:
  - xunsearch
date: 2015-08-11 09:58:09
---

Indexer.php 添加同义词

#### 添加同义词

通过带参数的选项 `--add-synonym` 来实现，参数值为单条或多条同义词记录，每条记录之间用冒号(:) 分隔原词和同义词，多条记录之间用逗号分割。您可以对同一个“原词”增加多个不同的“同义词”， 如果库内已存在完全一致的记录，则指令不起作用也不会报错。用法如下：

\# 给 search 增加同义词 find
util/Indexer.php demo --add-synonym search:find

\# 再给 search 增加另一个同义词 seek
util/Indexer.php demo --add-synonym search:seek

\# 给 "搜索" 增加 "检索" "查找" 两个同义词
util/Indexer.php demo -add-synonym 搜索:检索,搜索:查找

\# 给 "Hello world" 增加同义词 "你好"，参数含空格请用引号包围
util/Indexer.php demo --add-synonym "Hello world:你好"

#### 删除同义词

删除同义词作法和添加同义词很相似，只不过采用选项 `--del-synonym`，同时参数中的同义词可以 省略表示删除该“原词”的所有同义词记录。用法如下：

\# 删除 search 的全部同义词、同时删除 "搜索" 的同义词 "检索"
util/Indexer.php demo --del-synonym search,搜索:检索