---
title: Magento2 Zend_Http_Client 使用 http_proxy代理
date: 2021-07-16 15:00:23
tags:
 - magento2
 - http_proxy
 - Zend_Http_Client
---
## 开发中，如果遇到某种特殊情况下，无法访问外网，则可以设置代理
```php
//file vendor/magento/framework/HTTP/Adapter/Curl.php after line 26
    /**
    * Parameters array
    *
    * @var array
    */
protected $_config = [
    'protocols' => (CURLPROTO_HTTP
        | CURLPROTO_HTTPS
        | CURLPROTO_FTP
        | CURLPROTO_FTPS
    ),
    'verifypeer' => true,
    'verifyhost' => 2,
    'proxy' => "http://127.0.0.1:8888"//add http proxy here
];
```
```php
//file vendor/magento/zendframework1/library/Zend/Http/Client.php after line 1089
$response = $this->adapter->read();
//remove extra response afteradd proxy
if (false !== stripos($response, "HTTP/1.1 200 Connection established\r\n\r\n")) {
    $response = str_ireplace("HTTP/1.1 200 Connection established\r\n\r\n", '', $response);
}
```