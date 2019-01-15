---
title: magento2使用PayPal Payflow测试账号
date: 2019-06-06 14:14:03
categories:
 - magento2
 - PayPal PayFlow
tags:
 - magento2
 - PayPal
---
1. 访问[开发文档](https://developer.paypal.com/docs/classic/payflow/test_hosted_pages/)搜索并点击`Create a test-only Payflow Gateway account`，继续点击`Payflow Services`开始创建账号，根据需要的类型选择支付处理公司，除了邮件其他随意填继续下一步到结束。完成后会有成功注册信息发送到邮箱。

2. 根据邮件登录信息登录登录[paypal payflow后台](https://manager.paypal.com/),
 + 点击
`Service Setting->Set Up->Payment Confirmation`中，修改Show confirmation pagew为`On my website`，修改`Return URL Method`为`Post`。转到`Security Options`，修改`Enable Secure Token`为`Yes`，保存;
 + 导航到`Service Setting->Customize->Choose a layout and color`，选择`Layout C`,然后保存发布（Save and Publish）;
 + 导航到`Account Administration->Manage Security->Transaction Settings`，修改`Allow reference transactions`为`Yes`，保存（`Confirm`）;

3. magento2后台配置paypal payflow后即可使用测试信用卡测试。

