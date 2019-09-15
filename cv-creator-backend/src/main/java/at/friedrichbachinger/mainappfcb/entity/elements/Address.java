package at.friedrichbachinger.mainappfcb.entity.elements;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import at.friedrichbachinger.mainappfcb.entity.Auditable;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter(AccessLevel.PUBLIC)
@Setter(AccessLevel.PUBLIC)
@ToString
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "address")
public class Address extends Auditable<String> implements Serializable {

	private static final long serialVersionUID = 8944721180396093616L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "last_name", nullable = false)
	private String lastName;

	@Column(name = "birth_date", nullable = false)
	private String birthDate;

	@Column(name = "birth_location", nullable = false)
	private String birthLocation;

	@Column(name = "street", nullable = false)
	private String street;

	@Column(name = "zip", nullable = false)
	private String zip;

	@Column(name = "city", nullable = false)
	private String city;

	@Column(name = "country", nullable = false)
	private String country;

	@Column(name = "phone", nullable = false)
	private String phone;

	@Column(name = "email", nullable = false)
	private String email;

	@JsonIgnore
	@OneToMany(mappedBy = "address", fetch = FetchType.EAGER)
	private Set<UserDAO> users;

	public Address(String firstName, String lastName, String birthDate, String birthLocation, String street, String zip,
			String city, String country, String phone, String email, Set<UserDAO> users) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
		this.birthLocation = birthLocation;
		this.street = street;
		this.zip = zip;
		this.city = city;
		this.country = country;
		this.phone = phone;
		this.email = email;
		this.users = users;
	}
}