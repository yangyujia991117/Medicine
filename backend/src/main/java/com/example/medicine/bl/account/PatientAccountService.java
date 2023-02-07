package com.example.medicine.bl.account;

import com.example.medicine.vo.ResponseVO;

public interface PatientAccountService {
    /**
     * 注册病人账户
     */
    ResponseVO registerPatientAccount(String userName, String password, String phoneNumber);
    /**
     * 登录病人账户
     */
    ResponseVO loginPatientAccount(String phoneNumber,String password);
    /**
     * 删除用户
     */
    ResponseVO deletePatientAccount(int id);
    /**
     * 【测试专用】获得最大的病人账号id
     */
    int getMaxId();
}
