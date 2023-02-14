---
title: ssd-tips
date: 2023-02-14 10:13:06
tags:
 - ssd
 - linux
---
在debian查看SSD寿命
1. 查看`Wear_Leveling_Count`和`SSD_Life_Left`
```
sudo smartctl -a /dev/sdb
```
不同的SSD使用`smartctl`展示不同

`wear leveling count`是 磨损均衡计数（WLC）的意思，当前值代表的剩余耐力，以百分比表示，意味着它从100开始减少。

`SSD_Life_Left`代表着SSD的生命周期还剩下多少

2. 查看 ```Percentage Used Endurance Indicator```
```
sudo smartctl -l devstat /dev/sdb
```
最重要和直观`Percentage Used Endurance Indicator`，单位是百分比，新的是`0%`