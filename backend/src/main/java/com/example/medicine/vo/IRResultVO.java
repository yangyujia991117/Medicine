package com.example.medicine.vo;

import java.util.ArrayList;
import java.util.List;

public class IRResultVO {
//    List<String> resultImgList;//结果返回的图片列表
//    List<String> resultTextList;//结果返回的文本列表
//
//    public IRResultVO(){
//        this.resultImgList=new ArrayList<>();
//        this.resultTextList=new ArrayList<>();
//    }
//
//    public List<String> getResultImgList() {
//        return resultImgList;
//    }
//
//    public void setResultImgList(List<String> resultImgList) {
//        this.resultImgList = resultImgList;
//    }
//
//    public List<String> getResultTextList() {
//        return resultTextList;
//    }
//
//    public void setResultTextList(List<String> resultTextList) {
//        this.resultTextList = resultTextList;
//    }
//
//    public void addResult(String img,String text){
//        this.resultImgList.add(img);
//        this.resultTextList.add(text);
//    }
//
//    public void addResultImgList(String img){
//        this.resultImgList.add(img);
//    }
//
//    public void addResultTextList(String t){
//        this.resultTextList.add(t);
//    }
    int id;
    int userId;
    List<IRResultItem> resultList;
    String recognitionTime;
    public IRResultVO(int id,int u,List<IRResultItem> l,String t){
        this.id=id;
        this.userId=u;
        this.resultList=l;
        this.recognitionTime=t;
    }

    public IRResultVO() {

    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setResultList(List<IRResultItem> resultList) {
        this.resultList = resultList;
    }

    public List<IRResultItem> getResultList() {
        return resultList;
    }

    public void setRecognitionTime(String recognitionTime) {
        this.recognitionTime = recognitionTime;
    }

    public String getRecognitionTime() {
        return recognitionTime;
    }
}
