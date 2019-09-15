package at.friedrichbachinger.mainappfcb.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.entity.UserDTO;
import at.friedrichbachinger.mainappfcb.jwt.JwtTokenProvider;
import at.friedrichbachinger.mainappfcb.rest.exceptions.UserNotFoundException;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	UserServiceImpl userService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<UserDAO> result = userRepository.findByEmail(email);
		UserDAO user = null;

		if (result.isPresent()) {
			user = result.get();
		} 
		else {
			throw new UsernameNotFoundException("User not found with email: " + email);
		}

		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				getAuthorities(user));
	}

	public UserDAO getUser(UserDetails userDetails) {
		Optional<UserDAO> result = userRepository.findByEmail(userDetails.getUsername());
		
		UserDAO user = null;
		
		if (result.isPresent()) {
			user = result.get();
		} 
		else {
			throw new UserNotFoundException("User id not found!");
		}
		return user;
	}

	public UserDetails loadUserByBearer(String bearer) throws Exception {
		if (!bearer.startsWith("Bearer ") || bearer == null) {
			throw new Exception("INVALID_CREDENTIALS");
		}

		String email = tokenProvider.getEmailFromToken(bearer.substring(7));
		return loadUserByUsername(email);
	}

	@Transactional
	public UserRepository save(UserDTO user) {
		UserDAO newUser = new UserDAO();
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setEmail(user.getEmail());
		userService.addUser(newUser);
		return userRepository;
	}

	public Collection<? extends GrantedAuthority> getAuthorities(UserDAO user) {
		List<SimpleGrantedAuthority> userRoles = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName())).collect(Collectors.toList());
		return userRoles;
	}

}
