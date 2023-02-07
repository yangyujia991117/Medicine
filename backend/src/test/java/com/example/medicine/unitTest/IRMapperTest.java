package com.example.medicine.unitTest;

import com.example.medicine.TmallApplicationTest;
import com.example.medicine.data.imageRecognition.IRMapper;
import com.example.medicine.po.IRResult;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class IRMapperTest extends TmallApplicationTest {
    @Autowired
    IRMapper irMapper;

    @Test
    public void testGetIRResultByUserId(){
        List<IRResult> irResults= irMapper.getIRResultByUserId(1);
        for(IRResult irResult:irResults){
            System.out.println(irResult.toString());
        }
    }

}
