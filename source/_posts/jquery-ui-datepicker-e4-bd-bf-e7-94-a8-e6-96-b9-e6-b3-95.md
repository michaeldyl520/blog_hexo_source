---
title: JQuery UI datepicker 使用方法
tags:
  - datepicker
  - jquery
  - jquery ui
url: 236.html
id: 236
categories:
  - jquery
date: 2015-01-07 17:06:19
---

官方地址：[http://docs.jquery.com/UI/Datepicker](http://docs.jquery.com/UI/Datepicker)，官方示例： [http://jqueryui.com/demos/datepicker/](http://jqueryui.com/demos/datepicker/)。 一个不错的地址，用来DIY jQuery UI界面效果的站点[http://jqueryui.com/themeroller/](http://jqueryui.com/themeroller/) DatePicker基本使用方法： 代码如下:

<!DOCTYPE html> 
<html> 
<head> 
<link href="http://ajax.useso.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/> 
<script src="http://ajax.useso.com/ajax/libs/jquery/1.4/jquery.min.js"></script> 
<script src="http://ajax.useso.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script> 

<script> 
$(document).ready(function() { 
$("#datepicker").datepicker(); 
}); 
</script> 
</head> 
<body style="font-size:62.5%;"> 

<div type="text" id="datepicker"></div> 

</body> 
</html>

DatePicker支持鼠标点选日期，同时还可以通过键盘控制选择：

page up/down - 上一月、下一月 
ctrl+page up/down - 上一年、下一年 
ctrl+home - 当前月或最后一次打开的日期 
ctrl+left/right - 上一天、下一天 
ctrl+up/down - 上一周、下一周 
enter - 确定选择日期 
ctrl+end - 关闭并清除已选择的日期 
escape - 关闭并取消选择

实用功能：

$.datepicker.setDefaults( settings ) - 全局设置日期选择插件的参数. 
$.datepicker.formatDate( format, date, settings ) - 格式化显示的日期字符串 
$.datepicker.iso8601Week( date ) - 给出一个日期，确实他是一年中的第几周 
$.datepicker.parseDate( format, value, settings ) - 按照指定格式获取日期字符串

日期格式：

d - 每月的第几天 (没有前导零) 
dd - 每月的第几天 (两位数字) 
o - 一年中的第几天 (没有前导零) 
oo - 一年中的第几天 (三位数字) 
D - day name short 
DD - day name long 
m - 月份 (没有前导零) 
mm - 月份 (两位数字) 
M - month name short 
MM - month name long 
y - 年份 (两位数字) 
yy - 年份 (四位数字) 
@ \- Unix 时间戳 (从 01/01/1970 开始) 
'...' \- 文本 
'' \- 单引号 
（其它） \- 文本

其它标准日期格式:

ATOM - 'yy-mm-dd' (Same as RFC 3339/ISO 8601) 
COOKIE - 'D, dd M yy' 
ISO_8601 - 'yy-mm-dd' 
RFC_822 - 'D, d M y' 
RFC_850 - 'DD, dd-M-y' 
RFC_1036 - 'D, d M y 
RFC_1123 - 'D, d M yy' 
RFC_2822 - 'D, d M yy' 
RSS - 'D, d M y' 
TIMESTAMP - '@' 
W3C - 'yy-mm-dd'

参数（参数名 : 参数类型 : 默认值）

altField : String : '' 
将选择的日期同步到另一个域中，配合altFormat可以显示不同格式的日期字符串。 
初始：$('.selector').datepicker({ altField: '#actualDate' }); 
获取：var altField = $('.selector').datepicker('option', 'altField'); 
设置：$('.selector').datepicker('option', 'altField', '#actualDate'); 

altFormat : String : '' 
当设置了altField的情况下，显示在另一个域中的日期格式。 
初始：$('.selector').datepicker({ altFormat: 'yy-mm-dd' }); 
获取：var altFormat = $('.selector').datepicker('option', 'altFormat'); 
设置：$('.selector').datepicker('option', 'altFormat', 'yy-mm-dd'); 

appendText : String : '' 
在日期插件的所属域后面添加指定的字符串。 
初始：$('.selector').datepicker({ appendText: '(yyyy-mm-dd)' }); 
获取：var appendText = $('.selector').datepicker('option', 'appendText'); 
设置：$('.selector').datepicker('option', 'appendText', '(yyyy-mm-dd)'); 

buttonImage : String : '' 
设置弹出按钮的图片，如果非空，则按钮的文本将成为alt属性，不直接显示。 
初始：$('.selector').datepicker({ buttonImage: '/images/datepicker.gif' }); 
获取：var buttonImage = $('.selector').datepicker('option', 'buttonImage'); 
设置：$('.selector').datepicker('option', 'buttonImage', '/images/datepicker.gif'); 

buttonImageOnly : Boolean : false 
Set to true to place an image after the field to use as the trigger without it appearing on a button. 
初始：$('.selector').datepicker({ buttonImageOnly: true }); 
获取：var buttonImageOnly = $('.selector').datepicker('option', 'buttonImageOnly'); 
设置：$('.selector').datepicker('option', 'buttonImageOnly', true); 

buttonText : String : '...' 
设置触发按钮的文本内容。 
初始：$('.selector').datepicker({ buttonText: 'Choose' }); 
获取：var buttonText = $('.selector').datepicker('option', 'buttonText'); 
设置：$('.selector').datepicker('option', 'buttonText', 'Choose'); 

changeMonth : Boolean : false 
设置允许通过下拉框列表选取月份。 
初始：$('.selector').datepicker({ changeMonth: true }); 
获取：var changeMonth = $('.selector').datepicker('option', 'changeMonth'); 
设置：$('.selector').datepicker('option', 'changeMonth', true); 

changeYear : Boolean : false 
设置允许通过下拉框列表选取年份。 
初始：$('.selector').datepicker({ changeYear: true }); 
获取：var changeYear = $('.selector').datepicker('option', 'changeYear'); 
设置：$('.selector').datepicker('option', 'changeYear', true); 

closeTextType: StringDefault: 'Done' 
设置关闭按钮的文本内容，此按钮需要通过showButtonPanel参数的设置才显示。 
初始：$('.selector').datepicker({ closeText: 'X' }); 
获取：var closeText = $('.selector').datepicker('option', 'closeText'); 
设置：$('.selector').datepicker('option', 'closeText', 'X'); 

constrainInput : Boolean : true 
如果设置为true，则约束当前输入的日期格式。 
初始：$('.selector').datepicker({ constrainInput: false }); 
获取：var constrainInput = $('.selector').datepicker('option', 'constrainInput'); 
设置：$('.selector').datepicker('option', 'constrainInput', false); 

currentText : String : 'Today' 
设置当天按钮的文本内容，此按钮需要通过showButtonPanel参数的设置才显示。 
初始：$('.selector').datepicker({ currentText: 'Now' }); 
获取：var currentText = $('.selector').datepicker('option', 'currentText'); 
设置：$('.selector').datepicker('option', 'currentText', 'Now'); 

dateFormat : String : 'mm/dd/yy' 
设置日期字符串的显示格式。 
初始：$('.selector').datepicker({ dateFormat: 'yy-mm-dd' }); 
获取：var dateFormat = $('.selector').datepicker('option', 'dateFormat'); 
设置：$('.selector').datepicker('option', 'dateFormat', 'yy-mm-dd'); 

dayNames : Array : \['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'\] 
设置一星期中每天的名称，从星期天开始。此内容用于dateFormat时显示，以及日历中当鼠标移至行头时显示。 
初始：$('.selector').datepicker({ dayNames: \['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'\] }); 
获取：var dayNames = $('.selector').datepicker('option', 'dayNames'); 
设置：$('.selector').datepicker('option', 'dayNames', \['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'\]); 

dayNamesMin : Array : \['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'\] 
设置一星期中每天的缩语，从星期天开始，此内容用于dateFormat时显示，以前日历中的行头显示。 
初始：$('.selector').datepicker({ dayNamesMin: \['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'\] }); 
获取：var dayNamesMin = $('.selector').datepicker('option', 'dayNamesMin'); 
设置：$('.selector').datepicker('option', 'dayNamesMin', \['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'\]); 

dayNamesShort : Array : \['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'\] 
设置一星期中每天的缩语，从星期天开始，此内容用于dateFormat时显示，以前日历中的行头显示。 
初始：$('.selector').datepicker({ dayNamesShort: \['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'\] }); 
获取：var dayNamesShort = $('.selector').datepicker('option', 'dayNamesShort'); 
设置：$('.selector').datepicker('option', 'dayNamesShort', \['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'\]); 

defaultDate : Date, Number, String : null 
设置默认加载完后第一次显示时选中的日期。可以是Date对象，或者是数字（从今天算起，例如+7），或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')。 
初始：$('.selector').datepicker({ defaultDate: +7 }); 
获取：var defaultDate = $('.selector').datepicker('option', 'defaultDate'); 
设置：$('.selector').datepicker('option', 'defaultDate', +7); 

duration : String, Number : 'normal' 
设置日期控件展开动画的显示时间，可选是"slow", "normal", "fast"，''代表立刻，数字代表毫秒数。 
初始：$('.selector').datepicker({ duration: 'slow' }); 
获取：var duration = $('.selector').datepicker('option', 'duration'); 
设置：$('.selector').datepicker('option', 'duration', 'slow'); 

firstDay : Number : 0 
设置一周中的第一天。星期天为0，星期一为1，以此类推。 
初始：$('.selector').datepicker({ firstDay: 1 }); 
获取：var firstDay = $('.selector').datepicker('option', 'firstDay'); 
设置：$('.selector').datepicker('option', 'firstDay', 1); 

gotoCurrent : Boolean : false 
如果设置为true，则点击当天按钮时，将移至当前已选中的日期，而不是今天。 
初始：$('.selector').datepicker({ gotoCurrent: true }); 
获取：var gotoCurrent = $('.selector').datepicker('option', 'gotoCurrent'); 
设置：$('.selector').datepicker('option', 'gotoCurrent', true); 

hideIfNoPrevNext : Boolean : false 
设置当没有上一个/下一个可选择的情况下，隐藏掉相应的按钮。（默认为不可用） 
初始：$('.selector').datepicker({ hideIfNoPrevNext: true }); 
获取：var hideIfNoPrevNext = $('.selector').datepicker('option', 'hideIfNoPrevNext'); 
设置：$('.selector').datepicker('option', 'hideIfNoPrevNext', true); 

isRTL : Boolean : false 
如果设置为true，则所有文字是从右自左。 
初始：$('.selector').datepicker({ isRTL: true }); 
获取：var isRTL = $('.selector').datepicker('option', 'isRTL'); 
设置：$('.selector').datepicker('option', 'isRTL', true); 

maxDate : Date, Number, String : null 
设置一个最大的可选日期。可以是Date对象，或者是数字（从今天算起，例如+7），或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')。 
初始：$('.selector').datepicker({ maxDate: '+1m +1w' }); 
获取：var maxDate = $('.selector').datepicker('option', 'maxDate'); 
设置：$('.selector').datepicker('option', 'maxDate', '+1m +1w'); 
$('.selector').datepicker('option', 'maxDate', '12/25/2012'); 

minDate : Date, Number, String : null 
设置一个最小的可选日期。可以是Date对象，或者是数字（从今天算起，例如+7），或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')。 
初始：$('.selector').datepicker({ minDate: new Date(2007, 1 - 1, 1) }); 
获取：var minDate = $('.selector').datepicker('option', 'minDate'); 
设置：$('.selector').datepicker('option', 'minDate', new Date(2007, 1 - 1, 1)); 
$('.selector').datepicker('option', 'minDate', '12/25/2012'); 

monthNames : Array : \['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'\] 
设置所有月份的名称。 
初始：$('.selector').datepicker(｛monthNames:\['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'\]}); 
获取：var monthNames = $('.selector').datepicker('option', 'monthNames'); 
设置：$('.selector').datepicker('option', 'monthNames', \['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'\]); 

