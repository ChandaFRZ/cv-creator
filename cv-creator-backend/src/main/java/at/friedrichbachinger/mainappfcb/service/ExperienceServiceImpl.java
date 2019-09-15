package at.friedrichbachinger.mainappfcb.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import at.friedrichbachinger.mainappfcb.dao.ExperienceRepository;
import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.entity.elements.Experience;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ExerperienceAlreadyExistsException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ExperienceNotFoundException;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    public ExperienceServiceImpl() {
    }

    @Override
    public Set<Experience> getUserExperiences(UserDetails userDetails) {
        UserDAO user = userService.getUser(userDetails);
        return user.getExperiences();
    }

    @Override
    public Experience addUserExperience(UserDetails userDetails, Experience experience) {
        UserDAO user = userService.getUser(userDetails);

        findUserExperienceByEqualPosition(experience, user);
        experience.setId(0);

        Experience addExperience = experienceRepository.save(experience);
        user.getExperiences().add(addExperience);
        userRepository.save(user);
        return addExperience;
    }

    @Override
    public Experience updateUserExperienceById(UserDetails userDetails, int id, Experience experience) {
        UserDAO user = userService.getUser(userDetails);
        Experience foundExperience = experienceRepository.getOne(id);
        if (foundExperience == null) {
            throw new ExperienceNotFoundException("Experience not found!");
        }
        Experience updateExperience = experienceRepository.save(experience);
        user.getExperiences().add(updateExperience);
        userRepository.save(user);
        return updateExperience;
    }

    @Override
    public boolean deleteUserExperienceById(UserDetails userDetails, int id) {
        UserDAO user = userService.getUser(userDetails);
        Experience deleteExperience = experienceRepository.getOne(id);
        if (deleteExperience == null) {
            throw new ExperienceNotFoundException("Experience not found!");
        }

        user.getExperiences().remove(deleteExperience);
        experienceRepository.deleteById(deleteExperience.getId());
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updateManyUserExperiences(UserDetails userDetails, Set<Experience> experiences) {
        if (experiences.size() <= 0) {
            throw new ExperienceNotFoundException("Experience not found!");
        }

        UserDAO user = userService.getUser(userDetails);
        user.setExperiences(experiences);
        userRepository.save(user);
        return true;
    }

    private void findUserExperienceByEqualPosition(Experience experience, UserDAO user) {
        List<Experience> experiences = user.getExperiences().stream().filter(
                data -> data.getType() == experience.getType() && data.getPosition() == experience.getPosition())
                .map(data -> new Experience(data)).collect(Collectors.toList());

        if (experiences.size() > 0) {
            throw new ExerperienceAlreadyExistsException("Experience already exists!");
        }
    }
}
