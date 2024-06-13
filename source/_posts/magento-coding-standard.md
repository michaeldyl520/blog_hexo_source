---
title: magento2 代码规范设置方法
date: 2023-03-24 13:19:28
tags:
 - magento2
 - phpcs
 - phpstorm
---
# 安装代码标准
使用magento2官方的代码标准，如果需要在开发工具中提示代码规范的问题，需要在安装magento2后执行以下shell
```shell
vendor/bin/phpcs --config-set installed_paths vendor/magento/magento-coding-standard,vendor/phpcompatibility/php-compatibility/PHPCompatibility
```
# PhpStorm 自动格式化的一些配置

## 自动对齐的问题
高版本PhpStorm Function如果有多个变量并换行，会自动两边对齐属性，不符合代码规范，需要在`Settings>Editor>Code Style>PHP->Wrapping and Braces->Function declaration parameters`中去掉`Align when multiline`的勾选框且勾选`Keep ')' and '{' on one line`

![自动对齐的问题](/images/修复自动对齐的问题.png)

## 强制限定类型的提示问题
Magento2 PHP不需要做强制类型限定参照图去掉以下两个复选框。

![强制限定类型的提示问题](/images/强类型提示的问题.png)

## 去掉js相等警告

![去掉js相等警告](/images/去掉js相等警告.png)

## eslint 搭法

![eslint 搭法](/images/eslint-1.png)
![eslint 搭法](/images/eslint-2.png)

## phpcs搭法
如果最新的vendor如果没有包含phpcs等检测工具，我们可以间接使用默认的2.4.5-p1中的phpcs进行项目的检测

## 右键phpcs添加方法
![右键phpcs设置方法.png](/images/右键phpcs设置方法.png)