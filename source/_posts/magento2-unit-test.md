---
title: magento2 单元测试
date: 2024-03-29 18:42:45
tags:
 - magento2
 - phpunit testing
 - javascript testing
---
# 1.PHP Unit Testing
```
<?php

namespace DYL\Test\Test\Unit\Plugin\Framework\DB;

use PHPUnit\Framework\TestCase;
use DYL\Test\Plugin\Framework\DB\FieldDataConverter;
use Magento\Framework\DB\Query\BatchRangeIteratorFactory;

class FieldDataConverterTest extends TestCase
{
    public function setUp(): void
    {
        $test1 = $this->createMock(\DYL\Test\Model\Test1::class);
        $selectFactory = $this->createMock(\Magento\Framework\DB\SelectFactory::class);
        $test2 = $this->createMock(\DYL\Test\Helper\Test2::class);
        $batchRangeIteratorFactory = $this->createMock(BatchRangeIteratorFactory::class);
        $this->fieldDataConverter = new FieldDataConverter(
            $test1,
            $selectFactory,
            $test2,
            $batchRangeIteratorFactory
        );
    }

    /**
     * @dataProvider getExampleKeys
     * @return void
     */
    public function testGetExampleKey($key, $expected)
    {
        $result = $this->fieldDataConverter->getExampleKey($key);
        $this->assertEquals($expected, $result);
    }

    /**
     * Get example values
     * @return array[]
     */
    public function getExampleKeys()
    {
        return [
            ['test1-test2-test3', 'test3'],
        ];
    }
}

```
# 2.JavaScript testing
首先需要进入项目目录
使用最新的package.json
```shell
cp package.json.sample package.json
npm install
```
启动testing，添加参数-v可以看到更多调试信息
```shell
node /home/dyl/.config/nvm/versions/node/v20.12.1/bin/grunt spec:luma --file="dev/tests/js/jasmine/tests/app/code/Magento/Ui/base/js/grid/columns/actions.test.js"
```
调试启动
```shell
node --inspect-brk /home/dyl/.config/nvm/versions/node/v20.12.1/bin/grunt spec:luma --file="dev/tests/js/jasmine/tests/app/code/Magento/Ui/base/js/grid/columns/actions.test.js"
```
chrome浏览器输入```chrome://inspect```，应该能看到监听的node请求