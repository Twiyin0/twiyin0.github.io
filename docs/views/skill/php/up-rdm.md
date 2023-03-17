---
title: php+upyun实现图片随机
date: 2023-03-17
cover: https://zfile.in0.re/directlink/api-upyun/img/acc/106181162_p0.png
tags:
 - php
 - api
categories:
 - php
---

# php+又拍云实现随机图api

思路就是读取又拍云内文件夹的所有文件文件名，然后从里面随机挑一张图片，选出来，返回给浏览器。

## 准备工作：
* [upyun php sdk](http://docs.upyun.com/api/sdk/)  
* [php(7.4+)](https://www.runoob.com/php/php-tutorial.html)

## 使用composer安装upyun php sdk
shell执行命令
```sh
composer require upyun/sdk
```
安装完成后会在目录内多出一个vendor文件夹  

## 直接使用sdk包
* [sdk包Github下载地址](https://github.com/upyun/php-sdk/releases)  
解压甚么的咱就不再说了吧。  

# 开始敲代码

## 初始化
> index.php
```php
<?php
// 包含文件
require_once('vendor/autoload.php');

use Upyun\Upyun;
use Upyun\Config;

// 创建实例
$bucketConfig = new Config('您的服务名', '您的操作员名', '您的操作员密码');
$up = new Upyun($bucketConfig);
?>
```
**注意**  
> vendor文件夹同目录下新建一个index.php文件  

## 读取文件夹
> index.php
```php
$path = '您的存储目录(如/img/)'
$files = $up->read($path);
$name = [];
foreach ($files['files'] as $file) {
    $name[] = $file['name'];
}
```
> 将文件夹内所有文件名暂存在name数组  
> 这里没有任何判断，自己写的时候注意加上图片格式判断  

## 从文件中随机
> index.php
```php
$rdm = $name[array_rand($name)];    // 从name数组里随机
$imgurl = '加速域名(结尾不带/)'.$path.$rdm;
```
> imgUrl就是组合访问的url,例:https://ab.yourdomain.com(加速域名)/img/(文件夹路径)awa.jpg(随机获得的文件名)

## url链接返回类型
> index.php
```php
$type=$_GET['type'] ?? '';
switch($type) {
//JSON返回
case 'json':
    header('Content-type:text/json');
    die(json_encode(['imgurl'=>$imgUrl]));
default:
    header('Content-Type: image/png');
    echo(file_get_contents($imgUrl));
}
```
> 使用_GET获得链接的参数，在上面的例子中访问时使用?type=指定返回类型  
> default则默认返回图片类型  
> switch-case结构个人认为逻辑结构不如if-else稳定，建议使用if-else，当然看自己喜好啦  

# 我的例子

## 没有设置token的
```php
<?php
    require_once('../vendor/autoload.php');
    use Upyun\Upyun;
    use Upyun\Config;
/*              // 配置                     */
    $serviceConfig = new Config(
        '',                         // 服务名称
        '',                         // 操作员名称
        ''                          // 密码
    );
    $path = '/img/acc/';                            // 读取路径
    $domain = 'https://yourdomain.com';             // 加速域名

/*      // 获取文件夹内的文件名             */
    $up = new Upyun($serviceConfig);
    $files = $up->read($path);
    $name = [];
    foreach ($files['files'] as $file) {
        $name[] = $file['name'];
    }
    // 获取结果: $name[]

    $rdm = $name[array_rand($name)];

    $imgUrl = $domain.$path.$rdm                    // 获取图片的url
    //echo($imgUrl);                                // 调试用的
    
    $type=$_GET['type'] ?? '';
    if($type == 'json') {                           //JSON返回
        header('Content-type:text/json');
        die(json_encode(['imgurl'=>$imgUrl]));
    }
    else {
        header('Content-Type: image/png');
        echo(file_get_contents($imgUrl));
    }
?>
```

## 设置了访问token需要计算token值的
```php
    require_once('../vendor/autoload.php');
    use Upyun\Upyun;
    use Upyun\Config;
/*              // 配置                     */
    $serviceConfig = new Config(
        '',                         // 服务名称
        '',                         // 操作员名称
        ''                          // 密码
    );
    $path = '/img/acc/';                            // 读取路径
    $domain = 'https://yourdomain.com';             // 加速域名
    $secret = 'yourSecret';                         // bukket的token
    $utime = time()+3600;                           // 当前时间戳+600(过期时间：10min)

/*      // 获取文件夹内的文件名             */
    $up = new Upyun($serviceConfig);
    $files = $up->read($path);
    $name = [];
    foreach ($files['files'] as $file) {
        $name[] = $file['name'];
    }
    // 获取结果: $name[]

    $rdm = $name[array_rand($name)];
/*              // 开始MD5加密              */
    $url = $path.$rdm;                              // 随机后的值与目录链接成url
    $com = $secret.'&'.$utime.'&'.$url;             // 组合
    $md5_r = md5($com);                             // 进行MD5加密
    $md5_r = substr($md5_r,12,8);                   // 从12开始往后截取8位
    $_upt = $md5_r.$utime;
    $imgUrl = $domain.$path.$rdm."?_upt=".$_upt;    // 获取图片的url
    //echo($imgUrl);
    
    $type=$_GET['type'] ?? '';
    if($type == 'json') {                           //JSON返回
        header('Content-type:text/json');
        die(json_encode(['imgurl'=>$imgUrl]));
    }
    else {
        header('Content-Type: image/png');
        echo(file_get_contents($imgUrl));
    }
```

## 部署
写完以后把项目放在自己的站点内，设置好php就能用啦  
访问地址:  
https://yourdomain.com              ==>  直接返回图片  
https://yourdomain.com?type=json    ==>  返回json

# 注意与参考
注意  
- 1.我的例子里面没有增加文件类型的判断，如果需要请自行加上
- 2.我的例子里没有添加对文件路由读取的操作，因此只能读取一层文件夹
- 3.url过期时间（时间戳）的设置可以根据自己的情况修改

参考  
- [upyun官方文档](http://docs.upyun.com/api/sdk/)
- [菜鸟教程-php教程](https://www.runoob.com/php/php-tutorial.html)

我也是第一次写php,想着没啥的就没有注意细节，各位大佬轻喷