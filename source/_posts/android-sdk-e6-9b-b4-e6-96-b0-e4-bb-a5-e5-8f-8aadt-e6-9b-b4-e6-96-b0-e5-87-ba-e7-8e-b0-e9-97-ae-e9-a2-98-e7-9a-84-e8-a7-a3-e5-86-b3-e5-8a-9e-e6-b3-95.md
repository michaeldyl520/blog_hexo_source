---
title: Android SDK更新以及ADT更新出现问题的解决办法
tags:
  - ADT
  - Android SDK
url: 296.html
id: 296
categories:
  - 安卓问题集锦
date: 2015-03-30 11:05:15
---

使用SDK Manager更新时出现问题Failed to fetch URL https://dl-ssl.google.com/android/repository/repository-6.xml, reason: Connection to https://dl-ssl.google.com refusedFailed to fetch URL http://dl-ssl.google.com/android/repository/addons\_list-1.xml, reason: Connection to http://dl-ssl.google.com refusedFailed to fetch URL https://dl-ssl.google.com/android/repository/addons\_list-1.xml, reason: hostname in certificate didn't match: <dl-ssl.google.com> != <www.google.com>更新ADT时无法解析https://dl-ssl.google.com/android/eclipse

[![Android SDK更新以及ADT更新出现问题的解决办法](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/79312f33971647b381a2ae311045ef37/9245d78821dd.png)](http://jingyan.baidu.com/album/148a192196209d4d70c3b168.html?picindex=1)[![3](http://www.jiliuke.com/wp-content/uploads/2015/03/3.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/3.png)

方法/步骤
-----

1.  大家肯定很急，我就不废话了，直接上解决办法了！ 打开SDK Manager下Tools->Options，选中“Force https://… sources to be fetched using http://…”，强制使用http协议。
    
    [![Android SDK更新以及ADT更新出现问题的解决办法](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/863a9ce28c9246c9839f70746eeec9b9/42a7d8330e9c.png)](http://jingyan.baidu.com/album/148a192196209d4d70c3b168.html?picindex=2)[![4](http://www.jiliuke.com/wp-content/uploads/2015/03/4.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/4.png)[![5](http://www.jiliuke.com/wp-content/uploads/2015/03/5.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/5.png)
    
2.  上一步选取之后，有的用户可以更新出列表来。如果还是不能，继续下面的操作。 在地址栏里输入：C:\\WINDOWS\\system32\\drivers\\etc
    
    [![Android SDK更新以及ADT更新出现问题的解决办法](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/e31caa6448914b11847ae40958cef736/d158cdbf4ebb.png)](http://jingyan.baidu.com/album/148a192196209d4d70c3b168.html?picindex=4)[![6](http://www.jiliuke.com/wp-content/uploads/2015/03/6.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/6.png)
    
3.  我们会看到hosts文件，右击打开方式选择记事本。在里面把下面文字复制进去，内容如下（_**特别强调：是在原本的内容后面粘贴下面的内容，而不是覆盖**_）： #Google主页 203.208.46.146 www.google.com #这行是为了方便打开Android开发官网 现在好像不VPN也可以打开 74.125.113.121 developer.android.com #更新的内容从以下地址下载 203.208.46.146 dl.google.com 203.208.46.146 dl-ssl.google.com
    
    [![Android SDK更新以及ADT更新出现问题的解决办法](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/1bcd78e4df9f4a06a79aeff0a6785119/81cb38db3d42.png)](http://jingyan.baidu.com/album/148a192196209d4d70c3b168.html?picindex=5)[![7](http://www.jiliuke.com/wp-content/uploads/2015/03/7.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/7.png)
    
4.  有的用户接着就会看到加载出列表了。如果没有变化，重新打开SDK Manager。就会发现问题解决了。如图1 如果还是无法加载出列表，还是出现如图2红色内容，建议过几天再试试！
    
    [![Android SDK更新以及ADT更新出现问题的解决办法](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/a573d2ab12344a6a9f30e7fb055a8121/d42a2934a449.png)](http://jingyan.baidu.com/album/148a192196209d4d70c3b168.html?picindex=6)[![8](http://www.jiliuke.com/wp-content/uploads/2015/03/8.png)](http://www.jiliuke.com/wp-content/uploads/2015/03/8.png)
    
    [![Android SDK更新以及ADT更新出现问题的解决办法](file:///C:/Users/yunlong/AppData/Local/YNote/data/qqAB881ABE4AEE31C2A6CFF94728E8E5E9/01bf322253c94506b8452718248233e1/62309f7d3ca.jpeg)](http://jingyan.baidu.com/album/148a192196209d4d70c3b168.html?picindex=7)[![9](http://www.jiliuke.com/wp-content/uploads/2015/03/9.jpeg)](http://www.jiliuke.com/wp-content/uploads/2015/03/9.jpeg)
    
5.  5
    
    更新ADT插件的时候则使用网址http://dl-ssl.google.com/android/eclipse，而不是https://dl-ssl.google.com/android/eclipse，这个在官方开发文档里也有介绍。