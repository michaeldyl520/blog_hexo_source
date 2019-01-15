---
title: 使用 Telnet 端口 25 测试 SMTP 通信
tags:
  - centos
  - iredmail
  - SMTP
url: 279.html
id: 279
categories:
  - iredMail
date: 2015-03-11 13:40:43
---

目标 SMTP 服务器 mail1.fabrikam.com 源域 contoso.com 发件人的电子邮件地址 chris@contoso.com 收件人的电子邮件地址 kate@fabrikam.com 邮件主题 来自 Contoso 的测试 邮件正文 这是一封测试邮件 使用 Telnet 端口 25 测试 SMTP 通信 在命令提示符下，键入 telnet，再按 Enter 键。此命令将打开 Telnet 会话。 键入 set localecho，再按 Enter 键。此可选命令可使您在键入字符时查看这些字符。某些 SMTP 服务器可能需要此设置。 键入 set logfile <文件名>。此可选命令可以将 Telnet 会话记录到指定的日志文件中。如果您仅指定了文件名，则日志文件的位置将是当前工作目录。如果您指定了路径和文件名，该路径必须位于计算机本地。指定的路径和文件名都必须以 Microsoft DOS 8.3 格式输入。您指定的路径必须已存在。如果您指定了一个不存在的日志文件，系统将为您创建一个日志文件。 键入 open mail1.fabrikam.com 25，再按 ENTER 键。 键入 EHLO contoso.com，再按 ENTER 键。 键入 MAIL FROM:chris@contoso.com，再按 ENTER 键。 键入 RCPT TO:kate@fabrikam.com NOTIFY=success,failure，再按 ENTER 键。可选的 NOTIFY 命令可定义目标 SMTP 服务器必须向发件人提供的特定传递状态通知 (DSN) 邮件。DSN 邮件是在 RFC 1891 中定义的。在本例中，您要查询有关邮件传递成功或失败的 DSN 邮件。 键入 DATA，再按 Enter 键。您将收到与以下类似的响应： 354 Start mail input; end with . 键入 主题：来自 Contoso 的测试，再按 ENTER 键。 按 Enter 键。RFC 2822 需要在 Subject: 头字段和邮件正文间留一个空行。 键入 这是一封测试邮件，再按 ENTER 键。 按 ENTER 键，键入句点 ( . )，再按 ENTER 键。您将收到与以下类似的响应： 250 2.6.0 Queued mail for delivery 若要与目标 SMTP 服务器断开连接，请键入 QUIT，再按 ENTER 键。您将收到与以下类似的响应： 221 2.0.0 Service closing transmission channel 若要关闭 Telnet 会话，请键入 quit，再按 ENTER 键。 解释 Telnet 会话与 SMTP 服务器的结果 针对您在以上示例中输入的命令，本节提供有关这些命令响应的详细信息。 注意： 在 RFC 2821 中定义的三位数 SMTP 响应代码对于所有 SMTP 邮件服务器都相同。对于某些 SMTP 邮件服务器，文本说明可能稍有不同。在本示例中，目标计算机正在运行 Exchange Server 2007。 打开 mail1.fabrikam.com 25 成功响应 220 mail1.fabrikam.com Microsoft ESMTP MAIL Service ready at 失败响应 Connecting to mail1.fabrikam.com…Could not open connection to the host, on port 25: Connect failed 失败的可能原因 目标 SMTP 服务不可用。 对目标防火墙有所限制。 对源防火墙有所限制。 指定的目标 SMTP 服务器的 FQDN 或 IP 地址不正确。 指定的端口号不正确。 EHLO contoso.com 成功响应 250 mail1.fabrikam.com Hello \[\] 失败响应 501 5.5.4 Invalid domain name 失败的可能原因 域名中存在无效字符。或者，存在有关目标 SMTP 服务器的连接限制。 注意： EHLO 是扩展的简单邮件传输协议 (ESMTP) 命令动词，该命令动词是在 RFC 2821 中定义的。ESMTP 服务器可在初始连接时公布其功能。这些功能包括其最大的可接受邮件大小以及其支持的身份验证方法。HELO 是 RFC 821 中定义的旧版 SMTP 命令动词。多数 SMTP 邮件服务器都支持 ESMTP 和 EHLO。 MAIL FROM:chris@contoso.com 成功响应 250 2.1.0 Sender OK 失败响应 550 5.1.7 Invalid address 可能的失败原因 发件人的电子邮件地址中存在语法错误。 失败响应 530 5.7.1 Client was not authenticated 可能的失败原因 目标服务器不接受匿名邮件提交。如果您试图使用 Telnet 直接向集线器传输服务器提交邮件，则将收到此错误消息。 RCPT TO:kate@fabrikam.com NOTIFY=success,failure 成功响应 250 2.1.5 Recipient OK 失败响应 550 5.1.1 User unknown 可能的失败原因 指定的收件人在组织中不存在。