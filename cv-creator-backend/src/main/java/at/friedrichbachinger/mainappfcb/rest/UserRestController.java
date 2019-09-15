package at.friedrichbachinger.mainappfcb.rest;

import java.util.List;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.friedrichbachinger.mainappfcb.entity.PageTitleDTO;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;
import at.friedrichbachinger.mainappfcb.service.UserService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api")
public class UserRestController {

	private UserService userService;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	public UserRestController(UserService userService) {
		this.userService = userService;
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/users")
	public ResponseEntity<List<UserDAO>> getAll() {
		return ResponseEntity.ok().body(userService.getAll());
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/users/{userId}")
	public ResponseEntity<UserDAO> getUserById(@PathVariable int userId) {
		return ResponseEntity.ok().body(userService.getUser(userId));
	}

	@PostMapping("/users")
	public ResponseEntity<UserDAO> addUser(@RequestBody @Valid UserDAO user) {
		return ResponseEntity.ok().body(userService.addUser(user));
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	@PutMapping("/users")
	public ResponseEntity<UserDAO> updateUser(@RequestBody UserDAO user) {
		return ResponseEntity.ok().body(userService.updateUser(user));
	}

	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	@DeleteMapping("/users/{userId}")
	public boolean deleteUser(@PathVariable int userId) {
		return userService.deleteUser(userId);
	}

	@PutMapping("/user/pagetitle")
	public ResponseEntity<UserDAO> updatePageTitlte(@RequestHeader("Authorization") String bearer,
			@RequestBody PageTitleDTO pageTitleDTO) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		return ResponseEntity.ok().body(userService.updatePageTitle(userDetails, pageTitleDTO.getPageTitle()));
	}
}
