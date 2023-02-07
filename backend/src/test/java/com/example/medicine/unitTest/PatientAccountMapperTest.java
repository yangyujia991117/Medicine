package com.example.medicine.unitTest;

import com.example.medicine.TmallApplicationTest;
import com.example.medicine.data.account.PatientAccountMapper;
import com.example.medicine.po.PatientAccount;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class PatientAccountMapperTest extends TmallApplicationTest {
    @Autowired
    PatientAccountMapper patientAccountMapper;

    @Test
    public void testGetAccountByPhoneNumber(){
        PatientAccount patientAccount= patientAccountMapper.getPatientAccountByPhoneNumber("12345678901");
        System.out.println(patientAccount.toString());
        Assert.assertEquals(patientAccount.getUserName(),"user0");
        Assert.assertEquals(patientAccount.getPassword(),"123456");
    }
}
