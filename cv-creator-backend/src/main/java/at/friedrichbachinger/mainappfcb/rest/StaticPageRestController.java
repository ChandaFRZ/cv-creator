package at.friedrichbachinger.mainappfcb.rest;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.rest.exceptions.NoPageFoundException;
import at.friedrichbachinger.mainappfcb.rest.response.PublicPageResponse;
import at.friedrichbachinger.mainappfcb.service.FileService;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;
import at.friedrichbachinger.mainappfcb.service.UserService;

@RestController
@JsonIgnoreProperties(ignoreUnknown = true)
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public")
public class StaticPageRestController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	private FileService fileService;

	@Autowired
	public StaticPageRestController() {
	}

	@GetMapping("/{pageTitle}")
	public ResponseEntity<PublicPageResponse> getPageByEmail(@PathVariable String pageTitle) {
		List<UserDAO> users = userService.getAll();

		System.out.println("test: " + users.size());

		List<UserDAO> foundUsers = users.stream()
				.filter(data -> data.getPageTitle().toLowerCase().equals(pageTitle.toLowerCase()))
				.collect((Collectors.toList()));

		if (foundUsers.size() < 1) {
			throw new NoPageFoundException("Page not registrated!");
		}

		UserDetails userDetails = userDetailsService.loadUserByUsername(foundUsers.get(0).getEmail());
		UserDAO user = foundUsers.get(0);

		PublicPageResponse response = new PublicPageResponse(user.getAddress(), user.getProgressions(),
				user.getExperiences(), user.getKnowledges(), user.getHobbies(),
				fileService.getPathFromimages(userDetails), user.getLastModifiedDate());
		return ResponseEntity.ok().body(response);
	}
}
