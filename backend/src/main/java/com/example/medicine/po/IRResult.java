package com.example.medicine.po;

public class IRResult {
    private int id;
    private int userId;
    private String urlList;
    private String resultTextList;
    private String resultImgList;
    private String recognitionTime;

    public IRResult(int userId,String urlList,String resultImgList,String resultTextList,String recognitionTime){
        this.userId=userId;
        this.urlList=urlList;
        this.resultTextList=resultTextList;
        this.resultImgList=resultImgList;
        this.recognitionTime=recognitionTime;
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

    public void setUrlList(String urlList) {
        this.urlList = urlList;
    }

    public String getUrlList() {
        return urlList;
    }

    public void setResultTextList(String resultTextList) {
        this.resultTextList = resultTextList;
    }

    public String getResultTextList() {
        return resultTextList;
    }

    public void setResultImgList(String resultImgList) {
        this.resultImgList = resultImgList;
    }

    public String getResultImgList() {
        return resultImgList;
    }

    public void setRecognitionTime(String recognitionTime) {
        this.recognitionTime = recognitionTime;
    }

    public String getRecognitionTime() {
        return recognitionTime;
    }

    @Override
    public String toString() {
        return "IRResult{" +
                "id=" + id +
                ", userId=" + userId +
                ", urlList='" + urlList + '\'' +
                ", resultTextList='" + resultTextList + '\'' +
                ", resultImgList='" + resultImgList + '\'' +
                ", recognitionTime='" + recognitionTime + '\'' +
                '}';
    }
}
