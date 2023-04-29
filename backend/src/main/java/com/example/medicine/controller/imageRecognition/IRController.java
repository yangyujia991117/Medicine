package com.example.medicine.controller.imageRecognition;

import com.example.medicine.bl.imageRecognition.IRService;
import com.example.medicine.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

@RestController()
@RequestMapping("/Medicine/IRController")
public class IRController {
    private final static String RECOGNITION_FAIL_MSG = "识别失败";
    private final static String GETRESULT_FAIL_MSG = "查询记录失败";
    private final static String DELETE_FAIL_MSG = "删除失败";
    private final static String GETLASTRESULT_FAIL_MSG = "获取用户的最后一条识别记录失败";

    @Autowired
    IRService irService;

    @RequestMapping(value = "/testRecognize")
    @ResponseBody
    public ResponseVO recognize(@RequestParam(name = "img", required = false) MultipartFile[] files, String types,String userId,String time){
        try {
            System.out.println(time);
            System.out.println("=====IMAGE RECOGNITION START=====");
            return irService.recognize(files, Arrays.asList (types.split(",")), Integer.parseInt(userId),time);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseVO.buildFailure(RECOGNITION_FAIL_MSG);
        }
    }

    @GetMapping("/getIRResultByUserId")
    public ResponseVO getIRResultByUserId(int userId){
        try{
            return ResponseVO.buildSuccess(irService.getIRResultByUserId(userId));
        } catch (Exception e){
            e.printStackTrace();
            return ResponseVO.buildFailure(GETRESULT_FAIL_MSG);
        }

    }

    @DeleteMapping("/deleteIRResultById")
    public ResponseVO deleteIRResultById(int id){
        try{
            irService.deleteIRResultById(id);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseVO.buildFailure(DELETE_FAIL_MSG);
        }
        return ResponseVO.buildSuccess();
    }

    @GetMapping("/getLastIRResultByUserId")
    public ResponseVO getLastIRResultByUserId(int userId){
        try{
            return ResponseVO.buildSuccess(irService.getLastIRResultByUserId(userId));
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseVO.buildFailure(GETLASTRESULT_FAIL_MSG);
        }
    }



}
