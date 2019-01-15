---
title: 'NFS mount errors with "clnt_create: RPC: Unknown host" for CentOS 6'
tags:
  - RPC
url: 358.html
id: 358
categories:
  - CentOS
date: 2015-08-11 09:50:13
---

When attempting to mount CentOS 6, my mount fails with

clnt_create: RPC: Unknown host

**Diagnostic:** If we do a more thorough diagnostic, this is the issue

\# showmount -e  
clnt_create: RPC: Unknown host  
\# showmount -e localhost  
Export list for localhost:  
/export/my_data \\*

**Resolution:** Taken from Redhat Site Implement forward and reverse lookups (A records and CNAME records) in DNS and have the system point towards the DNS servers. Implement for both IPv4 and IPv6.**If unable to resolve DNS issues**, change the /etc/hosts file from this: Change from

::1          localhost localhost.localdomain localhost6 localhost6.localdomain6

To

::1          machine_hostname localhost localhost.localdomain localhost6 localhost6.localdomain6

Restart the NFS service and check on the showmount -e localhost and showmount -e and attempt to mount the share.

\# service nfs restart  
\# showmount -e localhost  
\# showmount -e