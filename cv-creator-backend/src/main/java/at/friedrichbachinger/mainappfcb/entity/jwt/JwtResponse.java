package at.friedrichbachinger.mainappfcb.entity.jwt;

import java.io.Serializable;

import lombok.Getter;


public class JwtResponse implements Serializable {

	private static final long serialVersionUID = 8331164237842089672L;

	private final @Getter String jwttoken;

	public JwtResponse(String jwttoken) {
		this.jwttoken = jwttoken;
	}
}
