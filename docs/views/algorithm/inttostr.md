---
title: C/C++整型、浮点型转换为字符串
date: 2022-08-01
cover: https://img.twiyin0.cn/uploads/2022/628724b2b875d.jpg
tags:
 - C/C++
 - 算法
categories:
 - C/C++
---

使用C/C++的时候会遇到需要将整型与浮点型转换为字符串的情况  
为了避免自己把代码乱丢，将这两个函数放在博客里，方便找
<!-- more -->

# C/C++整型、浮点型转换为字符串
## 准备工作
* [支持C环境的编译器]
* [包含标准库及string.h]

## 整型转换为字符型
不多说吧，直接上函数  
```C
char* itoa(int num,char* str,int radix)
{
    //索引表
    char index[]="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //存放要转换的整数的绝对值,转换的整数可能是负数
    unsigned unum;
    //i用来指示设置字符串相应位，转换之后i其实就是字符串的长度；
    //转换后顺序是逆序的，有正负的情况。
    //k用来指示调整顺序的开始位置;j用来指示调整顺序时的交换。
    int i=0,j,k;
    //获取要转换的整数的绝对值
    //要转换成十进制数并且是负数
    if(radix==10&&num<0)
    {
        //将num的绝对值赋给unum
        unum=(unsigned)-num;
        //在字符串最前面设置为'-'号，并且索引加1
        str[i++]='-';
    }
    //若是num为正，直接赋值给unum
    else unum=(unsigned)num;
    //转换部分，注意转换后是逆序的
    do
    {
        //取unum的最后一位，并设置为str对应位，指示索引加1
        str[i++]=index[unum%(unsigned)radix];
        //unum去掉最后一位
        unum/=radix;
    //直至unum为0退出循环
    }while(unum);
    //在字符串最后添加'\0'字符，c语言字符串以'\0'结束。
    str[i]='\0';
    //将顺序调整过来
    //如果是负数，符号不用调整，从符号后面开始调整
    if(str[0]=='-') k=1;
    //不是负数，全部都要调整
    else k=0;
    //临时变量，交换两个值时用到
    char temp;
    //头尾一一对称交换，i其实就是字符串的长度，索引最大值比长度少1
    for(j=k;j<=(i-1)/2;j++)
    {
        //头部赋值给临时变量
        temp=str[j];
        //尾部赋值给头部
        str[j]=str[i-1+k-j];
        //将临时变量的值(其实就是之前的头部值)赋给尾部
        str[i-1+k-j]=temp;
    }
    //返回转换后的字符串
    return str;
}
```

## 浮点型转换为字符串
把整型转换成字符串后就简单了，原理都是一样的  
不过，整个函数我就没有加进制转换了，需要的可以自己加进去  
需要注意的是，我的函数仅是示例，精度是5个小数点  
如果需要修改精度，自己看懂后改吧  
```C
char* ftoa(float flt, char* ftastr)
{
	// 用于转换正整数的变量
    int dot,zh,i;
    // 存放原值，用于判断
    float ftemp;
    // 存放小数点
    char d[2]={'.'};
    // 存放转换后小数点前后的字符串
    char dots[100],zhs[100];
    // 连接整个结果的数组
    char *last;
    // 原值转存
    ftemp = flt;
    // 判断原值正负
    if(flt < 0) flt = -flt;
    // 原值转为整型
    flt = flt*100000;
    // 截取整数部分
    zh = (int)flt/100000;
    // 转换整数部分
    itoa(zh,zhs,10);
    // 转化小数部分
    dot = (int)((int)flt%100000);
    itoa(dot,dots,10);
    // 连接结果
    last = strcat(zhs,d);
    last = strcat(last,dots);
    // 判断原值正负
    if(ftemp >= 0)
        for(i=0;last[i]!='\0';i++)
            ftastr[i] = last[i];
    else
    {
        ftastr[0] = '-';
        for(i=0;last[i]!='\0';i++)
            ftastr[i+1] = last[i];
    }
    return ftastr;
}
```

## 使用方法及示例
* 整型转换为字符串
用法: itoa(要转换的整数,转换后的数组,转换后的进制)  
* 浮点型转化为字符串
用法：ftoa(要转换的浮点数,转化后的数组)  

示例：
```C
int main()
{
    int number1 = 123456;
    int number2 = -123456;
    float fl = 123.34567;
    char fta[20]={0};
    char string[16] = {0};
    itoa(number1,string,10);
    printf("int number %d change to string is: %s\n",number1,string);
    itoa(number2,string,10);
    printf("int number %d change to string is: %s\n",number2,string);
    ftoa(fl,fta);
    printf("float Number %f change to string is: %s", fl,fta);
    return 0;
}
```

输出结果：
```sh
PS D:\ProjectFile\c++\itoa> gcc .\a.c   #编译
PS D:\ProjectFile\c++\itoa> .\a.exe     #运行
int number 123456 change to string is: 123456           #运行结果输出第一行
int number -123456 change to string is: -123456         #运行结果输出第二行
float Number 123.345673 change to string is: 123.34567  #运行结果输出第三行
```
