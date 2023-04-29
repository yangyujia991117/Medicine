package com.example.medicine.data.imageRecognition;

import com.example.medicine.po.IRResult;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.SelectKey;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface IRMapper {
    int addIRResult(IRResult irResult);
    List<IRResult> getIRResultByUserId(int userId);
    void deleteIRResultById(int id);
    IRResult getLastIRResultByUserId(int userId);
}
