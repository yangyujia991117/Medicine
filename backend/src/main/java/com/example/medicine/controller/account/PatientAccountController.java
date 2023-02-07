package com.example.medicine.controller.account;

import com.example.medicine.bl.account.PatientAccountService;
import com.example.medicine.bl.imageRecognition.IRService;
import com.example.medicine.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/Medicine/PatientAccountController")
public class PatientAccountController {
    private final static String REGISTER_ERROR_MSG = "注册失败！";
    private final static String LOGIN_ERROR_MSG = "登录失败！";
    @Autowired
    PatientAccountService patientAccountService;

    @PostMapping("/registerPatientAccount")
    public ResponseVO registerPatientAccount(@RequestParam(value = "userName") String userName, @RequestParam(value = "password") String password, @RequestParam(value = "phoneNumber") String phoneNumber){
        System.out.println("开始注册"+userName);
        try {
            return patientAccountService.registerPatientAccount(userName, password, phoneNumber);
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseVO.buildFailure(REGISTER_ERROR_MSG);
        }
    }

    @GetMapping("/loginPatientAccount")
    public ResponseVO loginPatientAccount(@RequestParam(value = "phoneNumber") String phoneNumber, @RequestParam(value = "password") String password) {
        try{
            return patientAccountService.loginPatientAccount(phoneNumber, password);
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseVO.buildFailure(LOGIN_ERROR_MSG);
        }
    }
}
