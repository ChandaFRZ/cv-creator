package at.friedrichbachinger.mainappfcb.rest;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import at.friedrichbachinger.mainappfcb.entity.elements.Experience;
import at.friedrichbachinger.mainappfcb.rest.response.GeneralResponse;
import at.friedrichbachinger.mainappfcb.service.ExperienceService;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class ExperienceRestController {

	@Autowired
	private ExperienceService experienceService;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	public ExperienceRestController() {
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/experiences")
	public ResponseEntity<Set<Experience>> getUserExperiences(@RequestHeader("Authorization") String bearer)
			throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(experienceService.getUserExperiences(userDetails));
	}

	@PostMapping("/experience")
	public ResponseEntity<Experience> addUserExperience(@RequestHeader("Authorization") String bearer,
			@RequestBody Experience experience) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(experienceService.addUserExperience(userDetails, experience));
	}

	@PutMapping("/experience/{id}")
	public ResponseEntity<Experience> updateUserExperienceById(@RequestHeader("Authorization") String bearer,
			@PathVariable int id, @RequestBody Experience experience) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(experienceService.updateUserExperienceById(userDetails, id, experience));
	}

	@DeleteMapping("/experience/{id}")
	public ResponseEntity<GeneralResponse> deleteUserExperienceById(@RequestHeader("Authorization") String bearer,
			@PathVariable int id) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		experienceService.deleteUserExperienceById(userDetails, id);
		return ResponseEntity
				.ok(new GeneralResponse("Experiences successfully deleted!", HttpStatus.OK).createResponse());
	}

	@PatchMapping("/experiences")
	public ResponseEntity<GeneralResponse> updateManyUserExperiences(@RequestHeader("Authorization") String bearer,
			@RequestBody Set<Experience> experiences) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		experienceService.updateManyUserExperiences(userDetails, experiences);
		return ResponseEntity
				.ok(new GeneralResponse("Many Experiences successfully updated!", HttpStatus.OK).createResponse());
	}
}