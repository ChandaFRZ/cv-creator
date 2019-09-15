package at.friedrichbachinger.mainappfcb.rest;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

import at.friedrichbachinger.mainappfcb.entity.elements.Progression;
import at.friedrichbachinger.mainappfcb.rest.response.GeneralResponse;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;
import at.friedrichbachinger.mainappfcb.service.ProgressionService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class ProgressionRestController {

	@Autowired
	private ProgressionService progressionService;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	public ProgressionRestController() {
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/progressions")
	public ResponseEntity<Set<Progression>> getUserProgressions(@RequestHeader("Authorization") String bearer)
			throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(progressionService.getUserProgressions(userDetails));
	}

	@PostMapping("/progression")
	public ResponseEntity<Progression> addUserProgression(@RequestHeader("Authorization") String bearer,
			@RequestBody Progression progression) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(progressionService.addUserProgression(userDetails, progression));
	}

	@PutMapping("/progression/{id}")
	public ResponseEntity<Progression> updateUserProgressionById(@RequestHeader("Authorization") String bearer,
			@PathVariable int id, @RequestBody Progression progression) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(progressionService.updateUserProgressionById(userDetails, id, progression));
	}

	@DeleteMapping("/progression/{id}")
	public ResponseEntity<GeneralResponse> deleteUserProgressionBoxById(@RequestHeader("Authorization") String bearer,
			@PathVariable int id) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		progressionService.deleteUserProgressionById(userDetails, id);
		return ResponseEntity
				.ok(new GeneralResponse("Progression successfully deleted!", HttpStatus.OK).createResponse());
	}

	@PatchMapping("/progressions")
	public ResponseEntity<GeneralResponse> updateManyUserProgressions(@RequestHeader("Authorization") String bearer,
			@RequestBody Set<Progression> progressions) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		progressionService.updateManyUserProgressions(userDetails, progressions);
		return ResponseEntity
				.ok(new GeneralResponse("Many Progressions successfully updated!", HttpStatus.OK).createResponse());
	}
}