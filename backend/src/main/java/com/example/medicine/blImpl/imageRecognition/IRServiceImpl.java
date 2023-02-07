package com.example.medicine.blImpl.imageRecognition;

import com.aliyun.oss.OSSClient;
import com.example.medicine.bl.imageRecognition.IRService;
import com.example.medicine.data.imageRecognition.IRMapper;
import com.example.medicine.po.IRResult;
import com.example.medicine.vo.IRResultItem;
import com.example.medicine.vo.IRResultVO;
import com.example.medicine.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;
import java.util.*;

@Service
public class IRServiceImpl implements IRService {

    private final static String IMAGESDIR_NAME="G:/研一下/医学小程序/代码/backend/images";
    private final static String ALIYUN_IMAGESDIR_NAME="images";
    private final static String PYTHON_PATH="D:/Anaconda3/envs/py36/python";
    private final static String PYTHONFILE_LOCAL="G:\\研一下\\医学小程序\\代码\\backend\\python\\4.py";
    private final static String PYTHONFILE_ALIYUN="G:\\研一下\\医学小程序\\代码\\backend\\python\\5.py";
    private final static String RECOGNIZE_FAIL = "识别失败";
    private final static String FILE_SEPERATOR="/";

    @Autowired
    IRMapper irMapper;


    @Override
    public ResponseVO recognize(MultipartFile[] files, List<String> types, int userId, String recognitionTime) {
        //保存在本地
        //List<String> fileNames=savePictureLocal(files,types,userId);
        //上传阿里云
        List<String> fileNames=savePictureAliyun(files,types,userId);
        if(fileNames==null){
            return ResponseVO.buildFailure(RECOGNIZE_FAIL);
        }
        for(String fileName:fileNames){
            System.out.println(fileName);
        }

        return ResponseVO.buildSuccess(execRecognize(fileNames,types,userId,recognitionTime,"阿里云"));
    }

    @Override
    public List<IRResult> getIRResultByUserId(int userId) {
        return irMapper.getIRResultByUserId(userId);
    }

    /**
     * 保存图片到本地
     */
    private List<String> savePictureLocal(MultipartFile[] files,List<String> types,int userId){
        System.out.println("-----SAVE PICTURE-----");
        OutputStream os = null;
        InputStream inputStream = null;

        List<String> fileNames=new ArrayList<>();

        //为这次上传的图片新建一个文件夹，文件夹名为“时间戳.随机数"
        String newDirName=IMAGESDIR_NAME+FILE_SEPERATOR+ userId+"."+System.currentTimeMillis() +"."+(Math.random() * 9 + 1) * 10000;
        File newDir=new File(newDirName);
        newDir.mkdirs();

        //一张张地保存图片
        MultipartFile picture;
        String fileName="";
        for(int i=0;i<files.length;i++) {
            picture=files[i];
            try {
                inputStream = picture.getInputStream();//获取图片的输入流
                fileName = newDirName+ FILE_SEPERATOR + i+"-"+types.get(i)+"-"+picture.getOriginalFilename();//获取图片的名称

                byte[] bs = new byte[1024];//1k的数据缓冲
                os = new FileOutputStream(fileName);
                // 开始读取
                int len;
                while ((len = inputStream.read(bs)) != -1) {
                    os.write(bs, 0, len);
                }
                fileNames.add(fileName);

            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }
        }
        try {
            assert os != null;
            os.close();
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return fileNames;
    }

    /**
     * 上传图片到阿里云
     */
    private List<String> savePictureAliyun(MultipartFile[] files,List<String> types,int userId){
        System.out.println("-----SAVE PICTURE TO ALIYUN-----");
        String endpoint = "http://oss-cn-beijing.aliyuncs.com";
        String accessKeyId = "LTAI5tSXR82EvWkwD53yaZFc";
        String accessKeySecret = "MZwxFhVpw27Jj7MnJ2tDquDvapmMpS";
        String bucketName = "yangyujia";
        // 创建OSSClient实例。
        OSSClient ossClient = new OSSClient(endpoint, accessKeyId, accessKeySecret);

        List<String> fileNames=new ArrayList<>();
        String newDirName=ALIYUN_IMAGESDIR_NAME+FILE_SEPERATOR+ userId+"." +System.currentTimeMillis() +"."+(Math.random() * 9 + 1) * 10000;

        //一张张地保存图片
        MultipartFile picture;
        String fileName="";
        for(int i=0;i< files.length;i++){
            picture=files[i];
            fileName = newDirName + FILE_SEPERATOR + i+"-"+types.get(i)+"-"+picture.getOriginalFilename();//获取图片的名称

            try {
                //不压缩，直接获得图片文件流
                InputStream inputStream = picture.getInputStream();
                //上传图片到阿里云
                System.out.println("开始上传阿里云");
                ossClient.putObject(bucketName, fileName, inputStream);
                //设置URL过期时间为10年。
                Date expiration = new Date(System.currentTimeMillis() + 3600L * 1000 * 24 * 365 * 10);//设置过期时间为10年
                // 生成以GET方法访问的签名URL，访客可以直接通过浏览器访问相关内容。
                URL url = ossClient.generatePresignedUrl(bucketName, fileName, expiration);
                System.out.println("图片已上传阿里云，访问链接为：" + url.toString());

                fileNames.add(String.valueOf(url));
            }
            catch (IOException e) {
                e.printStackTrace();
                return null;
            }

        }
        ossClient.shutdown();
        return fileNames;
    }

    /**
     * 识别
     */
    private IRResultVO execRecognize(List<String> fileNames, List<String> types, int userId,String recognitionTime,String pattern){
        System.out.println("-----RECOGNIZE PICTURE-----");
        //String result="";
        List<IRResultItem> irResultItems=new ArrayList<>();
        IRResultVO irResultVO=new IRResultVO();
        String resultTextList="";
        for(int i=0;i<fileNames.size();i++){
            try{
                String[] cmds = new String[] { PYTHON_PATH,
                        PYTHONFILE_LOCAL,
                        fileNames.get(i)};//识别单张图片
                if(pattern.equals("阿里云")){
                    cmds = new String[] { PYTHON_PATH,
                            PYTHONFILE_ALIYUN,
                            fileNames.get(i)};//识别单张图片
                }
                Process proc = Runtime.getRuntime().exec(cmds);// 执行py文件

                BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
                BufferedReader inERROR = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
                String r="";
                String line = null;
                while ((line = in.readLine()) != null) {
                    System.out.println(line);
                    r=r+line;
                }
                String lineERROR=null;
                while ((lineERROR = inERROR.readLine()) != null) {
                    System.out.println("错误信息:"+lineERROR);
                }
                in.close();
                inERROR.close();
                proc.waitFor();
                //result=result+";"+r;
                //irResultVO.addResult(fileNames.get(i),"结果结果结果结果结果"+i );
                irResultItems.add(new IRResultItem(fileNames.get(i),"结果结果结果结果结果"+i));
                if(i==fileNames.size()-1){
                    resultTextList=resultTextList+"结果结果结果结果结果"+i+";";
                }
                else{
                    resultTextList=resultTextList+"结果结果结果结果结果"+i;
                }
            }catch (IOException | InterruptedException e) {
                e.printStackTrace();
                return new IRResultVO();
            }
        }
        try {
            irMapper.addIRResult(new IRResult(userId, String.join(";", fileNames), String.join(";", fileNames), resultTextList,recognitionTime));
        }
        catch (Exception e){
            e.printStackTrace();
            return new IRResultVO();
        }
        irResultVO.setResultList(irResultItems);
        return irResultVO;
    }
}