monthNamesShort : Array : \['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'\] 
设置所有月份的缩写。 
初始：$('.selector').datepicker(｛monthNamesShort:\['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'\]}); 
获取：var monthNamesShort = $('.selector').datepicker('option', 'monthNamesShort'); 
设置：$('.selector').datepicker('option', 'monthNamesShort', \['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'\]); 

navigationAsDateFormat : Boolean : false 
如果设置为true，则formatDate函数将应用到 prevText,nextText和currentText的值中显示，例如显示为月份名称。 
初始：$('.selector').datepicker({ navigationAsDateFormat: true }); 
获取：var navigationAsDateFormat = $('.selector').datepicker('option', 'navigationAsDateFormat'); 
设置：$('.selector').datepicker('option', 'navigationAsDateFormat', true); 

nextText : String : 'Next' 
设置“下个月”链接的显示文字。 
初始：$('.selector').datepicker({ nextText: 'Later' }); 
获取：var nextText = $('.selector').datepicker('option', 'nextText'); 
设置：$('.selector').datepicker('option', 'nextText', 'Later'); 

numberOfMonths : Number, Array : 1 
设置一次要显示多少个月份。如果为整数则是显示月份的数量，如果是数组，则是显示的行与列的数量。 
初始：$('.selector').datepicker({ numberOfMonths: \[2, 3\] }); 
获取：var numberOfMonths = $('.selector').datepicker('option', 'numberOfMonths'); 
设置：$('.selector').datepicker('option', 'numberOfMonths', \[2, 3\]); 

