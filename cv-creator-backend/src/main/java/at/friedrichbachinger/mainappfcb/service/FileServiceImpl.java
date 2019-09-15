package at.friedrichbachinger.mainappfcb.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;
/*
import javax.imageio.IIOImage;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
*/

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

import org.apache.commons.lang3.RandomStringUtils;
import org.imgscalr.Scalr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import at.friedrichbachinger.mainappfcb.dao.ImageRepository;
import at.friedrichbachinger.mainappfcb.dao.ImageTypeRepository;
import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.ImageDAO;
import at.friedrichbachinger.mainappfcb.entity.ImageDTO;
import at.friedrichbachinger.mainappfcb.entity.ImageType;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ImageInterpretingFailedException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ImageUploadException;

@Service
public class FileServiceImpl implements FileService {

    @Value("${cloud.aws.path.images}")
    private String bucketImagePath;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageTypeRepository imageTypeRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private AmazonS3 amazonS3Client;

    String bucketName = "s3-cv-creator-bucket/images/";
    String ext = "png";
    String pathNormal = "user/images";
    String pathThumbnail = "user/thumbnails";
    String localPath = "tmp/";

    @Override
    public Set<ImageDTO> getPathFromimages(UserDetails userDetails) {
        UserDAO user = userDetailsService.getUser(userDetails);
        return getUserImageDTOs(user);
    }

    @Override
    public Set<ImageDTO> uploadUserImageByTypeS3Bucket(UserDetails userDetails, MultipartFile multipartFile, int type) {

        if (!multipartFile.getContentType().contains("image")) {
            throw new ImageInterpretingFailedException("Image not found on server!");
        }

        UserDAO user = userDetailsService.getUser(userDetails);
        File file = convertMultiPartFileToFile(multipartFile);
        int userId = user.getId();

        List<ImageDAO> images = user.getImages().stream().filter(image -> image.getImageType().getId() == type)
                .collect(Collectors.toList());

        String generatedName = String.format("%s", RandomStringUtils.randomAlphanumeric(13) + userId + type);

        boolean isUpdate = false;
        if (images.size() > 0) {
            generatedName = images.get(0).getName();
            isUpdate = true;
        }

        try {
            uploadImageToS3(file, pathNormal, pathThumbnail, generatedName);
        } catch (IOException e) {
            file.delete();
            throw new ImageUploadException("Image Upload failed!");
        }

        file.delete();
        updateImageAndUser(user, isUpdate, type, generatedName);
        return getUserImageDTOs(user);
    }

    @Override
    public Set<ImageDTO> deleteFileFromS3bucket(UserDetails userDetails, int id) {
        UserDAO user = userDetailsService.getUser(userDetails);
        ImageDAO foundImage = imageRepository.getOne(id);
        if (foundImage == null) {
            throw new ImageInterpretingFailedException("Image not found on server!");
        }
        int type = foundImage.getImageType().getId();
        Set<ImageDAO> imageNamesByType = user.getImages().stream().filter(image -> image.getImageType().getId() == type)
                .collect(Collectors.toSet());

        imageNamesByType.forEach(image -> {

            if (image.isThumbnail()) {
                String thumbnail = image.getName() + "." + image.getExtension();
                amazonS3Client.deleteObject(bucketName + pathThumbnail, thumbnail);
            } else {
                String normaleImage = image.getName() + "." + image.getExtension();
                amazonS3Client.deleteObject(bucketName + pathNormal, normaleImage);
            }

            user.getImages().remove(image);
            userRepository.save(user);

            image.setUser(null);
            image.setImageType(null);
            imageRepository.delete(image);
        });

        return getUserImageDTOs(user);
    }

    @Override
    public S3Object downloadFileFromS3bucket(String fileName, String bucketName) {
        S3Object object = amazonS3Client.getObject(bucketName, fileName);
        return object;
    }

    private void updateImageAndUser(UserDAO user, boolean isUpdate, int type, String generatedName) {
        ImageType imageType = imageTypeRepository.getOne(type);
        ImageDAO imageNormal = new ImageDAO(user, imageType, generatedName, ext, false);
        ImageDAO imageThumbnail = new ImageDAO(user, imageType, generatedName, ext, true);

        if (!isUpdate) {
            imageRepository.save(imageNormal);
            user.getImages().add(imageNormal);
            userRepository.save(user);

            imageRepository.save(imageThumbnail);
            user.getImages().add(imageThumbnail);
            userRepository.save(user);
        }
    }

    private Set<ImageDTO> getUserImageDTOs(UserDAO user) {
        Set<ImageDTO> images = new HashSet<ImageDTO>();
        user.getImages().forEach(image -> {
            if (image.isThumbnail()) {
                images.add(new ImageDTO(image,
                        bucketImagePath + pathThumbnail + "/" + image.getName() + "." + image.getExtension()));
            } else {
                images.add(new ImageDTO(image,
                        bucketImagePath + pathNormal + "/" + image.getName() + "." + image.getExtension()));
            }
        });
        return images;
    }

    private File convertMultiPartFileToFile(MultipartFile multipartFile) {
        File convertedFile = new File(localPath + multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(multipartFile.getBytes());
        } catch (IOException e) {
            throw new ImageInterpretingFailedException("Image interpreting failed");
        }
        return convertedFile;
    }

    private void uploadImageToS3(File file, String pathNormal, String pathThumbnail, String generatedName)
            throws IOException {
        BufferedImage bOriginal = ImageIO.read(file);
        BufferedImage bNormal = Scalr.resize(bOriginal, 1000);
        File normal = makeImageFile(bNormal, generatedName, ext);
        amazonS3Client.putObject(new PutObjectRequest(bucketName + pathNormal, normal.getName(), normal)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        normal.delete();

        bOriginal = ImageIO.read(file);
        BufferedImage bThumbnail = Scalr.resize(bOriginal, 150);
        File thumbnail = makeImageFile(bThumbnail, generatedName, ext);
        amazonS3Client.putObject(new PutObjectRequest(bucketName + pathThumbnail, thumbnail.getName(), thumbnail)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        thumbnail.delete();
    }

    private File makeImageFile(BufferedImage bImage, String name, String type) {
        File file = new File(localPath + name + "." + type);
        try {
            ImageIO.write(bImage, type, file);
        } catch (IOException e) {
            throw new ImageInterpretingFailedException("Image interpreting failed");
        }
        return file;
    }

    /*
     * private File makeImageGoodQualityFile(BufferedImage bImage, String name,
     * String type) { File file = new File(name + "." + type); ImageWriter writer =
     * ImageIO.getImageWritersByFormatName(type).next(); ImageWriteParam param =
     * writer.getDefaultWriteParam();
     * param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
     * param.setCompressionQuality(0.5F); ImageOutputStream ios; try { ios =
     * ImageIO.createImageOutputStream(file); writer.setOutput(ios);
     * writer.write(null, new IIOImage(bImage, null, null), param);
     * writer.dispose(); } catch (IOException e) { throw new
     * ImageInterpretingFailedException("Image interpreting failed"); } return file;
     * }
     */
}