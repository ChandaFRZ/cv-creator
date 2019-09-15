package at.friedrichbachinger.mainappfcb.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.entity.UserDTO;
import at.friedrichbachinger.mainappfcb.entity.jwt.JwtLoginRequest;
import at.friedrichbachinger.mainappfcb.entity.jwt.JwtRequest;
import at.friedrichbachinger.mainappfcb.entity.jwt.JwtResponse;
import at.friedrichbachinger.mainappfcb.jwt.JwtTokenProvider;
import at.friedrichbachinger.mainappfcb.rest.response.GeneralResponse;
import at.friedrichbachinger.mainappfcb.rest.response.UserLoginResponse;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", maxAge = 3600)
public class JwtAuthenticationRestController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody JwtLoginRequest loginRequest) throws Exception {

		UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

		if (!bcryptEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
			throw new Exception("Email or password not valid!");
		}

		UserDAO user = userRepository.findByEmail(userDetails.getUsername()).get();
		String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new UserLoginResponse(user, token));
	}

	@PostMapping("auth/authenticate")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
		authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping("auth/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserDTO user) throws Exception {
		userDetailsService.save(user);
		return ResponseEntity
				.ok(new GeneralResponse("User successfully registrated", HttpStatus.CREATED).createResponse());
	}

	@GetMapping("api/auth/validate")
	public ResponseEntity<?> valideateUser(@RequestHeader("Authorization") String bearer) throws Exception {
		UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
		UserDAO user = userRepository.findByEmail(userDetails.getUsername()).get();
		String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new UserLoginResponse(user, token));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}