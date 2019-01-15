---
title: magento2后台修改eav属性对应的模板
date: 2018-04-18 14:13:42
tags: 
  - magento2
categories:
  - magento2
---
## 简介
很多情况下我们需要修改后台eav属性对应的模板文件。以下是通过修改模板文件让客户无法在后台修改multiple select，也就是disable multiple select。
## 代码
```xml
<!--
Silk/AdvancedEstimatedShippingDate/etc/adminhtml/di.xml 
-->
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <virtualType name="Magento\Catalog\Ui\DataProvider\Product\Form\Modifier\Pool" type="Magento\Ui\DataProvider\Modifier\Pool">
        <arguments>
            <argument name="modifiers" xsi:type="array">
                <item name="esd" xsi:type="array">
                    <item name="class" xsi:type="string">Silk\AdvancedEstimatedShippingDate\Ui\DataProvider\Product\Form\Modifier\esd</item>
                    <item name="sortOrder" xsi:type="number">10</item>
                </item>
            </argument>
        </arguments>
    </virtualType>
</config>
```
接下来修改modifyMeta
```php
//Silk\AdvancedEstimatedShippingDate\Ui\DataProvider\Product\Form\Modifier\esd
<?php
/**
 * Created by PhpStorm.
 * User: dyl
 * Date: 18-4-17
 * Time: 下午4:31
 */

namespace Silk\AdvancedEstimatedShippingDate\Ui\DataProvider\Product\Form\Modifier;
use Magento\Framework\Stdlib\ArrayManager;

class esd implements \Magento\Ui\DataProvider\Modifier\ModifierInterface
{
    /**
     * Container fieldset prefix
     */
    const CONTAINER_PREFIX = 'container_';
    /**
     * @var ArrayManager
     */
    protected $arrayManager;

    /**
     * esd constructor.
     * @param ArrayManager $arrayManager
     */
    public function __construct(ArrayManager $arrayManager)
    {
        $this->arrayManager = $arrayManager;
    }

    /**
     * @param array $data
     * @return array
     */
    public function modifyData(array $data)
    {
        return $data;
    }

    /**
     * @param array $meta
     * @return array
     */
    public function modifyMeta(array $meta)
    {
        $fieldCode = 'esd';
        $elementPath = $this->arrayManager->findPath($fieldCode, $meta, null, 'children');
        $containerPath = $this->arrayManager->findPath(static::CONTAINER_PREFIX . $fieldCode, $meta, null, 'children');
        if (!$elementPath) {
            return $meta;
        }

        $meta = $this->arrayManager->merge(
            $containerPath,
            $meta,
            [
                'arguments' => [
                    'data' => [
                        'config' => [
                            'formElement' => 'container',
                            'componentType' => 'container',
                            'breakLine' => false,
                            'label' => __('ESD'),
                            'required' => 0,
                            'sortOrder' => 320,
                            'scopeLabel' => __('[STORE VIEW]'),
                        ],
                    ],
                ],
                'children' => [
                    $fieldCode => [
                        'arguments' => [
                            'data' => [
                                'config' => [
                                    'dataType' => 'multiselect',
                                    'formElement' => 'multiselect',
                                    'elementTmpl' => 'Silk_AdvancedEstimatedShippingDate/ui/form/element/multiselect'
                                ],
                            ],
                        ],
                    ],
                ]
            ]
        );
        return $meta;
    }
}
```
最后加上template文件
```html
<!--
    Silk/AdvancedEstimatedShippingDate/view/base/web/template/ui/form/element/multiselect.html
-->
<!--
/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
-->
<select multiple class="admin__control-multiselect" data-bind="
    attr: {
        name: inputName,
        id: uid,
        size: size ? size : '6',
        disabled: true,
        'aria-describedby': noticeId,
        placeholder: placeholder
    },
    hasFocus: focused,
    optgroup: options,
    selectedOptions: value,
    optionsValue: 'value',
    optionsText: 'label'"
/>

```