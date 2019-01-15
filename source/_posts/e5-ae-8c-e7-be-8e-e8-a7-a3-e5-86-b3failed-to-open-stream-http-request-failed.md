---
title: '完美解决failed to open stream: HTTP request failed!'
url: 103.html
id: 103
categories:
  - PHP
date: 2014-04-14 09:20:51
tags:
---

当使用php5自带的file\_get\_contents方法来获取远程文件的时候，有时候会出现file\_get\_contents(): failed to open stream: HTTP request failed!这个警告信息。 google或者baidu一下，好多这样的问题，解决的方法都是修改php.ini，把allow\_url\_fopen给启用，改成 allow\_url\_fopen = On 这样做可以解决某些人的问题，有人说在php.ini中，有这样两个选项:allow\_url\_fopen =on(表示可以通过url打开远程文件)，user\_agent="PHP"（表示通过哪种脚本访问网络，默认前面有个 " ; " 去掉即可。）重启服务器。 但是有些还是会有这个警告信息，想用完美的解决还差一步，还得设置php.ini里面的user\_agent，php默认的user\_agent是PHP，我们把它改成Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)来模拟浏览器就可以了 user\_agent=”Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)” 在工作中遇到这个问题，后完美解决，故分享给大家。 我批量抓取chemblink的结构式发现循环后有部分图片无法显示，而远程文件是存在的。 抓取远程文件的时候出现类似Warning: readfile(http://www.php100.com/logo.gif) \[function.readfile\]: failed to open stream: HTTP request failed! 这样的警告信息，我使用的是 ob\_start(); readfile("http://www.php100.com/logo.gif"); $img = ob\_get\_contents(); ob\_end\_clean(); 这样在运行中会时不时的出现上述错误，我也换过file\_get\_contents等其他函数都没用用，在网上查阅后发现用CURL方法抓取不会出错 $url = "http://www.php100.com/logo.gif"; $ch = curl\_init(); curl\_setopt ($ch, CURLOPT\_URL, $url); curl\_setopt ($ch, CURLOPT\_RETURNTRANSFER, 1); curl\_setopt ($ch, CURLOPT\_CONNECTTIMEOUT,10); $img = curl_exec($ch);