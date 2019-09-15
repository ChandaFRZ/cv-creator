package at.friedrichbachinger.mainappfcb.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import at.friedrichbachinger.mainappfcb.entity.UserDAO;

public interface UserService {

	public List<UserDAO> getAll();

	public UserDAO getUser(int userId);

	public UserDAO addUser(UserDAO user);

	public UserDAO updateUser(UserDAO user);

	public boolean deleteUser(int userId);

	public UserDAO updatePageTitle(UserDetails userDetails, String pageTitle);

	public void updateLastModfiedDate(UserDAO user);

	public UserDAO getUser(UserDetails userDetails);
}
