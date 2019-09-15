package at.friedrichbachinger.mainappfcb.service;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import at.friedrichbachinger.mainappfcb.entity.elements.Experience;

public interface ExperienceService {

    public Set<Experience> getUserExperiences(UserDetails userDetails);

    public Experience addUserExperience(UserDetails userDetails, Experience experience);

    public Experience updateUserExperienceById(UserDetails userDetails, int id, Experience experience);

    public boolean deleteUserExperienceById(UserDetails userDetails, int id);

    public boolean updateManyUserExperiences(UserDetails userDetails, Set<Experience> experience);
}
