package at.friedrichbachinger.mainappfcb.rest;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import at.friedrichbachinger.mainappfcb.entity.ImageDTO;
import at.friedrichbachinger.mainappfcb.service.FileService;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class FileRestConstroller {

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private FileService fileService;

    @GetMapping("/images")
    public ResponseEntity<Set<ImageDTO>> getUserImages(@RequestHeader("Authorization") String bearer) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        return ResponseEntity.ok().body(fileService.getPathFromimages(userDetails));
    }

    @PostMapping("/files/image/{type}")
    public ResponseEntity<Set<ImageDTO>> addUserImageByType(@RequestHeader("Authorization") String bearer,
            @RequestBody MultipartFile image, @PathVariable int type) throws IOException, Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        return ResponseEntity.ok().body(this.fileService.uploadUserImageByTypeS3Bucket(userDetails, image, type));
    }

    @DeleteMapping("/image/{id}")
    public ResponseEntity<Set<ImageDTO>> deleteUserHeaderImage(@RequestHeader("Authorization") String bearer,
            @PathVariable int id) throws IOException, Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        return ResponseEntity.ok().body(this.fileService.deleteFileFromS3bucket(userDetails, id));
    }
}