---
title: elasticsearch-tips
date: 2019-03-25 10:14:24
tags: elasticsearch
categories:
 - magento2
 - elasticsearch
---
### Tips
```shell
#show elasticsearch database
curl localhost:9200/_cat/indices?v
#delete elasticsearch database
curl -XDELETE localhost:9200/xxxxxxx?pretty
#set limit variable
curl -XPUT localhost:9200/_template/template_name -d '{"template": "*", "order": 0, "settings": {"index": {"mapping": {"total_fields": {"limit": 10000}}}}, "version": 1}'
#show use percent of elasticsearch
curl http://localhost:9200/_nodes/stats?pretty&human -s |grep heap_used
```
