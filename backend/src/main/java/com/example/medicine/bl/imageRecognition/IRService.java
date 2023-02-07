package com.example.medicine.bl.imageRecognition;

import com.example.medicine.po.IRResult;
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
    List<IRResult> getIRResultByUserId(int userId);
}
