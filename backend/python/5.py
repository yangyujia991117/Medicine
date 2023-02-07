#!/usr/bin/env python
# coding: utf-8

import sys
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing import image
import argparse
import decimal
from tensorflow.python.client import device_lib
import requests
from PIL import Image
from io import BytesIO


def predict(i):
    response=requests.get(i)
    img=Image.open(BytesIO(response.content))
    img=img.resize((32, 32),Image.ANTIALIAS)#更改图片尺寸
    # im.show()
    #print(device_lib.list_local_devices())#打印出tensorflow能使用的设备
    model = load_model("G:/研究生/CV小程序研究/Object-Recognition-master/py识别模型/model.h5")  # 这里填写模型的路径
    imgs=[]
    #img=image.load_img(i, target_size=(32, 32))

    x=image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    imgs.append(x)
    imgs = np.concatenate((imgs), axis=0)
    imgs = np.array(imgs, dtype=int)
    imgs_normalize = imgs.astype("float32") / 255.0

    pre_y = model.predict(imgs_normalize)

    # 单独指出rounding为四舍五入方式
    decimal.getcontext().rounding = "ROUND_HALF_UP"

    return ','.join(str(decimal.Decimal(str(n*100)).quantize(decimal.Decimal("0.01"))) for n in pre_y[0])#返回结果的字符串,每项保留两位小数

if __name__ == '__main__':
    #prediction = predict("G:/研究生/CV小程序研究/Object-Recognition-master/py识别模型/gaga.jpg")
    #prediction=predict("https://7375-summertest-0gfej1ol1f160513-1313132690.tcb.qcloud.la/1659320268269.png?sign=30a5d5cde6f62893a1b66903749d3bce&t=1660746263")
    #prediction = predict("http://yangyujia.oss-cn-beijing.aliyuncs.com/1660796343912.jpg?Expires=1976156336&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=rDY5Kh09%2Fc%2BtFnZXfq8r%2F0Qq1Tg%3D")
    prediction = predict(sys.argv[1])
    print(prediction)

