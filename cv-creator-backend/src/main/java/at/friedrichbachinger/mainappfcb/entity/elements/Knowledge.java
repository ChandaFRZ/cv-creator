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
@Table(name = "knowledge")
public class Knowledge extends Auditable<String> implements Serializable {

	private static final long serialVersionUID = -7250679930487314715L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@Column(name = "type", nullable = false)
	private int type;

	@Column(name = "position", nullable = false)
	private int position;

	@Column(name = "content", nullable = false)
	private String content;

	@JsonIgnore
	@ManyToMany(mappedBy = "knowledges", fetch = FetchType.EAGER)
	private Set<UserDAO> users;

	public Knowledge(int type, int position, String content, Set<UserDAO> users) {
		super();
		this.type = type;
		this.position = position;
		this.content = content;
		this.users = users;
	}

	public Knowledge(Knowledge data) {
		this.id = data.id;
		this.type = data.type;
		this.position = data.position;
		this.content = data.content;
		this.users = data.users;
	}

	@Override
	public boolean equals(Object obj) {
		Knowledge knowledge = (Knowledge) obj;
		if (knowledge != null && knowledge.getId() == getId()) {
			return true;
		}

		return super.equals(obj);
	}
}