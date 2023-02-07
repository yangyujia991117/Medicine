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


def predict(i):
    model = load_model("G:/研究生/CV小程序研究/Object-Recognition-master/py识别模型/model.h5")  # 这里填写模型的路径
    imgs=[]
    img=image.load_img(i, target_size=(32, 32))
    x=image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    imgs.append(x)
    imgs = np.concatenate((imgs), axis=0)
    imgs = np.array(imgs, dtype=int)
    imgs_normalize = imgs.astype("float32") / 255.0

    pre_y = model.predict(imgs_normalize)

    # 单独指出rounding为四舍五入方式
    decimal.getcontext().rounding = "ROUND_HALF_UP"

    return ','.join(
        str(decimal.Decimal(str(n * 100)).quantize(decimal.Decimal("0.01"))) for n in pre_y[0])  # 返回结果的字符串,每项保留两位小数

if __name__ == '__main__':
    prediction=predict(sys.argv[1])
    print(prediction)

