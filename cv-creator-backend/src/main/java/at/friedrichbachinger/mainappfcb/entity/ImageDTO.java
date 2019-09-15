package at.friedrichbachinger.mainappfcb.entity;

import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@ToString
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "image")
public class ImageDTO extends Auditable<String> {

    private int id;

    private int imageType;

    private String name;

    private String extension;

    private boolean isThumbnail;

    private String url;

    public ImageDTO(ImageType imageType, String name, String extension, boolean isThumbnail) {
        this.imageType = imageType.getId();
        this.name = name;
        this.extension = extension;
        this.isThumbnail = isThumbnail;
    }

    public ImageDTO(ImageDAO imageDao, String url) {
        this.id = imageDao.getId();
        this.imageType = imageDao.getImageType().getId();
        this.name = imageDao.getName();
        this.extension = imageDao.getExtension();
        this.isThumbnail = imageDao.isThumbnail();
        this.url = url;
        this.setCreatedBy(imageDao.getCreatedBy());
        this.setCreatedDate(imageDao.getCreatedDate());
        this.setLastModifiedBy(imageDao.getLastModifiedBy());
        this.setLastModifiedDate(imageDao.getLastModifiedDate());
    }
}