prevText : String : 'Prev' 
设置“上个月”链接的显示文字。 
初始：$('.selector').datepicker({ prevText: 'Earlier' }); 
获取：var prevText = $('.selector').datepicker('option', 'prevText'); 
设置：$('.selector').datepicker('option', 'prevText', 'Earlier'); 

shortYearCutoff : String, Number : '+10' 
设置截止年份的值。如果是（0-99）的数字则以当前年份开始算起，如果为字符串，则相应的转为数字后再与当前年份相加。当超过截止年份时，则被认为是上个世纪。 
初始：$('.selector').datepicker({ shortYearCutoff: 50 }); 
获取：var shortYearCutoff = $('.selector').datepicker('option', 'shortYearCutoff'); 
设置：$('.selector').datepicker('option', 'shortYearCutoff', 50); 

showAnim : String : 'show' 
设置显示、隐藏日期插件的动画的名称。 
初始：$('.selector').datepicker({ showAnim: 'fold' }); 
获取：var showAnim = $('.selector').datepicker('option', 'showAnim'); 
设置：$('.selector').datepicker('option', 'showAnim', 'fold'); 

showButtonPanel : Boolean : false 
设置是否在面板上显示相关的按钮。 
初始：$('.selector').datepicker({ showButtonPanel: true }); 
获取：var showButtonPanel = $('.selector').datepicker('option', 'showButtonPanel'); 
设置：$('.selector').datepicker('option', 'showButtonPanel', true); 

