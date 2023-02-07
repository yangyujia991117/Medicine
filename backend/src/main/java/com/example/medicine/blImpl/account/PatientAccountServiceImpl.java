package com.example.medicine.blImpl.account;

import com.example.medicine.bl.account.PatientAccountService;
import com.example.medicine.data.account.PatientAccountMapper;
import com.example.medicine.po.PatientAccount;
import com.example.medicine.vo.PatientAccountInfo;
import com.example.medicine.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientAccountServiceImpl implements PatientAccountService {
    private final static String ACCOUNT_EXIST = "该手机号已被注册过！";
    private final static String ACCOUNT_NOT_EXIST = "账号不存在";
    private final static String WRONG_PSW = "密码错误";
    private final static String DELETE_FAIL = "账号删除失败";

    @Autowired
    PatientAccountMapper patientAccountMapper;

    @Override
    public ResponseVO registerPatientAccount(String userName, String password, String phoneNumber) {
        if(patientAccountMapper.getPatientAccountByPhoneNumber(phoneNumber)!=null){
            return ResponseVO.buildFailure(ACCOUNT_EXIST);
        }
        else{
            System.out.println("开始注册用户"+userName);
            PatientAccount patientAccount=new PatientAccount(userName,password,phoneNumber,"http://yangyujia.oss-cn-beijing.aliyuncs.com/1672831279408.jpg?Expires=1988191277&OSSAccessKeyId=LTAI5tSXR82EvWkwD53yaZFc&Signature=YMJwMxrIzZokSKuW%2BBnkcie9WyA%3D");
            return ResponseVO.buildSuccess(patientAccountMapper.addPatientAccount(patientAccount));
        }
    }

    @Override
    public ResponseVO loginPatientAccount(String phoneNumber,String password) {
        PatientAccount res= patientAccountMapper.getPatientAccountByPhoneNumber(phoneNumber);
        if (res == null) {
            return ResponseVO.buildFailure(ACCOUNT_NOT_EXIST);
        } else if (!res.getPassword().equals(password)) {
            return ResponseVO.buildFailure(WRONG_PSW);
        }
        return ResponseVO.buildSuccess(new PatientAccountInfo(res.getId(),res.getUserName(),res.getPassword(),res.getPhoneNumber(),res.getAvatar()));
    }

    @Override
    public ResponseVO deletePatientAccount(int id) {
        System.out.println("开始删除用户"+id);
        try{
            patientAccountMapper.deletePatientAccount(id);
            return ResponseVO.buildSuccess();
        }catch (Exception e){
            return ResponseVO.buildFailure(DELETE_FAIL);
        }
    }

    @Override
    public int getMaxId() {
        return patientAccountMapper.getMaxId();
    }
}
