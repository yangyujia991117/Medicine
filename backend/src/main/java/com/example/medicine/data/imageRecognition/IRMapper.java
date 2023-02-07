package com.example.medicine.data.imageRecognition;

import com.example.medicine.po.IRResult;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface IRMapper {
    void addIRResult(IRResult irResult);
    List<IRResult> getIRResultByUserId(int userId);
}
