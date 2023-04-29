package com.example.medicine.bl.imageRecognition;

import com.example.medicine.po.IRResult;
import com.example.medicine.vo.IRResultVO;
import com.example.medicine.vo.ResponseVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IRService {
    /**
     * 图像识别
     */
    ResponseVO recognize(MultipartFile[] files, List<String> types, int userId, String recognitionTime);

    /**
     * 获取某用户的识别记录
     */
    List<IRResultVO> getIRResultByUserId(int userId);

    /**
     * 删除用户的某条识别记录
     */
    void deleteIRResultById(int id);

    /**
     * 获得某用户的最后一条识别记录
     */
    IRResultVO getLastIRResultByUserId(int userId);
}
