---
title: php通过smtp向目标邮箱发送邮件
date: 2023-04-02
cover: https://api.iin0.cn/img/acc?2
tags:
 - php
categories:
 - php
---

# php通过smtp向目标邮箱发送邮件
## 准备工作
* [php](https://www.php.net)  
* [composer](https://getcomposer.org)  

添加PHPEmailer  
```sh
composer require phpmailer/phpmailer
```

## 直接上代码吧
```php
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// 创建一个新的 PHPMailer 实例
$mail = new PHPMailer(true);

// 配置 PHPMailer 实例以使用 SMTP
$mail->isSMTP();                                          
$mail->Host       = 'smtp.exmail.example.com';  // smtp服务器地址                 
$mail->SMTPAuth   = true;                                  
$mail->Username   = 'mail@example.com';         // 账户      
$mail->Password   = 'ababababanananan';         // 密码
$mail->SMTPSecure = 'ssl';                      // 加密方式 ssl \ tls
$mail->Port       = 465;                        // smtp端口

$mail->setFrom('mail@example.com', 'name');     // 发件人信息

$mail->addAddress('aa@example.com');            // 添加收件人

$mail->Subject = 'This is a test Email.';       // 设置邮件主题

$mail->Body    = 'Hello world!\n';              // 设置邮件正文

if($mail->send()) {
    echo '邮件已成功发送！';
} else {
    echo '邮件发送失败：' . $mail->ErrorInfo;
}

```
:::tip
注意：  
setFrom()函数里的邮件与Username一致，后面的name就随便啦~
:::
