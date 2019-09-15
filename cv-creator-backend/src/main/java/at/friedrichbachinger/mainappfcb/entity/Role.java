package at.friedrichbachinger.mainappfcb.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@Table(name = "role")
public class Role implements Serializable {

	private static final long serialVersionUID = 8232918795300604029L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
	private Set<UserDAO> users;

	public Role(String name, Set<UserDAO> users) {
		this.name = name;
		this.users = users;
	}
}
