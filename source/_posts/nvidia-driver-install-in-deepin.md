---
title: 在Deepin linux中安装nvidia独立显卡
date: 2021-11-01 09:36:59
tags:
 - nvidia linux
 - deepin
 - 独立显卡 安装
---
# 在deepin linux中安装nvidia官方驱动的方法
首先，到nvdia官网下载对应显卡的linux驱动
https://www.nvidia.com/Download/index.aspx?lang=en-us
一般对应的下载文件会在```~/Downloads```下,将它重新命令nvidia.sh便于后面引用。

接下来请按照以下步骤执行。

1. 卸载`nvidia`开源驱动和闭源驱动
   ```
   sudo apt autoremove nvidia-*
   ```

2. 禁止`nouveau`驱动
   ```
   sudo dedit /etc/modprobe.d/blacklist.conf
   ```
   执行以上代码打开`blacklist.conf`文件后复制以下内容并保存关闭
   ```
   blacklist nouveau
   blacklist lbm-nouveau
   options nouveau modeset=0
   alias nouveau off
   alias lbm-nouveau off
   ```

3. 给`blacklist.conf`添加执行权限
   ```
   sudo chmod +x /etc/modprobe.d/blacklist.conf
   ```
   blacklist nouveau是禁用nouveau第三方驱动，之后不需要改回来，由于nouveau是构建在内核中的，所以要执行下面代码集成到内核中
   ```
   sudo update-initramfs -u
   ```
   好了，到现在为止，前期工作已经完成。

4. 重启
   可以运行以下命令
   ```
   reboot
   ```

5. 重启后查看`nouveau`有没有运行，没有输出则代表禁用生效
   ```
   lsmod | grep nouveau
   ```

6. 同时按住`ctrl+alt+F2`键，进入`tty2`。输入当前用户名点击`enter`然后再输入密码点击`enter`进入。

7. 导航到`Downloads`目录，为`nvidia.sh`添加执行权限。
   ```
   cd ~/Downloads && chmod +x nvidia.sh
   ```

8. 关闭图形界面
   ```
   sudo systemctl stop lightdm
   ```

9. 安装显卡驱动
   ```
   sudo sh nvidia.sh
   ```
   请注意接下来的步骤，一定要完成相同，否则将造成无法登陆图形界面

   **注意英文字母中出现大写的“DKMS”选择Yes**

   **注意英文中出现“32-bit”选择Yes**

   **注意英文中出现“nvidia-xconfig”一定要选择No**


10. 输入```reboot```重启电脑，安装完成

参考视频
>https://www.ixigua.com/7024358143215960590