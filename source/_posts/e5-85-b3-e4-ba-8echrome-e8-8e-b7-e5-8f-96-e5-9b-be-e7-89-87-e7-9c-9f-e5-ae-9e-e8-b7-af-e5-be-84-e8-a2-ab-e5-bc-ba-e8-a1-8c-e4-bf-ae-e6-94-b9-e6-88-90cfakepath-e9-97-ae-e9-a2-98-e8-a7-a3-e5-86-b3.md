---
title: '关于chrome获取图片真实路径被强行修改成c:/fakepath问题解决办法'
tags:
  - fakepath
url: 313.html
id: 313
categories:
  - javascript
date: 2015-03-30 11:11:12
---

**问题：**由于浏览器照顾用户安全，所以不暴露用户实际路径，获取图片真实路径被强行修改成c:/fakepath

**解决办法：**可以按照火狐处理类似情况的方法处理

function getFullPath(obj)

{

    if(obj)

    {

        //ie

        if (window.navigator.userAgent.indexOf("MSIE")>=1)

        {

            obj.select();

            if(window.navigator.userAgent.indexOf("MSIE") == 25){

                obj.blur();

            }

            return document.selection.createRange().text;

        }

        //firefox

        else if(window.navigator.userAgent.indexOf("Firefox")>=1)

        {

            if(obj.files)

            {

                //return obj.files.item(0).getAsDataURL();

                return window.URL.createObjectURL(obj.files.item(0));

            }

            return obj.value;

        }else{ //chrome

   return window.URL.createObjectURL(obj.files.item(0));

  }

        return obj.value;

    }

}