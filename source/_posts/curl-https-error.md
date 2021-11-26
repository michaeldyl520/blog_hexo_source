---
title: curl https error
date: 2021-11-26 11:13:50
tags:
 - curl
 - https
---
# 当服务器中curl访问https站点出现以下问题时
```
curl: (60) SSL certificate problem: certificate has expired

More details here: https://curl.haxx.se/docs/sslcerts.html

curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this situation and how to fix it, please visit the web page mentioned above.

```
# 问题原因
由于服务器curl证书问题导致无法正确访问https站点
# 解决办法
```
#红帽系系统
yum install ca-certificates openssl
curl -k https://curl.se/ca/cacert.pem > cacert.pem
openssl x509 -outform der -in cacert.pem -out cacert.crt
update-ca-trust
ls -l /etc/pki/tls/certs/
```
# 参考连接
> https://curl.se/docs/sslcerts.html

> https://curl.se/docs/caextract.html