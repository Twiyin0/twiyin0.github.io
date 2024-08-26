---
title: 记一次抢救阵列数据
date: 2024-08-26
collapsable: true
lineNumbers: false
tags:
 - RAID
 - Linux
 - 抢救
categories: 
 - 学习
 - 经验
---  

:::tip
author @on33335
:::

#前言
我某次使用 Webmin 寻思给原本三块硬盘的 RAID5 阵列添加一块 spare 磁盘，随后将原来的 3T 成员换成 4T. 结果按下添加之后变成了成员，阵列总大小也扩容了。
我当时寻思哎 RAID5 就 RAID5 吧，少一块也死不了，然后把四盘 RAID5 拔了一块，阵列变成 Degraded 接着用。
这个以前的想法差点害死现在的我。

#traceback
当我打开nas的盖子，拔出一块我以为是 3T WD绿盘的时候看到了一抹紫色。
当时我就 panic 了，火速塞回并回到笔记本前面查看阵列状态，看到一抹红色 Failed.
当时没怀疑为什么插回去不自动回到阵列，也没尝试停止之后再启动，而是尝试再用 Webmin 的添加硬盘。
这一步就导致了我的硬盘元数据被标记成了 Spare 而非成员。

#疯狂寻找解决方案
那我肯定是 Bing 搜索怎么抢救raid阵列，以及 mdadm 的手册。

我去搜了一下发现个[非常有意思的玩法](https://raid.wiki.kernel.org/index.php/Recovering_a_damaged_RAID)，依照此我去创了个镜像，去不断force assemble (没成功，因为元数据已经报告是 spare 成员)
然后我又看了一下[文档](https://raid.wiki.kernel.org/index.php/RAID_superblock_formats)，发现1.2版本的元数据在0x1000(4k)存储，0x10A0控制着成员是第几块硬盘，改了之后examine成功识别
```
# mdadm --examine /dev/mapper/sdf
/dev/mapper/sdf:
          Magic : a92b4efc
        Version : 1.2
    Feature Map : 0x1
     Array UUID : [REDACTED]
           Name :[REDACTED]
  Creation Time : Tue May 17 22:51:15 2022
     Raid Level : raid5
   Raid Devices : 4

 Avail Dev Size : 7813773360 sectors (3.64 TiB 4.00 TB)
     Array Size : 8790403968 KiB (8.19 TiB 9.00 TB)
  Used Dev Size : 5860269312 sectors (2.73 TiB 3.00 TB)
    Data Offset : 263808 sectors
   Super Offset : 8 sectors
   Unused Space : before=263728 sectors, after=1953504048 sectors
          State : clean
    Device UUID : [REDACTED]

Internal Bitmap : 8 sectors from superblock
    Update Time : Sun Aug 25 14:04:10 2024
  Bad Block Log : 512 entries available at offset 24 sectors
       Checksum : 448a0db2 - expected 448a0db0
         Events : 491050

         Layout : right-asymmetric
     Chunk Size : 64K

   Device Role : Active device 3
   Array State : A.AA ('A' == active, '.' == missing, 'R' == replacing)
```

随后`--assemble --force`, 不出意外出意外了

```
[29979631.580878] md: invalid superblock checksum on dm-2
[29979631.580886] md: dm-2 does not have a valid v1.2 superblock, not importing!
[29979631.580893] md: md_import_device returned -22
[29979631.581194] md: md0 stopped.
```

又重新翻找了一下文档
，只看到一个checksum相关的`sb_csum`，然后克隆kernel找（
usr/include/linux/raid/md_p.h
__u32 sb_csum;  /*  6 checksum of the whole superblock        */
然后脱裤子放屁了一把才发现mdadm早就报告了`Checksum : 448a0db2 - expected 448a0db0`
我直接hexedit把0x10d8改成448a0db0，再次`mdadm --examine /dev/mapper/sdf`发现
`Checksum : b00d8a44 - expected 448a0db0`
再次改正，examine显示
`Checksum : 448a0db0 - correct`
好！

```
#  mdadm --assemble /dev/md0 /dev/mapper/sdd /dev/mapper/sde /dev/mapper/sdf
mdadm: /dev/md0 has been started with 3 drives (out of 4).
```

撒花！
