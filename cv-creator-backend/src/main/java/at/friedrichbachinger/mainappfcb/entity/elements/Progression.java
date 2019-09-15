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
import javax.persistence.ManyToMany;
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
@Table(name = "progression")
public class Progression extends Auditable<String> implements Serializable {

	private static final long serialVersionUID = 2606753603915846387L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "type", nullable = false)
	private int type;

	@Column(name = "position", nullable = false)
	private int position;

	@Column(name = "year", nullable = false)
	private String year;

	@Column(name = "header", nullable = false)
	private String header;

	@Column(name = "description", nullable = false)
	private String description;

	@JsonIgnore
	@ManyToMany(mappedBy = "progressions", fetch = FetchType.EAGER)
	private Set<UserDAO> users;

	public Progression(int type, int position, String year, String header, String description, Set<UserDAO> users) {
		super();
		this.type = type;
		this.position = position;
		this.year = year;
		this.header = header;
		this.description = description;
		this.users = users;
	}

	public Progression(Progression data) {
		this.id = data.id;
		this.type = data.type;
		this.position = data.position;
		this.year = data.year;
		this.header = data.header;
		this.description = data.description;
		this.users = data.users;
	}

	@Override
	public boolean equals(Object obj) {
		Progression box = (Progression) obj;
		if (box != null && box.getId() == getId()) {
			return true;
		}

		return super.equals(obj);
	}
}