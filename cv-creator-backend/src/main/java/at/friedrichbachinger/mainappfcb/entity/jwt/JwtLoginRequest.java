package at.friedrichbachinger.mainappfcb.entity.jwt;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class JwtLoginRequest implements Serializable {

	private static final long serialVersionUID = 5941601695301845894L;
	
	@Email
	private String email;
	
	@Size(min = 6)
	private String password;
	
	public JwtLoginRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
}
