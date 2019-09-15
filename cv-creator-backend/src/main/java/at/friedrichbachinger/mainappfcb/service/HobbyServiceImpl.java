package at.friedrichbachinger.mainappfcb.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import at.friedrichbachinger.mainappfcb.dao.HobbyRepository;
import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.entity.elements.Hobby;
import at.friedrichbachinger.mainappfcb.rest.exceptions.HobbyAlreadyExistsException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.HobbyNotFoundException;

@Service
public class HobbyServiceImpl implements HobbyService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private HobbyRepository hobbyRepository;

    @Autowired
    public HobbyServiceImpl() {
    }

    @Override
    public Set<Hobby> getUserHobbies(UserDetails userDetails) {
        UserDAO user = userService.getUser(userDetails);
        return user.getHobbies();
    }

    @Override
    public Hobby addUserHobby(UserDetails userDetails, Hobby hobbies) {
        UserDAO user = userService.getUser(userDetails);

        findKnowledgeByEqualPosition(hobbies, user);
        hobbies.setId(0);

        Hobby addKnowledge = hobbyRepository.save(hobbies);
        user.getHobbies().add(addKnowledge);
        userRepository.save(user);
        return addKnowledge;
    }

    @Override
    public Hobby updateUserHobbyById(UserDetails userDetails, int id, Hobby knowledge) {
        UserDAO user = userService.getUser(userDetails);
        Hobby foundHobby = hobbyRepository.getOne(id);
        if (foundHobby == null) {
            throw new HobbyNotFoundException("Hobby not found!");
        }
        Hobby updateHobby = hobbyRepository.save(knowledge);
        user.getHobbies().add(updateHobby);
        userRepository.save(user);
        return updateHobby;
    }

    @Override
    public boolean deleteUserHobbyById(UserDetails userDetails, int id) {
        UserDAO user = userService.getUser(userDetails);
        Hobby deleteHobby = hobbyRepository.getOne(id);
        if (deleteHobby == null) {
            throw new HobbyNotFoundException("Hobby not found!");
        }
        user.getHobbies().remove(deleteHobby);
        hobbyRepository.deleteById(deleteHobby.getId());
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updateManyUserHobbies(UserDetails userDetails, Set<Hobby> knowledges) {
        if (knowledges.size() <= 0) {
            throw new HobbyNotFoundException("Hobby not found!");
        }

        UserDAO user = userService.getUser(userDetails);
        user.setHobbies(knowledges);
        userRepository.save(user);
        return true;
    }

    private void findKnowledgeByEqualPosition(Hobby hobby, UserDAO user) {
        List<Hobby> hobbies = user.getHobbies().stream()
                .filter(data -> data.getType() == hobby.getType() && data.getPosition() == hobby.getPosition())
                .map(data -> new Hobby(data)).collect(Collectors.toList());

        if (hobbies.size() > 0) {
            throw new HobbyAlreadyExistsException("Hobby already exists!");
        }
    }
}