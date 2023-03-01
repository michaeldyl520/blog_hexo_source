---
title: postman自动为当前envirionment设置token
date: 2023-03-01 15:36:39
tags:
 - postman
 - token
---
# 自动设置token
为了简化操作，有时候需要`postman`在请求接口后自动设置`token`，方法如下
打开`postman`，在一个请求下面点击`Tests`，输入以下代码
```javascript
var responseData = responseBody;
pm.environment.set("token", responseData.replace(/\"/g,''));
```