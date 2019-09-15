package at.friedrichbachinger.mainappfcb.rest.response;

import at.friedrichbachinger.mainappfcb.entity.ImageDAO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ImageUploadResponse {
    ImageDAO normalImagePath;
    ImageDAO thumbNailImagePath;
}