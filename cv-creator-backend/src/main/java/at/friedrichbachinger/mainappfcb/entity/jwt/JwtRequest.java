package at.friedrichbachinger.mainappfcb.entity.jwt;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class JwtRequest implements Serializable {

	private static final long serialVersionUID = -4275999720372528172L;

	private String email;
	private String password;

	public JwtRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}
}
