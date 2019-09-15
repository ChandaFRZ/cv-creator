package at.friedrichbachinger.mainappfcb.service;

import java.util.Set;

import com.amazonaws.services.s3.model.S3Object;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import at.friedrichbachinger.mainappfcb.entity.ImageDTO;

public interface FileService {

        public Set<ImageDTO> getPathFromimages(UserDetails userDetails);

        public Set<ImageDTO> uploadUserImageByTypeS3Bucket(UserDetails userDetails, MultipartFile multipartFile,
                        int type);

        public S3Object downloadFileFromS3bucket(String fileName, String bucketName);

        public Set<ImageDTO> deleteFileFromS3bucket(UserDetails userDetails, int id);
}