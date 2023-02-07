package com.example.medicine.data.account;

import com.example.medicine.po.PatientAccount;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PatientAccountMapper {
    PatientAccount getPatientAccountByPhoneNumber(String phoneNumber);

    int addPatientAccount(PatientAccount patientAccount);

    void deletePatientAccount(int id);

    int getMaxId();
}
