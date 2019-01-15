---
title: Android LayoutInflater详解
tags:
  - android
  - LayoutInflater
  - 安卓
url: 221.html
id: 221
categories:
  - 安卓问题集锦
date: 2014-10-31 11:15:33
---

在实际开发中LayoutInflater这个类还是非常有用的，它的作用类似于findViewById()。不同点是LayoutInflater是用来找res/layout/下的xml布局文件，并且实例化；而findViewById()是找xml布局文件下的具体widget控件(如Button、TextView等)。

具体作用：

1、对于一个没有被载入或者想要动态载入的界面，都需要使用LayoutInflater.inflate()来载入；

2、对于一个已经载入的界面，就可以使用Activiyt.findViewById()方法来获得其中的界面元素。

LayoutInflater 是一个抽象类，在文档中如下声明：

public abstract class LayoutInflater extends Object

获得 LayoutInflater 实例的三种方式

1\. LayoutInflater inflater = getLayoutInflater();//调用Activity的getLayoutInflater()

2\. LayoutInflater inflater = LayoutInflater.from(context);

3\. LayoutInflater inflater = (LayoutInflater)context.getSystemService

                              (Context.LAYOUT\_INFLATER\_SERVICE);

其实，这三种方式本质是相同的，从源码中可以看出：

getLayoutInflater()：

Activity 的 getLayoutInflater() 方法是调用 PhoneWindow 的getLayoutInflater()方法，看一下该源代码：

public PhoneWindow(Context context)

{

 super(context);

    mLayoutInflater = LayoutInflater.from(context);

}

可以看出它其实是调用 LayoutInflater.from(context)。

LayoutInflater.from(context)：

public static LayoutInflater from(Context context)

{

 LayoutInflater LayoutInflater = (LayoutInflater) context.getSystemService

         (Context.LAYOUT\_INFLATER\_SERVICE);

    if (LayoutInflater == null)

    {

     throw new AssertionError("LayoutInflater not found.");

    }

    return LayoutInflater;

}

可以看出它其实调用 context.getSystemService()。

结论：所以这三种方式最终本质是都是调用的Context.getSystemService()。

另外getSystemService()是Android很重要的一个API，它是Activity的一个方法，根据传入的NAME来取得对应的Object，然后转换成相应的服务对象。以下介绍系统相应的服务。

传入的Name 返回的对象 说明

WINDOW_SERVICE WindowManager 管理打开的窗口程序

LAYOUT\_INFLATER\_SERVICE LayoutInflater 取得xml里定义的view

ACTIVITY_SERVICE ActivityManager 管理应用程序的系统状态

POWER_SERVICE PowerManger 电源的服务

ALARM_SERVICE AlarmManager 闹钟的服务

NOTIFICATION_SERVICE NotificationManager 状态栏的服务

KEYGUARD_SERVICE KeyguardManager 键盘锁的服务

LOCATION_SERVICE LocationManager 位置的服务，如GPS

SEARCH_SERVICE SearchManager 搜索的服务

VEBRATOR_SERVICE Vebrator 手机震动的服务

CONNECTIVITY_SERVICE Connectivity 网络连接的服务

WIFI_SERVICE WifiManager Wi-Fi服务

TELEPHONY_SERVICE TeleponyManager 电话服务

inflate 方法

通过 sdk 的 api 文档，可以知道该方法有以下几种过载形式，返回值均是 View 对象，如下：

public View inflate (int resource, ViewGroup root)

public View inflate (XmlPullParser parser, ViewGroup root)

public View inflate (XmlPullParser parser, ViewGroup root, boolean attachToRoot)

public View inflate (int resource, ViewGroup root, boolean attachToRoot)

示意代码：

LayoutInflater inflater = (LayoutInflater)getSystemService(LAYOUT\_INFLATER\_SERVICE);

View view = inflater.inflate(R.layout.custom, (ViewGroup)findViewById(R.id.test));

//EditText editText = (EditText)findViewById(R.id.content);// error

EditText editText = (EditText)view.findViewById(R.id.content);

对于上面代码，指定了第二个参数 ViewGroup root，当然你也可以设置为 null 值。

注意：

·inflate 方法与 findViewById 方法不同；

·inflater 是用来找 res/layout 下的 xml 布局文件，并且实例化；

·findViewById() 是找具体 xml 布局文件中的具体 widget 控件(如:Button、TextView 等)。