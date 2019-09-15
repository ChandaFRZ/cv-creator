package at.friedrichbachinger.mainappfcb.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import at.friedrichbachinger.mainappfcb.dao.RoleRepository;
import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.Role;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.rest.exceptions.EmailExistsException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.UserNotFoundException;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	@Transactional
	public List<UserDAO> getAll() {
		return userRepository.findAll();
	}

	@Override
	@Transactional
	public UserDAO getUser(int userId) {
		Optional<UserDAO> result = userRepository.findById(userId);
		UserDAO user = null;
		if (result.isPresent()) {
			user = result.get();
		} else {
			throw new UserNotFoundException("User id not found - " + userId);
		}
		return user;
	}

	@Override
	@Transactional
	public UserDAO addUser(UserDAO user) {
		Optional<UserDAO> result = userRepository.findByEmail(user.getEmail());

		if (result.isPresent()) {
			throw new EmailExistsException("Email already exists!");
		}
		Role role = roleRepository.getOne(2);
		Set<Role> userRoles = new HashSet<Role>();
		userRoles.add(role);

		user.setId(0);
		user.setCreatedBy(user.getEmail());
		user.setLastModifiedBy(user.getEmail());
		user.setRoles(userRoles);
		updateLastModfiedDate(user);
		user.setCreatedDate(user.getLastModifiedDate());
		user.setPageTitle(user.getEmail());

		ResponseEntity.ok(userRepository.save(user));
		return user;
	}

	@Override
	@Transactional
	public UserDAO updateUser(UserDAO user) {
		if (user == null) {
			throw new UserNotFoundException("User id not found");
		}
		ResponseEntity.ok(userRepository.save(user));
		return user;
	}

	@Override
	@Transactional
	public boolean deleteUser(int userId) {
		if (!userRepository.existsById(userId)) {
			throw new UserNotFoundException("User id not found - " + userId);
		}
		userRepository.deleteById(userId);
		return true;
	}

	@Override
	public UserDAO updatePageTitle(UserDetails userDetails, String pageTitle) {
		Optional<UserDAO> result = userRepository.findByEmail(userDetails.getUsername());
		UserDAO user = null;
		if (result.isPresent()) {
			user = result.get();
		} else {
			throw new UserNotFoundException("User id not found");
		}
		user.setPageTitle(pageTitle);
		userRepository.save(user);
		return user;
	}

	@Override
	public void updateLastModfiedDate(UserDAO user) {
		Date date = Calendar.getInstance().getTime();
		user.setLastModifiedDate(date);
	}

	@Override
	public UserDAO getUser(UserDetails userDetails) {
		Optional<UserDAO> result = userRepository.findByEmail(userDetails.getUsername());
		UserDAO user = null;
		if (result.isPresent()) {
			user = result.get();
		} else {
			throw new UserNotFoundException("User id not found!");
		}
		return user;
	}

}
