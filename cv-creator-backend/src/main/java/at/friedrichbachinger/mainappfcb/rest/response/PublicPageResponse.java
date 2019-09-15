package at.friedrichbachinger.mainappfcb.rest.response;

import java.util.Date;
import java.util.Set;

import at.friedrichbachinger.mainappfcb.entity.ImageDTO;
import at.friedrichbachinger.mainappfcb.entity.elements.Address;
import at.friedrichbachinger.mainappfcb.entity.elements.Experience;
import at.friedrichbachinger.mainappfcb.entity.elements.Hobby;
import at.friedrichbachinger.mainappfcb.entity.elements.Knowledge;
import at.friedrichbachinger.mainappfcb.entity.elements.Progression;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PublicPageResponse {
	private Address address;
	private Set<Progression> progressions;
	private Set<Experience> experiences;
	private Set<Knowledge> knowledges;
	private Set<Hobby> hobbies;
	private Set<ImageDTO> images;
	private Date lastModifiedDate;
}