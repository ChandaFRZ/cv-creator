package at.friedrichbachinger.mainappfcb.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import at.friedrichbachinger.mainappfcb.dao.ProgressionRepository;
import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.entity.elements.Progression;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ProgressionAlreadyExistsException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.ProgressionNotFoundException;

@Service
public class ProgressionServiceImpl implements ProgressionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProgressionRepository progressionRepository;

    @Autowired
    public ProgressionServiceImpl() {
    }

    @Override
    public Set<Progression> getUserProgressions(UserDetails userDetails) {
        UserDAO user = userService.getUser(userDetails);
        return user.getProgressions();
    }

    @Override
    public Progression addUserProgression(UserDetails userDetails, Progression progression) {
        UserDAO user = userService.getUser(userDetails);

        findProgressionBoxByEqualPosition(progression, user);
        progression.setId(0);

        Progression addProgression = progressionRepository.save(progression);
        user.getProgressions().add(addProgression);
        userRepository.save(user);
        return addProgression;
    }

    @Override
    public Progression updateUserProgressionById(UserDetails userDetails, int id, Progression progression) {
        UserDAO user = userService.getUser(userDetails);
        Progression foundProgression = progressionRepository.getOne(id);
        if (foundProgression == null) {
            throw new ProgressionNotFoundException("Progression not found!");
        }

        Progression updateProgression = progressionRepository.save(progression);
        user.getProgressions().add(updateProgression);
        userRepository.save(user);
        return updateProgression;
    }

    @Override
    public boolean deleteUserProgressionById(UserDetails userDetails, int id) {
        UserDAO user = userService.getUser(userDetails);
        Progression deleteProgression = progressionRepository.getOne(id);
        if (deleteProgression == null) {
            throw new ProgressionNotFoundException("Progression not found!");
        }

        user.getProgressions().remove(deleteProgression);
        progressionRepository.deleteById(id);
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updateManyUserProgressions(UserDetails userDetails, Set<Progression> progression) {
        if (progression.size() <= 0) {
            throw new ProgressionNotFoundException("Progression not found!");
        }

        UserDAO user = userService.getUser(userDetails);
        user.setProgressions(progression);
        userRepository.save(user);
        return true;
    }

    private void findProgressionBoxByEqualPosition(Progression progression, UserDAO user) {
        List<Progression> progressions = user.getProgressions().stream().filter(
                data -> data.getType() == progression.getType() && data.getPosition() == progression.getPosition())
                .map(data -> new Progression(data)).collect(Collectors.toList());

        if (progressions.size() > 0) {
            throw new ProgressionAlreadyExistsException("Progression already exists!");
        }
    }
}