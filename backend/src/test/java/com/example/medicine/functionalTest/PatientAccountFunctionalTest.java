package com.example.medicine.functionalTest;

import com.example.medicine.TmallApplicationTest;
import com.example.medicine.bl.account.PatientAccountService;
import com.example.medicine.vo.PatientAccountInfo;
import com.example.medicine.vo.ResponseVO;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class PatientAccountFunctionalTest extends TmallApplicationTest {
    @Autowired
    PatientAccountService patientAccountService;

    @Test
    public void testPatientRegister(){
        int oldMaxId= patientAccountService.getMaxId();
        patientAccountService.registerPatientAccount("test","123456","11111111111");
        int newMaxId=oldMaxId+1;
        int n=patientAccountService.getMaxId();
        Assert.assertEquals(newMaxId,n);
        patientAccountService.deletePatientAccount(newMaxId);
    }
    @Test
    public void testPatientLogin(){
        //密码错误的情况
        ResponseVO responseVO=patientAccountService.loginPatientAccount("12345678901","123");
        Assert.assertEquals("密码错误",responseVO.getMessage());
        //用户不存在的情况
        responseVO=patientAccountService.loginPatientAccount("123","123");
        Assert.assertEquals("账号不存在",responseVO.getMessage());
        //正常的情况
        responseVO=patientAccountService.loginPatientAccount("12345678901","123456");
        PatientAccountInfo patientAccountInfo=(PatientAccountInfo) responseVO.getContent();
        Assert.assertEquals(1,patientAccountInfo.getId());
    }

}
