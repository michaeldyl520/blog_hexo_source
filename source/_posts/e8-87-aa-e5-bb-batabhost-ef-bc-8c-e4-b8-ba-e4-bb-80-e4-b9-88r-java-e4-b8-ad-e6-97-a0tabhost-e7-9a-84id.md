---
title: '自建TabHost，为什么R.java中无tabhost的id '
tags:
  - android
  - TabHost
  - 安卓
url: 215.html
id: 215
categories:
  - 安卓问题集锦
date: 2014-10-31 11:09:50
---

问题出在你的xml布局定义中的这一行： android:id="@android:id/tabhost" 如果是想不用android的tabhost的id，那么这行应该改为： android:id="@+id/tabhost" 如果确实要用android的定义，又要找到这个窗口，那么应该改代码中的这行： TabHost mTabHost = (TabHost)findViewById(R.id.tabhost); 应该改成 TabHost mTabHost = (TabHost)findViewById(android.R.id.tabhost);