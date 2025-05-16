---
title: VScode配置C/C++环境
date: 2021-11-04
collapsable: true
cover: https://upyun.twiyin0.cn/2022/da28223d61936.jpg
tags:
 - VScode
 - C/C++
categories: 
 - VScode
---

众所周知，VScode是万能的
<br>就是麻烦了点点!!
<!-- more -->

# VScode配置C/C++环境
Windows操作系统下VScode配置C/C++环境
## 前置知识
再次之前你需要了解
- VScode安装
- Windows环境变量
- Windows系统文件管理系统
- Windows系统文件目录结构

:::tip
VScode官方下载会很慢，这里我建议用[镜像源下载](https://update.code.visualstudio.com/latest/win32-x64-user/stable)
:::

## VScode扩展
所需的扩展有`C/C++`与`C/C++ Runner`
<br>按 shift+ctrl+x 打开 VScode 扩展列表界面
<br>在搜索栏搜索以上扩展即可

## Mingw下载
我们这里用编译好的.zip压缩包，解压后即可用
<br>点击下载[Mingw-x86_64](https://github.com/brechtsanders/winlibs_mingw/releases/download/12.2.0-14.0.6-10.0.0-ucrt-r2/winlibs-x86_64-posix-seh-gcc-12.2.0-llvm-14.0.6-mingw-w64ucrt-10.0.0-r2.zip)
<br>当然也可以去Mingw官网（不建议，因为太慢了）
<br>下载好后解压到自己记得的位置

## gcc环境变量配置
打开`控制面板`-`系统核安全`-`系统`-`高级系统设置`-`环境变量`
<br>在用户变量的 `Path` 中添加mingw的bin路径
<br>比如我的
<br>D:\C_C++\mingw64\bin
<br>![mingw1](https://img.twiyin0.cn/other/teach/gcc/mingw1.png)
<br>
<br>按win+r输入cmd打开命令提示符，或者vscode打开终端
<br>输入
```
gcc -v
```
回车！如果返回的一串很长看不懂的玩意儿就说明成功了
<br>如果返回"xxxxx"既不是可执行的命令，也不是可打开的文件。就证明失败了
<br>失败了请检查环境变量路径是否为mingw的bin文件夹
<br>或者bin文件夹内的文件是否有损失

# 配置C环境

## VScode配置c环境
VScode按下shift+ctrl+p后输入C/C++
<br>选择编辑配置(UI)
<br>![mingw2](https://img.twiyin0.cn/other/teach/gcc/mingw2.png)
<br>然后我们按以下来配置
<br>![mingw3](https://img.twiyin0.cn/other/teach/gcc/mingw3.png)
<br>![mingw4](https://img.twiyin0.cn/other/teach/gcc/mingw4.png)
<br>配置到这里也差不多了，C与C++标准可以不选
:::tip
<br>**一个小疑问**
<br>Q：为什么不用/mingw/include内的头文件？
<br>A：因为/mingw/include内的头文件较少
<br>标准C/C++的头文件都在同目录下
<br>.\x86_64-w64-mingw32\include内
:::

## VScode下新建C工程
这个很简单，资源管理器新建一个文件夹，然后把它拖到VScode内即可
<br>这个文件夹内就是我们的C工程了

## VScode编译运行.c文件
**方法一**
<br>点击右上角的三角形即可
<br>![mingw5](https://img.twiyin0.cn/other/teach/gcc/mingw5.png)
<br>
<br>**方法二**
<br>用终端编译运行
<br>首先在VScode内打开终端，输入gcc main.c编译c文件
:::tip
main.c是要编译的c文件
:::
我们可以看到文件夹内多了一个a.exe的文件
<br>使用./a.exe执行即可运行编译的文件
<br>![mingw6](https://img.twiyin0.cn/other/teach/gcc/mingw6.png)

# 配置C++环境

## VScode配置c++环境
VScode按下shift+ctrl+p后输入C/C++
<br>选择编辑配置(UI)
<br>![mingw2](https://img.twiyin0.cn/other/teach/gcc/mingw2.png)
<br>然后我们按以下来配置
<br>![mingw2](https://img.twiyin0.cn/other/teach/gcc/vsc1.png)
<br>![mingw2](https://img.twiyin0.cn/other/teach/gcc/vsc2.png)
<br>所以我们，仅需要将编译器更换即可，其他都与C环境相同

## VScode编译运行.cpp文件
**方法一**
<br>点击右上角的三角形即可
<br>![mingw5](https://img.twiyin0.cn/other/teach/gcc/vsc3.png)
<br>
<br>**方法二**
<br>用终端编译运行
<br>首先在VScode内打开终端，输入g++ main.cpp编译c++文件
:::tip
main.cpp是要编译的c++文件
:::
我们可以看到文件夹内多了一个a.exe的文件
<br>使用./a.exe执行即可运行编译的文件
<br>![mingw6](https://img.twiyin0.cn/other/teach/gcc/vsc4.png)
