---
title: 探讨PHP函数ip2long转换IP时数值太大产生负数的解决方法
tags:
  - ip2long
  - PHP
url: 380.html
id: 380
categories:
  - PHP
date: 2015-08-11 09:58:56
---

本篇文章是对PHP函数ip2long转换IP时数值太大产生负数的解决方法进行了详细的分析介绍，需要的朋友参考下 【造成原因】：Because PHP's integer type is signed, and many IP addresses will result in negative integers. 【解决办法】：其官方手册中提到，可以“you need to use the "%u" formatter of sprintf() or printf() to get the string representation of the unsigned IP address” 即，printf( '%u',ip2long('IP地址' ) ); 或者将其先转换为二进制然后在转换为十进制，bindec(decbinip2long( 'IP地址' ) ) ); 【测试】

    $strIp = '182.118.0.0';
    echo ip2long($strIp); //此时输出的-1233780736
    echo 'br/';
    echo bindec( decbin( ip2long( $strIp ) ) ); // 输出3061186560，与MySQL函数输出一致~
    

【注】： number bindec ( string $binary_string ); //二进制转换为十进制 string decbin ( int $number ); //十进制转换为二进制