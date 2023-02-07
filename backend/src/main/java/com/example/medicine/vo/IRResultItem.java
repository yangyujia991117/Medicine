package com.example.medicine.vo;

public class IRResultItem {
    String path="";
    String text="";

    public IRResultItem(){
        this.path="";
        this.text="";
    }
    public IRResultItem(String path,String text){
        this.path=path;
        this.text=text;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
