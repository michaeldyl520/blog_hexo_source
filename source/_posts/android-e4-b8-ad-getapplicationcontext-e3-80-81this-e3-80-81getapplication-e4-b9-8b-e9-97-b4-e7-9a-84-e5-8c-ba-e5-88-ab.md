---
title: Android 中 getApplicationContext()、this、getApplication()之间的区别
tags:
  - android
  - getApplication
  - getApplicationContext
  - 安卓
url: 219.html
id: 219
categories:
  - android
  - 安卓问题集锦
date: 2014-10-31 11:14:39
---

1\. getApplicationContext():生命周期是整个应用，应用摧毁，它才摧毁。 2. this:代表当前,在Activity当中就是代表当前的Activity，换句话说就是Activity.this在Activity当中可以缩写为this. 3. getApplication():andorid 开发中共享全局数据; 我们在平时的开发中，有时候可能会需要一些全局数据，来让应用中得所有Activity和View都能访问到，大家在遇到这种情况时，可能首先会想到自己定义一个类，然后创建很多静态成员，不过andorid已经为我们提供了这种情况的解决方案：在Android中，有一个名为Application的类，我们可以在Activity中使用getApplication()，方法来获得，它是代表我们的应用程序的类，使用它可以获得当前应用的主题，资源文件中的内容等，这个类更灵活的一个特性就是可以被我们继承，来添加我们自己的全局属性。