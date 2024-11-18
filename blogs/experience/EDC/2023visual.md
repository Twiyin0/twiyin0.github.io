---
title: 2023年全国大学生电子设计大赛E题视觉思路
date: 2023-08-07
cover: https://up.iin0.cn/2023/645514a4c2569.png
tags:
 - 电赛
categories: 
 - 经验
---  

# 2023年全国大学生电子设计大赛E题视觉思路
这些都是我和队友们茶不思夜不寐苦想出来的 *** 转载请注明来源 ***
## 背景
第一次玩视觉和python，整完智能车只有十几天的时间学。  
可能有些地方不太对，欢迎各位大佬指正。  
题目要求详见[2023年TI杯>>E题-运动目标控制与自动追踪系统](https://res.nuedc-training.com.cn/topic/2023/topic_99.html)
## 选型
选型这块没什么好说的，市面上的视觉处理都能用。OpenMV，k210，v831，树莓派都可以。  
K210由于没有USB口，链接IDE调试的时候帧率极低，实际效果需要实测才能知道。只是追踪色块还是够用的。
## 设计思路
- 按组委会的问答看，摄像头是随意可以随意摆放的，保持激光和屏幕的距离为一米即可。我的思路是红点跟着摄像头一起动，绿点静止。
- 激光的斑点大小小于等于1cm，光晕不算在内，激光笔的光晕可以大点，方便识别。加上滤光片可以减小环境光的影响。
- 摄像头的视角尽量把整个屏幕看到特别的静止的摄像头，最理想的情况是摄像头的视角刚好是整个屏幕，可以减少外界堆识别的影响。
- 黑色胶带会吸光，这点需要考虑在内。任何光线影响都是可以通过调整曝光解决的，可以试着手动调节曝光，达到理想的效果
- 云台的可控精度一定要高，这是整个题的关键，精度不高说啥都没用。

## 视觉处理
这次视觉部分比较简单，只要寻找色块和四边形即可。可以不涉及机器学习。  
1、有关基础第一题和第二题：对摄像头要求很高，如果没有高清晰度的摄像头我建议开环。第二题确实能看到铅笔画的框可以用边缘检测+find_rects(寻找矩形)或者fine_line(巡直线)  
2、基础部分三次题1.8cm宽的胶带找出来很方便，要招红色斑点得调曝光值，当然如果滤光片效果好也是可以的。
3、发挥部分主要是招色块了这部分用find_blobs都能解决。

## 解题思路
手上资源有限，我们手上只有一个OpenMV H7和一个V831，我选择用更熟悉的OpenMV作为主处理，V831来找两个激光，毕竟v831的摄像头要好的多，容易找。  
关于基础第三四题的思路，我们采用半开环。  
第三题，摄像头跟着云台动，用摄像头找到四边形第一个角，然后写死。  
第四题，摄像头跟着云台动，用摄像头找到四边形第一个角，然后划线到第二个角以此类推。  
摄像头的中心点就是红色激光笔打在屏幕上的地方，理论上是可行的。但实际上云台在动的时候摄像头会抖，导致这题分就被扣完了。所以为了保险再找个红点修正误差。或者通过相似三角形把图像的坐标映射到屏幕上。加个陀螺仪然后写死比例。

## V831处理处理矩形和红点参考
V831可以参考这篇[Neucrack-关于2023年电赛E题的简单思考](https://maixhub.com/share/8)  
所说的maix II DOCK就是v831  

## OpenMV处理矩形和红点参考
使用OpenMV就比较简单了，把曝光值一调，红绿点就找出来了，如果想要同时识别矩形，就得把曝光值调回来，不然会一片黑。  
可以采用状态机的思想来做，下面是我的shi山代码，思路可以做参考，多少会有点问题，不要直接cv。  
下面的思路就是找到第一个点，然后云台写死比例，让云台绕着算出来的路径划线。  
```python
import sensor, image, time
from pyb import UART

sensor.reset()
sensor.set_pixformat(sensor.RGB565)
sensor.set_framesize(sensor.QQVGA)  # H7 Plus可以用QVGA看的更清楚
sensor.set_vflip(True)              # 图像镜像
sensor.set_hmirror(True)
sensor.skip_frames(time = 2000)
uart = UART(3, 115200)              # 串口初始化
clock = time.clock()
# 红色的LAB阈值
THRESHOLD = (6, 98, 5, 39, -3, 18)
# 屏幕中心点对应的图像中坐标
center_point = (80, 37)
# 我需要给队友发的几个点
first_point = [0, 0]
second_point = [0, 0]
last_point  = [0, 0]
# 状态机
state = 0
# 红点位置
red = 0
redpoint = [0,0]
# 临时变量
pian_x0 = [99,99,99]
pian_y0 = [99,99,99]
i=0

def area(x1, y1, x2, y2, x3, y3):
    """计算三角形面积"""
    return abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) / 2.0)

def is_inside_polygon(x1, y1, x2, y2, x3, y3, x4, y4, cx, cy):
    """检查点(cx, cy)是否在四边形内部"""
    # 计算四边形的面积
    total_area = area(x1, y1, x2, y2, x3, y3) + area(x1, y1, x4, y4, x3, y3)

    # 计算点和四边形各个顶点构成的四个三角形的面积
    a1 = area(cx, cy, x1, y1, x2, y2)
    a2 = area(cx, cy, x2, y2, x3, y3)
    a3 = area(cx, cy, x3, y3, x4, y4)
    a4 = area(cx, cy, x4, y4, x1, y1)

    # 如果这四个三角形的面积之和等于四边形的面积，则点在四边形内部；否则，点在四边形外部
    return total_area == a1 + a2 + a3 + a4

# 找最大色块
def find_max(blobs):
    max_size=0
    for blob in blobs:
        if blob[2]*blob[3] > max_size:
            max_blob=blob
            max_size = blob[2]*blob[3]
    return max_blob

while(True):
    clock.tick()
    if state != 2:  # 状态2是找红点的，所以状态2不能进入下面的程序
        img = sensor.snapshot().lens_corr(strength = 1.8, zoom = 1.0) ## 畸变矫正，就是关掉摄像头的鱼眼效果
        # 找矩形
        for r in img.find_rects(threshold = 10000):
            img.draw_rectangle(r.rect(), color = (255, 0, 0))
            if r.magnitude() > 20000 and r.magnitude() < 60000:
                for p in r.corners(): img.draw_circle(p[0], p[1], 3, color = (0, 255, 0))
            if state == 0:
                if r.magnitude() > 20000 and r.magnitude() < 60000:
                    pianx = int(r.corners()[3][0])+3-int(center_point[0])
                    piany = int(r.corners()[3][1])+3-int(center_point[1])
                    print("pianx:%4d  piany:%4d  main:%4d\r\n" % (pianx, piany, r.magnitude()))
                    # 把第一个点的偏差发给主控
                    uart.write("pianx:%4d  piany:%4d\r\n" % (pianx, piany))
                    pian_x0[i] = pianx
                    pian_y0[i] = piany
                    i = i+ 1
                    if i>=3:
                        i=0
    #                print("x1:%4d  y1:%4d  x2:%4d  y2:%4d  x3:%4d  y3:%4d x00:%4d x01:%4d x02:%4d\r\n"%(first_point[0], \
    #                    first_point[1], second_point[0], second_point[1], last_point[0], last_point[1], \
    #                    pian_x0[0],pian_x0[1],pian_x0[2]))
                    # 因为不是狠熟悉python的用法，所以就简单粗暴点，整个是检测到激光是否稳定打到第一个点
                    if pian_x0[0] ==0 and pian_x0[1] == 0 and pian_x0[2] == 0 and pian_y0[0] == 0 and pian_y0[1] == 0 and pian_y0[2] == 0:
                        # 满足就进入状态1
                        state = 1
                        first_point[0] = int(r.corners()[3][0])+1
                        first_point[1] = int(r.corners()[3][1])+1
                        second_point[0] = int(r.corners()[2][0])-1
                        second_point[1] = int(r.corners()[2][1])+1
                        last_point[0]  = int(r.corners()[1][0])-1
                        last_point[1]  = int(r.corners()[1][1])-1
                        time.sleep_ms(500)
            # 状态1: 把剩下的三个点发给主控，实现半闭环
            if state == 1: 
                uart.write("x1:%4d  y1:%4d  x2:%4d  y2:%4d  x3:%4d  y3:%4d\r\n"%(first_point[0], \
                          first_point[1], second_point[0], second_point[1], last_point[0], last_point[1]))
                print("x1:%4d  y1:%4d  x2:%4d  y2:%4d  x3:%4d  y3:%4d\r\n"%(first_point[0], \
                first_point[1], second_point[0], second_point[1], last_point[0], last_point[1]))
                time.sleep_ms(500)
                state = 2   # 发完以后进入状态2
    # 状态2: 降低曝光，找红点
    if state == 2:
        # 调整增益和曝光值
        sensor.set_auto_gain(False)
        sensor.set_auto_exposure(False, exposure_us=1400)
        sensor.set_auto_whitebal(False)
        img2 = sensor.snapshot().lens_corr(strength = 1.8, zoom = 1.0)
        blobs = img2.find_blobs([THRESHOLD])    # 找红点
        if blobs:
            max_blob = find_max(blobs)
            redpoint[0]=max_blob.cx()
            redpoint[1]=max_blob.cy()
            # 限幅，在屏幕外面的红点就不发给主控
            if 20 < redpoint[0] < 140 and 10 < redpoint[1] < 70:
                img2.draw_cross(max_blob.cx(), max_blob.cy(), color=(0, 255, 128))
                print("cx: %4d  cy: %4d"%(max_blob.cx(),max_blob.cy()))
                uart.write("cx:%4d  cy:%4d\r\n"%(redpoint[0],redpoint[1]))
        else:
            red = 0
        uart.write("red:%2d\r\n" % red)
        state = 3   # 转到状态3
    # 状态3: 继续找矩形，因为是半闭环这里主要是用来判断红点是否出界
    if state == 3:
        # 把增益和曝光调回来
        sensor.set_auto_gain(True)
        sensor.set_auto_exposure(True)
        sensor.set_auto_whitebal(False)
        img3 = sensor.snapshot().lens_corr(strength = 1.8, zoom = 1.0) ## 畸变矫正
        for r in img3.find_rects(threshold = 10000):
            img3.draw_rectangle(r.rect(), color = (255, 0, 0))
            if r.magnitude() > 20000 and r.magnitude() < 60000:
                for p in r.corners(): img3.draw_circle(p[0], p[1], 3, color = (0, 255, 0))
        # 检测红点在不在矩形里面，在里面为1，外面为-1
        if is_inside_polygon(r.corners()[3][0],r.corners()[3][1], r.corners()[2][0],r.corners()[2][1],\
                             r.corners()[1][0],r.corners()[1][1], r.corners()[0][0],r.corners()[0][1],\
                             redpoint[0],redpoint[1]):
#            print("True")
            red = 1
        else:
#            print("False")
            red = -1
        uart.write("red:%2d\r\n" % red)
#        print("red: %2d" % red)
#        print(abs(r.corners()[3][0]-redpoint[0]),abs(r.corners()[3][1]-redpoint[1]))
        # 检测到红点差不多打回第一个点就退出状态，否则回去找红点
        if abs(r.corners()[3][0]-center_point[0])<13 and abs(r.corners()[3][1]-center_point[1])<15:
            state = 0
        else:
            state = 2
```
上面代码经过验证是可行的，就是有玄学成分。  
下面代码思路是找到第一个点，然后慢慢划线到第二个点，然后第三个，第四个以此类推。（未经过验证，只是理论）  
```python
import sensor, image, time
from pyb import UART

sensor.reset()
sensor.set_pixformat(sensor.RGB565)
sensor.set_framesize(sensor.QQVGA)  # H7 Plus可以用QVGA看的更清楚
sensor.set_vflip(True)              # 图像镜像
sensor.set_hmirror(True)
sensor.skip_frames(time = 2000)
uart = UART(3, 115200)              # 串口初始化
clock = time.clock()

# 屏幕中心点对应的图像中坐标
center_point = (80, 40)
# 状态机
state = 0
# 记录四个点的坐标
rect_points = []
# 记录面积
area = 0

while(True):
    clock.tick()
    img = sensor.snapshot().lens_corr(strength = 1.8, zoom = 1.0) ## 畸变矫正，就是关掉摄像头的鱼眼效果
    # 找矩形
    for r in img.find_rects(threshold = 10000):
        # 画出找到的矩形
        img.draw_rectangle(r.rect(), color = (255, 0, 0))
        # 记录面积
        area = r.magnitude()
        # 限制矩形大小，太大太小抖滤掉
        if area > 20000 and area < 53000:
            # 用圆出四个角
            rect_points = []
            for p in r.corners():
                img.draw_circle(p[0], p[1], 3, color = (0, 255, 0))
                rect_points.append(p)   # 记录坐标点
    # 状态0: 找第一个角
    if state == 0:
        err_p1=(rect_points[3][0]-center_point[0],rect_points[3][1]-center_point[1])
        if area > 20000 and area < 53000:
            print("p1_x:%4d  p1_y:%4d\r\n" % (err_p1[0], err_p1[1]))
            # 把第一个点的偏差发给主控
            uart.write("p1_x:%4d  p1_y:%4d\r\n" % (err_p1[0], err_p1[1]))
        if err_p1[0] < 2 and err_p1[1] < 2:
            state = 1
    # 状态1: 找第二个角
    if state == 1:
        err_p2=(rect_points[2][0]-center_point[0],rect_points[2][1]-center_point[1])
        if area > 20000 and area < 53000:
            print("p2_x:%4d  p2_y:%4d\r\n" % (err_p2[0], err_p2[1]))
            # 把第二个点的偏差发给主控
            uart.write("p2_x:%4d  p2_y:%4d\r\n" % (err_p2[0], err_p2[1]))
        if err_p2[0] < 2 and err_p2[1] < 2:
            state = 2
    # 状态2: 找第三个角
    if state == 2:
        err_p3=(rect_points[1][0]-center_point[0],rect_points[1][1]-center_point[1])
        if area > 20000 and area < 53000:
            print("p3_x:%4d  p3_y:%4d\r\n" % (err_p3[0], err_p3[1]))
            # 把第三个点的偏差发给主控
            uart.write("p3_x:%4d  p3_y:%4d\r\n" % (err_p3[0], err_p3[1]))
        if err_p3[0] < 2 and err_p3[1] < 2:
            state = 3
    # 状态3: 找第四个角
    if state == 3:
        err_p4=(rect_points[0][0]-center_point[0],rect_points[0][1]-center_point[1])
        if area > 20000 and area < 53000:
            print("p4_x:%4d  p4_y:%4d\r\n" % (err_p4[0], err_p4[1]))
            # 把第四个点的偏差发给主控
            uart.write("p4_x:%4d  p4_y:%4d\r\n" % (err_p4[0], err_p4[1]))
        if err_p4[0] < 2 and err_p4[1] < 2:
            state = 0

```
*** 上述代码未经验证，绝对会有逻辑错误，仅提供思路 ***  

## V831寻找色块参考
我V831搭载的摄像头不错，不调曝光也能看到红点和绿点。  
这段其实没什么好说的，都是官方例程，直接上代码吧。  
```python
from maix import image, display, camera
import serial

ser = serial.Serial("/dev/ttyS1",115200)  # 串口初始化
green = [(59, 100, -27, -5, -128, 127)]   # [绿光点大点(69, 86, -50, -32, -51, 70) 小点[(59, 100, -27, -5, -128, 127)]]
red   = [(52,  77,  10,  39, -14,   8)]   # [红光点(68, 97, 17, 42, -21, 41)]  [(61, 75, 18, 39, 0, 17)]
camera.camera.config(size=(240, 240))

grn_point = (0,0)
red_point = (0,0)

while True:
    img = camera.capture()
    g_blobs = img.find_blobs(green, merge=True)    #在图片中查找lab阈值内的颜色色块 merge 合并小框。
    r_blobs = img.find_blobs(red  , merge=True)
    if g_blobs:
        for i in g_blobs:
            grn_point = (int(i["centroid_x"]),int(i["centroid_y"]))
            img.draw_rectangle(i["x"], i["y"], i["x"] + i["w"], i["y"] + i["h"], 
                               color=(0, 0, 255), thickness=1) #将找到的颜色区域画出来
            # print("g_cx:%4d , g_cy:%4d" % (grn_point[0],grn_point[1]))
    if r_blobs:
        for j in r_blobs:
            red_point = (int(j["centroid_x"]),int(j["centroid_y"]))
            img.draw_rectangle(j["x"], j["y"], j["x"] + j["w"], j["y"] + j["h"], 
                               color=(255, 0, 0), thickness=1) #将找到的颜色区域画出来
            # print("r_cx:%4d , r_cy:%4d" % (red_point[0],red_point[1]))
    ser.write(b"err_x:%4d  err_y:%4d\r\n" % ((red_point[0]-grn_point[0]),(red_point[1]-grn_point[1])))
    display.show(img)
```
### V831调整增益和曝光
如果摄像头实在看不到红点和绿点可以和openMV一样调整增益和曝光  
原文：[sipeed wiki](https://wiki.sipeed.com/soft/maixpy3/zh/api/maix/camera.html)
```python
from maix import camera, display, image
camera.config(size=(224, 224))
exp, gain = 16, 16 # 初值，exp 曝光[0, 65536]，gain 增益[16 - 1024]，随意设置得值会受到驱动限制。
for i in range(120):
    exp, gain = exp + 32, gain + 16
    camera.config(exp_gain=(exp, gain))
    img = camera.capture()
    display.show(img)
camera.config(exp_gain=(0, 0)) # 设置为 0, 0 表示放弃控制恢复成自动曝光。
```
如果需要旋转图像可以参考[sipeed wiki](https://wiki.sipeed.com/soft/maixpy3/zh/api/maix/image.html)

## 树莓派(opencv)寻找色块和矩形参考
我们对树莓派和opencv了解不深，不过可以参考一下[这篇博客](https://blog.csdn.net/See_Star/article/details/103044722)  
里面说的挺简洁的  

## 总结
其实今年这题就纯比硬件，高精度决定上限，题目虽然看起来不难，但是要求的精度特别高。  
对于云台和摄像头来说都是挑战，像我们这些穷小子是玩不来的（泣了）
