---
title: magento2 单元测试
date: 2024-03-29 18:42:45
tags:
 - magento2
 - phpunit
---
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