showCurrentAtPos : Number : 0 
设置当多月份显示的情况下，当前月份显示的位置。自顶部/左边开始第x位。 
初始：$('.selector').datepicker({ showCurrentAtPos: 3 }); 
获取：var showCurrentAtPos = $('.selector').datepicker('option', 'showCurrentAtPos'); 
设置：$('.selector').datepicker('option', 'showCurrentAtPos', 3); 

showMonthAfterYear : Boolean : false 
是否在面板的头部年份后面显示月份。 
初始：$('.selector').datepicker({ showMonthAfterYear: true }); 
获取：var showMonthAfterYear = $('.selector').datepicker('option', 'showMonthAfterYear'); 
设置：$('.selector').datepicker('option', 'showMonthAfterYear', true); 

showOn : String : 'focus' 
设置什么事件触发显示日期插件的面板，可选值：focus, button, both 
初始：$('.selector').datepicker({ showOn: 'both' }); 
获取：var showOn = $('.selector').datepicker('option', 'showOn'); 
设置：$('.selector').datepicker('option', 'showOn', 'both'); 

showOptions : Options : {} 
如果使用showAnim来显示动画效果的话，可以通过此参数来增加一些附加的参数设置。 
初始：$('.selector').datepicker({ showOptions: {direction: 'up' }); 
获取：var showOptions = $('.selector').datepicker('option', 'showOptions'); 
设置：$('.selector').datepicker('option', 'showOptions', {direction: 'up'); 

showOtherMonths : Boolean : false 
是否在当前面板显示上、下两个月的一些日期数（不可选）。 
初始：$('.selector').datepicker({ showOtherMonths: true }); 
获取：var showOtherMonths = $('.selector').datepicker('option', 'showOtherMonths'); 
设置：$('.selector').datepicker('option', 'showOtherMonths', true); 

stepMonths : Number : 1 
当点击上/下一月时，一次翻几个月。 
初始：$('.selector').datepicker({ stepMonths: 3 }); 
获取：var stepMonths = $('.selector').datepicker('option', 'stepMonths'); 
设置：$('.selector').datepicker('option', 'stepMonths', 3); 

yearRange : String : '-10:+10' 
控制年份的下拉列表中显示的年份数量，可以是相对当前年(-nn:+nn)，也可以是绝对值 (-nnnn:+nnnn) 
初始：$('.selector').datepicker({ yearRange: '2000:2010' }); 
获取：var yearRange = $('.selector').datepicker('option', 'yearRange'); 
设置：$('.selector').datepicker('option', 'yearRange', '2000:2010');

事件

beforeShow : function(input) 
在日期控件显示面板之前，触发此事件，并返回当前触发事件的控件的实例对象。 
初始：$('.selector').datepicker({ beforeShow: function(input) { ... } }); 

beforeShowDay : function(date) 
在日期控件显示面板之前，每个面板上的日期绑定时都触发此事件，参数为触发事件的日期。调用函数后，必须返回一个数组：\[0\]此日期是否可选(true/false)，\[1\]此日期的CSS样式名称(""表示默认)，\[2\]当鼠标移至上面出现一段提示的内容。 
初始：$('.selector').datepicker({ beforeShowDay: function(date) { ... } }); 

onChangeMonthYear : function(year, month, inst) 
当年份或月份改变时触发此事件，参数为改变后的年份月份和当前日期插件的实例。 
初始：$('.selector').datepicker({ onChangeMonthYear: function(year, month, inst) { ... } }); 

onClose : function(dateText, inst) 
当日期面板关闭后触发此事件（无论是否有选择日期），参数为选择的日期和当前日期插件的实例。 
初始：$('.selector').datepicker({ onClose: function(dateText, inst) { ... } }); 

onSelect : function(dateText, inst) 
当在日期面板选中一个日期后触发此事件，参数为选择的日期和当前日期插件的实例。 
$('.selector').datepicker({ onSelect: function(dateText, inst) { ... } });

方法：

destory 
从元素中移除拖拽功能。 
用法：.datepicker( 'destroy' ) 

disable 
禁用元素的拖拽功能。 
用法：.datepicker( 'disable' ) 

enable 
启用元素的拖拽功能。 
用法：.datepicker( 'enable' ) 

option 
获取或设置元素的参数。 
用法：.datepicker( 'option' , optionName , \[value\] ) 

dialog 
在dialog插件中打开一个日期插件。 
用法：.datepicker( 'dialog' , dateText , \[onSelect\] , \[settings\] , \[pos\] ) 

isDisabled 
确实日期插件是否已被禁用。 
用法：.datepicker( 'isDisabled' ) 

hide 
隐藏（关闭）之前已经打开的日期面板。 
用法：.datepicker( 'hide' , \[speed\] ) 

show 
.datepicker( 'show' ) 
显示日期插件。 
用法：.datepicker( 'show' ) 

getDate 
返回当前日期插件选择的日期。 
用法：.datepicker( 'getDate' ) 

setDate 
设置日期插件当前的日期。date参数可以是数字（从今天算起，例如+7），或者有效的字符串('y'代表年, 'm'代表月, 'w'代表周, 'd'代表日, 例如：'+1m +7d')，null表示当天。 
用法：.datepicker( 'setDate' , date )

**jquery-ui-datepicker的用法讲解** 1:先在页面引入相关的js,注意引入顺序不能错 jquery-1.4.2.min.js jquery-ui.min.js jquery.ui.datepicker.min.js jquery.ui.datepicker-zh-CN.min.js jquery.ui.datepicker-fr.min.js ....等等语言包(用到哪些加入哪些) 注意:在语言包的最后一句话设置了该datepicker的缺省Localization 类似这句：setDefaults(....regional\[...\]) 所以页面的datepicker如果不再自己设置的话，缺省会以最后一个引入的语言包的Localization为准. 2:页面示例 其中的注释已经很清楚了,datepicker的官方文档对于option的设置是先init datepicker,再setter or getter

<html> 
<head> 
<script type="text/javascript"> 
$(function() { 
//$("#datepicker").datepicker(...);//代表带着...属性直接执行创建datepicker() 
//必须先init datepicker才能再设置datepicker的option 
//$("#datepicker").datepicker('option',...,...);//代表设置datepicker的...的属性值为...,但不执行创建datepicker(); 
//$.datepicker.setDefaults($.datepicker.regional\['zh-CN'\]); 
$.datepicker.setDefaults($.datepicker.regional\[''\]);//先清理一下语言包的regional 
$("#datepicker").datepicker(); 
$("#datepicker").datepicker('option', $.datepicker.regional\['zh-CN'\]); 
//$("#datepicker").datepicker($.datepicker.regional\['zh-CN'\]);//该句执行失效，因为之前有$("#datepicker").datepicker();了 
$("#datepicker").datepicker('option', 'dateFormat','yy-mm-dd');//set dateFormat 
//var dateFormat = $( "#datepicker" ).datepicker( "option", "dateFormat" );//get dateFormat 
//$("#datepicker").datepicker('option', {dateFormat: 'yy-mm-dd'});//set dateFormat 
}); 
</script> 
</head> 
<body> 
<!--div id="datepicker"></div--> 
<input id="datepicker" type="text"/> 
</body> 
</html>