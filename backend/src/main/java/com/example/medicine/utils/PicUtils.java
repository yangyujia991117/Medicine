package com.example.medicine.utils;

import net.coobird.thumbnailator.Thumbnails;
import org.slf4j.LoggerFactory;

import org.slf4j.Logger;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;

/**
 * 图片压缩工具
 */
public class PicUtils {
    private static final Logger logger= LoggerFactory.getLogger(PicUtils.class);
    private static final HashMap<Integer,Double> ACCURACY_HASHMAP = new HashMap<Integer,Double>(){{
        put(900,0.85);
        put(2047,0.6);
        put(3275,0.44);
        put(Integer.MAX_VALUE,0.4);
    }};
    private static final int[] SIZE_ARR=new int[]{900,2047,3275,Integer.MAX_VALUE};

    /**
     * 将图片压缩到指定大小
     * @param image 原图片字节流
     * @param scale 指定图片大小，单位KB
     * @return 压缩后的图片字节流
     */
    public static byte[] compressPicture(byte[] image,long scale){
        //这里要乘或者除以1024的原因：B和KB互相转换
        if(image==null||image.length<=0||image.length<=scale*1024){
            return image;//如果原图片为空或长度为0或不超过指定的大小，那么直接返回原图
        }
        long oldSize=image.length;//原大小
        double accuracy=getAccuracy(oldSize/1024);//压缩后的精度
        try{
            while(image.length>scale*1024){
                ByteArrayInputStream inputStream=new ByteArrayInputStream(image);
                ByteArrayOutputStream outputStream= new ByteArrayOutputStream(image.length);
                Thumbnails.of(inputStream)//输入源
                        .scale(accuracy)//控制图片尺寸（等比例缩小）
                        .outputQuality(accuracy)//控制图片质量，0-1之间，越接近1质量越高，这里缩小比例和质量降低比例一样，控制图片大小:质量比相同
                        .toOutputStream(outputStream);//输出
                image=outputStream.toByteArray();
            }
            logger.info("图片原大小={}KB | 压缩后大小={}KB",
                    oldSize / 1024, image.length / 1024);
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("图片压缩失败!");
        }
        return image;
    }

    /**
     * 根据图片大小调节压缩后的精度（根据网上资料的经验数值）
     * @param size
     * @return 图片压缩质量比
     */
    private static double getAccuracy(long size){
        double accuracy = 0;
        for(int i=0;i<SIZE_ARR.length;i++){
            if(size<SIZE_ARR[i]){
                accuracy= ACCURACY_HASHMAP.get(SIZE_ARR[i]);
                break;
            }
            if(i==SIZE_ARR.length-1){
                accuracy= ACCURACY_HASHMAP.get(Integer.MAX_VALUE);
            }
        }
        return accuracy;
    }
}
