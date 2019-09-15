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

import at.friedrichbachinger.mainappfcb.entity.elements.Knowledge;
import at.friedrichbachinger.mainappfcb.rest.response.GeneralResponse;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;
import at.friedrichbachinger.mainappfcb.service.KnowledgeService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class KnowledgeRestController {

	@Autowired
	private KnowledgeService knowledgeService;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	public KnowledgeRestController() {
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/knowledges")
	public ResponseEntity<Set<Knowledge>> getUserKnowledges(@RequestHeader("Authorization") String bearer)
			throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(knowledgeService.getUserKnowledges(userDetails));
	}

	@PostMapping("/knowledge")
	public ResponseEntity<Knowledge> addUserKnowledge(@RequestHeader("Authorization") String bearer,
			@RequestBody Knowledge knowledge) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(knowledgeService.addUserKnowledge(userDetails, knowledge));
	}

	@PutMapping("/knowledge/{id}")
	public ResponseEntity<Knowledge> updateUserKnowledgeById(@RequestHeader("Authorization") String bearer,
			@PathVariable int id, @RequestBody Knowledge knowledge) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(knowledgeService.updateUserKnowledgeById(userDetails, id, knowledge));
	}

	@DeleteMapping("/knowledge/{id}")
	public ResponseEntity<GeneralResponse> deleteUserKnowledgeById(@RequestHeader("Authorization") String bearer,
			@PathVariable int id) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		knowledgeService.deleteUserKnowledgeById(userDetails, id);
		return ResponseEntity
				.ok(new GeneralResponse("Knowledge successfully deleted!", HttpStatus.OK).createResponse());
	}

	@PatchMapping("/knowledges")
	public ResponseEntity<GeneralResponse> updateManyUserKnowledges(@RequestHeader("Authorization") String bearer,
			@RequestBody Set<Knowledge> knowledges) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		knowledgeService.updateManyUserKnowledges(userDetails, knowledges);
		return ResponseEntity
				.ok(new GeneralResponse("Many Knowledges successfully updated!", HttpStatus.OK).createResponse());
	}
}