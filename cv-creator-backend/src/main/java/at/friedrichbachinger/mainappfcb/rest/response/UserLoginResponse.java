package at.friedrichbachinger.mainappfcb.rest.response;

import at.friedrichbachinger.mainappfcb.entity.UserDAO;

public class UserLoginResponse {
	private UserDAO user;
	private String token;

	public UserLoginResponse() {
	}

	public UserLoginResponse(UserDAO user, String token) {
		this.user = user;
		this.token = token;
	}

	public UserDAO getUser() {
		return user;
	}

	public void setUser(UserDAO user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}