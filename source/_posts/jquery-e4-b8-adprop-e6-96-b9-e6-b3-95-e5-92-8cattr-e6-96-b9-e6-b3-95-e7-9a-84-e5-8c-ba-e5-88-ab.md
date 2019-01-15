---
title: jQuery中prop()方法和attr()方法的区别
tags:
  - attr
  - jquery
  - prop
  - 区别
url: 205.html
id: 205
categories:
  - jquery
date: 2014-09-23 10:22:11
---

从jQuery 1.6开始，新加入了一个prop方法。这个方法和attr方法功能非常的相近。

以下是官网建议的使用情况：

Attribute/Property

`.attr()`

`.prop()`

accesskey

√

align

√

async

√

√

autofocus

√

√

checked

√

√

class

√

contenteditable

√

draggable

√

href

√

id

√

label

√

location ( i.e. window.location )

√

√

multiple

√

√

readOnly

√

√

rel

√

selected

√

√

src

√

tabindex

√

title

√

type

√

width ( if needed over `.width()` )

√

个人简要总结了一下：

1、赋值时候，如果是<input type="checkbox" checked>这样的只有属性名就能生效的属性

推荐prop，即：$('input').prop('checked',true);

同时，false表示取消，即：$('input').prop('checked',false);

当然attr也行的：$('input').attr('checked','这里写什么都行的');

取消属性就是移除：$('input').removeAttr('checked');

2、取值的时候，如果是<input  id="input1" type="checkbox" checked><input  id="input2" type="checkbox">

推荐使用prop，即：

$('#input1').prop('checked'); //返回true

$('#input2').prop('checked'); //返回false

而使用attr，则：

$('#input1').attr('checked'); //返回checked

$('#input2').attr('checked'); //返回undefined

3、特殊属性赋值取值

这个特殊说明下，获取很多人都用不到呢。

比如需要在input中追加一个data-tips属性。变成这样子 <input type="text" value="" data-tips="aa">

这时候只能写：$('input').attr('data-tips','aa');

使用prop是不管用的。

但是读值时候，两个都可以的：

$('input').attr('data-tips');//返回aa

$('input').prop('data-tips');//返回aa