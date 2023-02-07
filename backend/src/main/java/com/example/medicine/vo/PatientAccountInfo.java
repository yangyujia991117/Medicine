package com.example.medicine.vo;

public class PatientAccountInfo {
    private int id;
    private String userName;
    private String password;
    private String phoneNumber;
    private String avatar;

    public PatientAccountInfo(){

    }

    public PatientAccountInfo(int id,String userName,String password,String phoneNumber,String avatar){
        this.id=id;
        this.userName=userName;
        this.password=password;
        this.phoneNumber=phoneNumber;
        this.avatar=avatar;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatar() {
        return avatar;
    }
}
