package at.friedrichbachinger.mainappfcb.service;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import at.friedrichbachinger.mainappfcb.entity.elements.Hobby;

public interface HobbyService {

    public Set<Hobby> getUserHobbies(UserDetails userDetails);

    public Hobby addUserHobby(UserDetails userDetails, Hobby hobby);

    public Hobby updateUserHobbyById(UserDetails userDetails, int id, Hobby hobby);

    public boolean deleteUserHobbyById(UserDetails userDetails, int id);

    public boolean updateManyUserHobbies(UserDetails userDetails, Set<Hobby> hobbies);
}