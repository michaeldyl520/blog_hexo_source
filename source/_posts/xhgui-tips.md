---
title: Xhgui Tips
date: 2023-10-16 18:24:10
tags:
 - xhgui
---
# 最新的 XHGUI 用法
https://github.com/michaeldyl520/xhgui

最新的自修改xhgui搭配mongodb用法如下
1. 在程序入口index.php添加以下代码即可开始分析
```php
require_once '/path/to/xhgui/vendor/perftools/php-profiler/autoload.php';

$config = require_once '/path/to/xhgui/config/config.php';
$profiler = new \Xhgui\Profiler\Profiler($config);
$profiler->start();
```
```php
<?php
/**
 * Default configuration for PHP Profiler.
 *
 * config.php
 * To change these, create a file called `config.php` file in the same directory
 * and return an array from there with your overriding settings.
 */

use Xhgui\Profiler\Profiler;
use Xhgui\Profiler\ProfilingFlags;

return array(
    'save.handler' => Profiler::SAVER_STACK,
    'save.handler.stack' => array(
        'savers' => array(
            Profiler::SAVER_UPLOAD
        ),
        'saveAll' => false,
    ),
    'save.handler.upload' => array(
        'url' => 'https://www.xhgui.local/run/import',
        // The timeout option is in seconds and defaults to 3 if unspecified.
        'timeout' => 3,
        // the token must match 'upload.token' config in XHGui
        'token' => '',
    ),
    'profiler.enable' => function () {
        return true;
    },
    'profiler.flags' => array(
        ProfilingFlags::CPU,
        ProfilingFlags::MEMORY,
        ProfilingFlags::NO_BUILTINS,
        ProfilingFlags::NO_SPANS,
    ),
    'profiler.options' => array(),
    'profiler.exclude-env' => array(),
    'profiler.simple_url' => function ($url) {
        return preg_replace('/=\d+/', '', $url);
    },
    'profiler.replace_url' => null,
);
```