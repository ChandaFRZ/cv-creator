package at.friedrichbachinger.mainappfcb.rest;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.friedrichbachinger.mainappfcb.entity.elements.Hobby;
import at.friedrichbachinger.mainappfcb.rest.response.GeneralResponse;
import at.friedrichbachinger.mainappfcb.service.HobbyService;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class HobbyRestController {

    @Autowired
    private HobbyService hobbyService;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @GetMapping("/hobbies")
    public ResponseEntity<Set<Hobby>> getUserHobbies(@RequestHeader("Authorization") String bearer) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        return ResponseEntity.ok().body(hobbyService.getUserHobbies(userDetails));
    }

    @PostMapping("/hobby")
    public ResponseEntity<Hobby> addUserHobby(@RequestHeader("Authorization") String bearer, @RequestBody Hobby hobby)
            throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        return ResponseEntity.ok().body(hobbyService.addUserHobby(userDetails, hobby));
    }

    @PutMapping("/hobby/{id}")
    public ResponseEntity<Hobby> updateUserHobbyById(@RequestHeader("Authorization") String bearer,
            @PathVariable int id, @RequestBody Hobby hobby) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        return ResponseEntity.ok().body(hobbyService.updateUserHobbyById(userDetails, id, hobby));
    }

    @DeleteMapping("/hobby/{id}")
    public ResponseEntity<GeneralResponse> deleteUserHobbyById(@RequestHeader("Authorization") String bearer,
            @PathVariable int id) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        hobbyService.deleteUserHobbyById(userDetails, id);
        return ResponseEntity.ok(new GeneralResponse("Hobby successfully deleted!", HttpStatus.OK).createResponse());
    }

    @PatchMapping("/hobbies")
    public ResponseEntity<GeneralResponse> updateManyUserHobbies(@RequestHeader("Authorization") String bearer,
            @RequestBody Set<Hobby> hobbies) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
        hobbyService.updateManyUserHobbies(userDetails, hobbies);
        return ResponseEntity
                .ok(new GeneralResponse("Many Hobbies successfully updated!", HttpStatus.OK).createResponse());
    }
}