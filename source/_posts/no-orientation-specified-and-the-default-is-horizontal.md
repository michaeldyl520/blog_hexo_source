---
title: 'No orientation specified, and the default is horizontal.'
tags:
  - horizontal
  - orientation
url: 212.html
id: 212
categories:
  - 安卓问题集锦
date: 2014-10-27 12:13:23
---

整的错误提示信息为：No orientation specified, and the default is horizontal. This is a common source of bugs when children are added dynamically. 通常发生这个错误提示的原因是我们直接在原有的页面上把别的布局标签改成<LinearLayout>，但是使用<LinearLayout>标签要指明方向，水平方向还是垂直方向 horizontal or vertical 所以直接修改，会导致没有指名线性布局的方向，只要添加上 android:orientation = "vertical" 或 android:orientation = "horizontal" 即可解决