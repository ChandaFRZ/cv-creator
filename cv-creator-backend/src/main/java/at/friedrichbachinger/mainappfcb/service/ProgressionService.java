package at.friedrichbachinger.mainappfcb.service;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import at.friedrichbachinger.mainappfcb.entity.elements.Progression;

public interface ProgressionService {

    public Set<Progression> getUserProgressions(UserDetails userDetails);

    public Progression addUserProgression(UserDetails userDetails, Progression progressionBox);

    public Progression updateUserProgressionById(UserDetails userDetails, int id, Progression progressionBox);

    public boolean updateManyUserProgressions(UserDetails userDetails, Set<Progression> progessionBoxes);

    public boolean deleteUserProgressionById(UserDetails userDetails, int id);
}
