---
title: Magento2 Frontend Tips
date: 2023-11-14 10:21:40
tags:
 - magento2
 - modal
---
## 1.在自定义dom上显示数据loading状态
define 引用 loader 组件并初始化为loader变量，接着设置加载icon，然后调用show显示加载中，调用hide隐藏加载中。
```javascript
define([
    ...
    'loader',
    ...
],function(...,loader,...){
    let overviewContent = $(this).parent().find('.overview-content');
    
    overviewContent.loader({icon: self.options.loadingImg});
    overviewContent.loader('show');//显示loader
    ...
    overviewContent.loader('hide');//数据加载完成后隐藏loader

})
```
> 参考链接
https://developer.adobe.com/commerce/frontend-core/javascript/jquery-widgets/loader/
## 2.在Magento2 Js 中再加载js组件
```javascript
define([
    ...
    'mage/apply/main',
    ...
],function(...,main,...){
    main.applyFor('.content-card','{}','swiperOverviewImages');
})
```
> 参考链接
https://fishpig.co.uk/magento/tutorials/manually-load-js-component-magento-2/
