package at.friedrichbachinger.mainappfcb.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@ToString
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "image")
public class ImageDAO extends Auditable<String> implements Serializable {

    private static final long serialVersionUID = -2057739436316653176L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    private UserDAO user;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "image_type_id", nullable = true)
    private ImageType imageType;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "extension", nullable = false)
    private String extension;

    @Column(name = "is_thumbnail", nullable = false)
    private boolean thumbnail;

    public ImageDAO(UserDAO user, ImageType imageType, String name, String extension, boolean isThumbnail) {
        this.user = user;
        this.imageType = imageType;
        this.name = name;
        this.extension = extension;
        this.thumbnail = isThumbnail;
    }
}