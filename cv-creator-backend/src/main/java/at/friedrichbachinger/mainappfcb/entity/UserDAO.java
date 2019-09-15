package at.friedrichbachinger.mainappfcb.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import at.friedrichbachinger.mainappfcb.db.sql.SQLInjectionSafe;
import at.friedrichbachinger.mainappfcb.entity.elements.Address;
import at.friedrichbachinger.mainappfcb.entity.elements.Experience;
import at.friedrichbachinger.mainappfcb.entity.elements.Hobby;
import at.friedrichbachinger.mainappfcb.entity.elements.Knowledge;
import at.friedrichbachinger.mainappfcb.entity.elements.Progression;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
@ToString
@Table(name = "user")
public class UserDAO implements Serializable {

	private static final long serialVersionUID = 1225158192015429158L;

	@Id
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Email(message = "Email should be valid")
	@SQLInjectionSafe
	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@JsonIgnore
	@Size(min = 6, message = "Password should have at least 6 characters")
	@SQLInjectionSafe
	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "enabled")
	private boolean enabled;

	@Column(name = "token_expired")
	private boolean tokenExpired;

	@Column(name = "page_title", nullable = true)
	private String pageTitle;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	@JsonIgnoreProperties("users")
	private Set<Role> roles;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "address_id", nullable = false)
	private Address address;

	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "users_progressions", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "progression_id", referencedColumnName = "id"))
	@JsonIgnoreProperties("users")
	private Set<Progression> progressions;

	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "users_experiences", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "experience_id", referencedColumnName = "id"))
	@JsonIgnoreProperties("users")
	private Set<Experience> experiences;

	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "users_knowledges", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "knowledge_id", referencedColumnName = "id"))
	@JsonIgnoreProperties("users")
	private Set<Knowledge> knowledges;

	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(name = "users_hobbies", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "hobby_id", referencedColumnName = "id"))
	@JsonIgnoreProperties("users")
	private Set<Hobby> hobbies;

	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private Set<ImageDAO> images;

	@CreatedBy
	@Column(name = "created_by", nullable = false, updatable = false)
	private String createdBy;

	@CreatedDate
	@Column(name = "created_date", nullable = false, updatable = false)
	private Date createdDate;

	@LastModifiedBy
	@Column(name = "last_modified_by", nullable = true)
	private String lastModifiedBy;

	@LastModifiedDate
	@Column(name = "last_modified_date", nullable = true)
	private Date lastModifiedDate;

	public UserDAO(String email, String password, boolean enabled, boolean tokenExpired, String pageTitle,
			Set<Role> roles, Set<Progression> progressions, Address address, Set<Experience> experience,
			Set<Knowledge> knowledges, Set<Hobby> hobbies, Set<ImageDAO> images) {
		this.email = email;
		this.password = password;
		this.enabled = enabled;
		this.tokenExpired = tokenExpired;
		this.pageTitle = pageTitle;
		this.roles = roles;
		this.address = address;
		this.progressions = progressions;
		this.experiences = experience;
		this.knowledges = knowledges;
		this.hobbies = hobbies;
		this.images = images;
	}
}
