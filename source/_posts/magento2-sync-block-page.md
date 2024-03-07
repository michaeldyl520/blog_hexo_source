---
title: Magento 同步生产数据的一些问题
date: 2024-03-07 15:14:29
tags:
 - Magento2
 - cms_page
 - cms_block
---
# 1.同步生产站点的静态内容数据
例如首页幻灯片，contact-us页面内容等,需要同步的表如下
```
cms_block
cms_block_store
cms_page
cms_page_store
sequence_block
sequence_page
staging_update
flag //其中的staging的值必须在staging_update中存在
```
